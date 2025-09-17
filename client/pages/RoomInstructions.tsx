import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { mockApi } from "@/services/mockApi";
import type { Booking } from "@shared/api";
import { Button } from "@/components/ui/button";
import { MapPin, DoorOpen, ChevronsUpDown, Info } from "lucide-react";

export default function RoomInstructions() {
  const [params] = useSearchParams();
  const bookingId = params.get("bookingId");
  const roomIdParam = params.get("roomId");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      if (bookingId) {
        const list = await mockApi.listBookings();
        setBooking(list.find((b) => b.id === bookingId) || null);
      } else if (roomIdParam) {
        setBooking(await mockApi.getBookingByRoomId(roomIdParam));
      }
      setLoading(false);
    };
    run();
  }, [bookingId, roomIdParam]);

  const instructions = useMemo(() => {
    const room = booking?.roomId || roomIdParam || "";
    return {
      floor: room.match(/^[A-Z]?([0-9])/i)?.[1] || "1",
      wing: room.startsWith("A") ? "Ocean Wing" : room.startsWith("B") ? "Garden Wing" : "Main Tower",
      doorCode: "*101#",
      wifi: { ssid: "Araliya-Guest", pass: "OceanElegance" },
    };
  }, [booking, roomIdParam]);

  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <h1 className="font-serif text-2xl mb-2">Room Instructions</h1>
      {loading && <p>Loading…</p>}
      {!loading && !booking && (
        <p className="text-muted-foreground">We couldn't find your booking. Try Smart Check‑In again.</p>
      )}
      {booking && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-card ring-1 ring-border p-4">
            <p className="text-sm text-muted-foreground">Room</p>
            <p className="font-serif text-xl">{booking.roomId}</p>
            <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Take the {instructions.wing} elevator to Floor {instructions.floor}.</div>
              <div className="flex items-center gap-2"><ChevronsUpDown className="h-4 w-4"/> Follow signs to corridor {instructions.wing}‑{instructions.floor}.</div>
              <div className="flex items-center gap-2"><DoorOpen className="h-4 w-4"/> Door code: <span className="font-mono px-1.5 py-0.5 rounded bg-muted">{instructions.doorCode}</span></div>
              <div className="flex items-center gap-2"><Info className="h-4 w-4"/> Wi‑Fi: <span className="font-medium">{instructions.wifi.ssid}</span> • Pass: <span className="font-mono">{instructions.wifi.pass}</span></div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden ring-1 ring-border">
            <img
              src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
              alt="Corridor"
              className="h-36 w-full object-cover"
            />
          </div>

          <div className="flex gap-2">
            <Link to="/offers" className="flex-1"><Button className="w-full">Recommended Offers</Button></Link>
            <Link to="/" className="flex-1"><Button variant="outline" className="w-full">Home</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
}
