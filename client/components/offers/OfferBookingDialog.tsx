import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { mockApi } from "@/services/mockApi";
import { toast } from "@/hooks/use-toast";
import { setupPendingReminders } from "@/services/notifications";

export interface OfferForBooking {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price: number;
}

export default function OfferBookingDialog({ open, onOpenChange, offer, defaultDay = "today" }: { open: boolean; onOpenChange: (v: boolean) => void; offer: OfferForBooking | null; defaultDay?: "today" | "tomorrow" }) {
  const [quantity, setQuantity] = useState(1);
  const [roomId, setRoomId] = useState("");
  const [startAt, setStartAt] = useState("");
  const [loading, setLoading] = useState(false);
  const total = useMemo(() => Math.round(quantity * (offer?.price ?? 0) * 100) / 100, [quantity, offer]);

  useEffect(() => {
    if (!open) return;
    setQuantity(1);
    const now = new Date();
    const base = new Date(
      defaultDay === "tomorrow" ? now.getTime() + 24 * 60 * 60 * 1000 : now.getTime(),
    );
    const nextHour = new Date(base);
    nextHour.setMinutes(0, 0, 0);
    nextHour.setHours(base.getHours() + 1);
    const isoLocal = new Date(nextHour.getTime() - nextHour.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setStartAt(isoLocal);
    mockApi.listBookings().then((ls) => {
      const checkedIn = ls.find((b) => b.status === "checked_in");
      const any = checkedIn ?? ls[0];
      if (any) setRoomId(any.roomId);
    });
  }, [open, defaultDay]);

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(99, q + 1));

  const confirm = async () => {
    if (!offer) return;
    if (!roomId.trim()) {
      toast({ title: "Room ID required", description: "Please enter your room ID." });
      return;
    }
    if (!startAt) {
      toast({ title: "Start time required", description: "Select the service start time." });
      return;
    }
    const start = new Date(startAt);
    if (isNaN(start.getTime())) {
      toast({ title: "Invalid time", description: "Please choose a valid start time." });
      return;
    }
    setLoading(true);
    try {
      const { booking, reminder } = await mockApi.bookOffer({
        offerId: offer.id,
        roomId,
        quantity,
        unitPrice: offer.price,
        startAtISO: start.toISOString(),
      });
      toast({ title: "Booked", description: `${offer.title} x${quantity} • Total ${booking.totalAmount.toFixed(2)}. Billing added to PMS.` });
      await setupPendingReminders();
      onOpenChange(false);
    } catch (e: any) {
      toast({ title: "Booking failed", description: e.message || "Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {offer && (
          <div>
            <div className="relative h-36 w-full overflow-hidden">
              <img src={offer.image} alt={offer.title} className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="p-4 space-y-3">
              <DialogHeader>
                <DialogTitle>{offer.title}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">{offer.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price</span>
                <span className="font-semibold">{offer.price.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-end">
                <div className="col-span-2">
                  <Label htmlFor="room">Room ID</Label>
                  <Input id="room" value={roomId} readOnly disabled placeholder="No room found" />
                </div>
                <div>
                  <Label>Quantity</Label>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button type="button" className="px-3 py-2" onClick={dec} aria-label="Decrease">-</button>
                    <div className="px-3 select-none w-10 text-center">{quantity}</div>
                    <button type="button" className="px-3 py-2" onClick={inc} aria-label="Increase">+</button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="start">Service start</Label>
                <Input id="start" type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Total</span>
                <span className="text-lg font-semibold">{total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">On confirmation, billing will be added to the PMS of the hotel.</p>
              {!roomId && (
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">No room detected. Please complete check‑in to book offers.</p>
              )}
              <div className="flex gap-2">
                <Button className="flex-1" onClick={confirm} disabled={loading || !roomId}>{loading ? "Confirming…" : "Confirm Booking"}</Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
