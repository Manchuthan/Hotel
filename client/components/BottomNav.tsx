import { Link, useLocation } from "react-router-dom";
import { Home, CalendarClock, Gift, Bell } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bookings", label: "Bookings", icon: CalendarClock },
  { to: "/offers", label: "Offers", icon: Gift },
  { to: "/notifications", label: "Alerts", icon: Bell },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="mx-auto max-w-screen-sm grid grid-cols-4 px-2 py-2 text-xs">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to} className="flex justify-center">
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 rounded-md px-2 py-1 ${active ? "text-primary" : "text-muted-foreground"}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={`h-6 w-6 ${active ? "" : "opacity-80"}`} />
                <span className="leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
