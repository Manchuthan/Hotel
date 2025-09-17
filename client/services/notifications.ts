import { ScheduledNotification } from "@shared/api";
import { mockApi } from "./mockApi";
import { toast } from "@/hooks/use-toast";

let scheduledTimers = new Map<string, number>();

export async function setupPendingReminders() {
  try {
    const list = await mockApi.listScheduledNotifications();
    const now = Date.now();
    list.filter(n => !n.delivered).forEach((n) => {
      const t = new Date(n.triggerAtISO).getTime();
      const ms = t - now;
      if (ms <= 0) {
        deliver(n);
      } else if (!scheduledTimers.has(n.id)) {
        const id = window.setTimeout(() => deliver(n), ms);
        scheduledTimers.set(n.id, id);
      }
    });
  } catch (e) {
    // no-op
  }
}

export function clearAllReminderTimers() {
  scheduledTimers.forEach((id) => clearTimeout(id));
  scheduledTimers.clear();
}

async function deliver(n: ScheduledNotification) {
  try {
    scheduledTimers.delete(n.id);
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(n.title, { body: n.message });
      } else if (Notification.permission !== "denied") {
        const perm = await Notification.requestPermission();
        if (perm === "granted") new Notification(n.title, { body: n.message });
      }
    }
    toast({ title: n.title, description: n.message });
    await mockApi.markNotificationDelivered(n.id);
  } catch {
    // ignore
  }
}
