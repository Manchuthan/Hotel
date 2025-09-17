import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <TopBar />
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
