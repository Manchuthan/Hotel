import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const { requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otpId, setOtpId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const submitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await requestOtp(phone.replace(/\D/g, ""));
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
      await verifyOtp(otpId, code);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-screen-sm mx-auto">
      <h1 className="font-serif text-2xl mb-2">Sign up</h1>
      {step === "phone" ? (
        <form onSubmit={submitPhone} className="space-y-3">
          <label className="block text-sm">Mobile number</label>
          <input
            className="w-full rounded-md border bg-background px-3 py-2 focus:ring-2 focus:ring-ring"
            placeholder="e.g. 0771234567"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      ) : (
        <form onSubmit={submitOtp} className="space-y-3">
          <label className="block text-sm">Enter OTP (use 123456)</label>
          <input
            className="w-full rounded-md border bg-background px-3 py-2 tracking-widest text-center text-lg focus:ring-2 focus:ring-ring"
            placeholder="123456"
            inputMode="numeric"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? "Verifying..." : "Verify & Continue"}
          </Button>
        </form>
      )}
    </div>
  );
}
