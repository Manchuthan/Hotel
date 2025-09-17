import { Booking, AuthSession, User, OfferBooking, ScheduledNotification } from "@shared/api";

const LS_KEY_AUTH = "araliya_auth";
const LS_KEY_BOOKINGS = "araliya_bookings";
const LS_KEY_ROOM_KEYS = "araliya_room_keys";
const LS_KEY_OFFER_BOOKINGS = "araliya_offer_bookings";
const LS_KEY_NOTIFICATIONS = "araliya_scheduled_notifications";

function loadBookings(): Booking[] {
  const raw = localStorage.getItem(LS_KEY_BOOKINGS);
  if (raw) return JSON.parse(raw);
  const today = new Date();
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const seed: Booking[] = [
    {
      id: "bkg_001",
      roomId: "A101",
      guestName: "Amal Perera",
      checkInDate: iso(today),
      checkOutDate: iso(new Date(today.getTime() + 2 * 86400000)),
      status: "reserved",
    },
    {
      id: "bkg_002",
      roomId: "B305",
      guestName: "Sena Weerasinghe",
      checkInDate: iso(today),
      checkOutDate: iso(new Date(today.getTime() + 3 * 86400000)),
      status: "reserved",
    },
    {
      id: "bkg_003",
      roomId: "C101",
      guestName: "Room 101 Guest",
      checkInDate: iso(today),
      checkOutDate: iso(new Date(today.getTime() + 2 * 86400000)),
      status: "reserved",
    },
  ];
  localStorage.setItem(LS_KEY_BOOKINGS, JSON.stringify(seed));
  return seed;
}

function saveBookings(list: Booking[]) {
  localStorage.setItem(LS_KEY_BOOKINGS, JSON.stringify(list));
}

function loadRoomKeys(): Record<string, string> {
  const raw = localStorage.getItem(LS_KEY_ROOM_KEYS);
  if (raw) return JSON.parse(raw);
  const keys: Record<string, string> = { C101: "1234", A101: "1234", B305: "5678" };
  localStorage.setItem(LS_KEY_ROOM_KEYS, JSON.stringify(keys));
  return keys;
}

function loadOfferBookings(): OfferBooking[] {
  const raw = localStorage.getItem(LS_KEY_OFFER_BOOKINGS);
  return raw ? (JSON.parse(raw) as OfferBooking[]) : [];
}

function saveOfferBookings(list: OfferBooking[]) {
  localStorage.setItem(LS_KEY_OFFER_BOOKINGS, JSON.stringify(list));
}

function loadNotifications(): ScheduledNotification[] {
  const raw = localStorage.getItem(LS_KEY_NOTIFICATIONS);
  return raw ? (JSON.parse(raw) as ScheduledNotification[]) : [];
}

function saveNotifications(list: ScheduledNotification[]) {
  localStorage.setItem(LS_KEY_NOTIFICATIONS, JSON.stringify(list));
}

export const mockApi = {
  async requestOtp(phone: string): Promise<{ otpId: string }> {
    if (!/^[0-9]{9,15}$/.test(phone)) throw new Error("Invalid phone");
    const otpId = "otp_" + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem(otpId, "123456");
    return new Promise((r) => setTimeout(() => r({ otpId }), 400));
  },
  async verifyOtp(otpId: string, code: string): Promise<AuthSession> {
    const expected = sessionStorage.getItem(otpId);
    if (!expected || code !== expected) throw new Error("Invalid code");
    const user: User = { id: "usr_" + otpId.slice(-4), phone: "+94XXXXXXXXX" };
    const session: AuthSession = { token: "tok_" + otpId, user };
    localStorage.setItem(LS_KEY_AUTH, JSON.stringify(session));
    return new Promise((r) => setTimeout(() => r(session), 400));
  },
  getSession(): AuthSession | null {
    const raw = localStorage.getItem(LS_KEY_AUTH);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  },
  signOut() {
    localStorage.removeItem(LS_KEY_AUTH);
  },
  async getBookingByRoomId(roomId: string): Promise<Booking | null> {
    const list = loadBookings();
    const b = list.find((x) => x.roomId.toLowerCase() === roomId.toLowerCase()) || null;
    return new Promise((r) => setTimeout(() => r(b), 300));
  },
  async verifyRoomKey(roomId: string, key: string): Promise<boolean> {
    const keys = loadRoomKeys();
    const expected = keys[roomId] ?? keys[roomId.replace(/^[A-Za-z]/, "")];
    const ok = !!expected && key === expected;
    return new Promise((r) => setTimeout(() => r(ok), 250));
  },
  async confirmCheckIn(bookingId: string): Promise<Booking> {
    const list = loadBookings();
    const idx = list.findIndex((b) => b.id === bookingId);
    if (idx === -1) throw new Error("Booking not found");
    list[idx] = { ...list[idx], status: "checked_in" };
    saveBookings(list);
    return new Promise((r) => setTimeout(() => r(list[idx]), 300));
  },
  async listBookings(): Promise<Booking[]> {
    return new Promise((r) => setTimeout(() => r(loadBookings()), 250));
  },
  async bookOffer(input: {
    offerId: string;
    roomId: string;
    quantity: number;
    unitPrice: number;
    startAtISO: string;
  }): Promise<{ booking: OfferBooking; reminder: ScheduledNotification }> {
    if (!input.roomId || input.quantity <= 0 || input.unitPrice < 0) {
      throw new Error("Invalid offer booking input");
    }
    const offerBooking: OfferBooking = {
      id: "ofb_" + Math.random().toString(36).slice(2, 10),
      offerId: input.offerId,
      roomId: input.roomId,
      quantity: input.quantity,
      unitPrice: input.unitPrice,
      totalAmount: Math.round(input.quantity * input.unitPrice * 100) / 100,
      startAtISO: input.startAtISO,
      createdAtISO: new Date().toISOString(),
      note: "Billing added to PMS",
    };
    const all = loadOfferBookings();
    all.push(offerBooking);
    saveOfferBookings(all);

    const trigger = new Date(new Date(input.startAtISO).getTime() - 30 * 60 * 1000);
    const reminder: ScheduledNotification = {
      id: "ntf_" + Math.random().toString(36).slice(2, 10),
      title: "Upcoming service reminder",
      message: `Your ${input.offerId} starts soon. We'll see you in 30 minutes!`,
      triggerAtISO: trigger.toISOString(),
      delivered: false,
      relatedOfferBookingId: offerBooking.id,
    };
    const notifs = loadNotifications();
    notifs.push(reminder);
    saveNotifications(notifs);

    return new Promise((r) => setTimeout(() => r({ booking: offerBooking, reminder }), 350));
  },
  async listOfferBookings(): Promise<OfferBooking[]> {
    return new Promise((r) => setTimeout(() => r(loadOfferBookings()), 200));
  },
  async listScheduledNotifications(): Promise<ScheduledNotification[]> {
    return new Promise((r) => setTimeout(() => r(loadNotifications()), 200));
  },
  async markNotificationDelivered(id: string): Promise<void> {
    const list = loadNotifications();
    const idx = list.findIndex((n) => n.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], delivered: true };
      saveNotifications(list);
    }
    return new Promise((r) => setTimeout(() => r(), 50));
  },
};
