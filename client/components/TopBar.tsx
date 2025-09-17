import { Link } from "react-router-dom"; 
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSignupModal } from "@/context/SignupModalContext";

export default function TopBar() {
  const { session } = useAuth();
  const { show } = useSignupModal();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-screen-sm px-2 py-1 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F7ae52d6bd8c7493b8e62f39b6ed33048%2F87a94e0bd9394d0aaad0ff4c7507a0ab?format=webp&width=800"
            alt="Araliya Beach Resort"
            className="h-12 w-36" // increased from h-8
          />
          <span className="sr-only">Araliya Beach Resort</span>
        </Link>

        {session ? (
          <Link
            to="/profile"
            aria-label="Profile"
            className="p-2 rounded-full bg-card border hover:bg-muted transition-colors"
          >
            <User className="h-6 w-6 text-foreground" />
          </Link>
        ) : (
          <button
            onClick={() => show()}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[hsl(var(--araliya-gold))] text-black border border-black/10 shadow-sm"
          >
            Sign up
          </button>
        )}
      </div>
    </header>
  );
}
