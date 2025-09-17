import { useEffect, useState } from "react";
import { mockApi } from "@/services/mockApi";
import type { ScheduledNotification } from "@shared/api";

export default function Notifications() {
  const [list, setList] = useState<ScheduledNotification[]>([]);

  useEffect(() => {
    mockApi.listScheduledNotifications().then(setList);
  }, []);

  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <h1 className="font-serif text-2xl mb-2">Notifications</h1>
      <p className="text-muted-foreground mb-3">30‑minute reminders are scheduled for your booked services. To enable background push, connect FCM or a server integration.</p>
      <div className="space-y-2">
        {list.length === 0 && <p className="text-sm text-muted-foreground">No reminders scheduled.</p>}
        {list.map((n) => {
          const t = new Date(n.triggerAtISO);
          return (
            <div key={n.id} className="rounded-xl ring-1 ring-border bg-card p-3 flex items-center justify-between">
              <div>
                <p className="font-medium leading-tight">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>{t.toLocaleString()}</p>
                <p className={n.delivered ? "text-green-600" : ""}>{n.delivered ? "Delivered" : "Scheduled"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
