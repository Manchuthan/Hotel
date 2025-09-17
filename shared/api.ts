/**
 * Shared types between client and server
 */

export interface DemoResponse {
  message: string;
}

export interface User {
  id: string;
  phone: string;
  name?: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export type BookingStatus = "reserved" | "checked_in" | "completed";

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  checkInDate: string; // ISO date
  checkOutDate: string; // ISO date
  status: BookingStatus;
}

export interface OfferBooking {
  id: string;
  offerId: string;
  roomId: string;
  quantity: number;
  unitPrice: number; // in LKR or relevant currency units
  totalAmount: number;
  startAtISO: string; // service start time chosen by user
  createdAtISO: string;
  note: string; // e.g., "Billing added to PMS"
}

export interface ScheduledNotification {
  id: string;
  title: string;
  message: string;
  triggerAtISO: string; // when to notify
  delivered: boolean;
  relatedOfferBookingId?: string;
}
