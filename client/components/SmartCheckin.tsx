import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSignupModal } from "@/context/SignupModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { mockApi } from "@/services/mockApi";

export default function SmartCheckin() {
  const [roomId, setRoomId] = useState("");
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useAuth();
  const { show } = useSignupModal();

  const askPin = () => setPinOpen(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = roomId.trim();
    if (!id) return;
    const redirect = `/welcome?roomId=${encodeURIComponent(id)}`;
    if (!session) {
      show(redirect);
      return;
    }
    askPin();
  };

  const verifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    if (!/^\d{4}$/.test(pin)) {
      setPinError("Enter 4 digits");
      return;
    }
    setLoading(true);
    const ok = await mockApi.verifyRoomKey(roomId.trim(), pin);
    setLoading(false);
    if (!ok) {
      setPinError("Incorrect key");
      return;
    }
    setPinOpen(false);
    navigate(`/welcome?roomId=${encodeURIComponent(roomId.trim())}`);
  };

  return (
    <section className="mx-4 -mt-4 rounded-2xl bg-card/90 backdrop-blur shadow-lg ring-1 ring-border px-4 py-4">
      <h2 className="text-lg font-semibold mb-2 font-serif">Smart Check‑In</h2>
      <p className="text-sm text-muted-foreground mb-3">Enter your Room ID to start quick check‑in.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          inputMode="text"
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="flex-1 rounded-md border bg-background px-3 py-2 text-base outline-none focus:ring-2 focus:ring-ring"
          aria-label="Room ID"
        />
        <Button type="submit" className="min-w-[90px] bg-primary text-primary-foreground">
          <Search className="mr-2 h-5 w-5" /> Start
        </Button>
      </form>

      <Dialog open={pinOpen} onOpenChange={setPinOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif">Enter 4‑digit room key</DialogTitle>
            <DialogDescription>For security, please confirm your booking with the room key.</DialogDescription>
          </DialogHeader>
          <form onSubmit={verifyPin} className="space-y-3">
            <input
              className="w-full rounded-md border bg-background px-3 py-2 tracking-[0.5em] text-center text-lg"
              inputMode="numeric"
              placeholder="••••"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              required
            />
            {pinError && <p className="text-destructive text-sm">{pinError}</p>}
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Validating…" : "Continue"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
