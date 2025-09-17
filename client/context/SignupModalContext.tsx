import { createContext, useContext, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface SignupModalCtx {
  show: (redirectPath?: string) => void;
  hide: () => void;
}

const Ctx = createContext<SignupModalCtx | undefined>(undefined);

export function SignupModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState<string | undefined>(undefined);
  const show = (path?: string) => {
    setRedirect(path);
    setOpen(true);
  };
  const hide = () => setOpen(false);
  const value = useMemo(() => ({ show, hide }), []);

  return (
    <Ctx.Provider value={value}>
      {children}
      {open && <SignupModal open={open} onOpenChange={setOpen} redirect={redirect} />}
    </Ctx.Provider>
  );
}

export function useSignupModal() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSignupModal must be used within SignupModalProvider");
  return v;
}

function SignupModal({ open, onOpenChange, redirect }: { open: boolean; onOpenChange: (o: boolean) => void; redirect?: string }) {
  const navigate = useNavigate();
  const { requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [code, setCode] = useState("+94");
  const [phone, setPhone] = useState("");
  const [otpId, setOtpId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const digits = (code.replace("+", "") + phone).replace(/\D/g, "");
      const res = await requestOtp(digits);
      setOtpId(res.otpId);
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to request OTP");
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpId) return;
    setLoading(true);
    setError(null);
    try {
      await verifyOtp(otpId, otp);
      onOpenChange(false);
      if (redirect) navigate(redirect);
    } catch (err: any) {
      setError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif">Sign up</DialogTitle>
          <DialogDescription>Use your mobile number to continue. Well send a 6	digit code.</DialogDescription>
        </DialogHeader>
        {step === "phone" ? (
          <form onSubmit={submitPhone} className="space-y-3">
            <div className="flex gap-2">
              <select value={code} onChange={(e) => setCode(e.target.value)} className="w-[110px] rounded-md border bg-background px-2 py-2">
                <option value="+94">🇱🇰 +94</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+1">🇺🇸 +1</option>
              </select>
              <input
                className="flex-1 rounded-md border bg-background px-3 py-2"
                placeholder="77 123 4567"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form onSubmit={submitOtp} className="space-y-3">
            <label className="block text-sm">Enter OTP (use 123456)</label>
            <input
              className="w-full rounded-md border bg-background px-3 py-2 tracking-widest text-center text-lg"
              placeholder="123456"
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
