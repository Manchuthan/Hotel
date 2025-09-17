import { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { AuthSession } from "@shared/api";
import { mockApi } from "@/services/mockApi";

interface AuthContextValue {
  session: AuthSession | null;
  requestOtp: (phone: string) => Promise<{ otpId: string }>;
  verifyOtp: (otpId: string, code: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(mockApi.getSession());
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({
      session,
      requestOtp: (phone) => mockApi.requestOtp(phone),
      verifyOtp: async (otpId, code) => {
        const s = await mockApi.verifyOtp(otpId, code);
        setSession(s);
      },
      signOut: () => {
        mockApi.signOut();
        setSession(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
