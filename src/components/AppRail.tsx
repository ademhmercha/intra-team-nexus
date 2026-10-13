import { Link } from "@tanstack/react-router";
import { MessageSquare, Video, Shield, LogOut } from "lucide-react";

const items = [
  { to: "/chat", icon: MessageSquare, label: "Messages" },
  { to: "/call", icon: Video, label: "Appels" },
  { to: "/admin", icon: Shield, label: "Admin" },
] as const;

export function AppRail() {
  return (
    <nav className="flex w-16 shrink-0 flex-col items-center gap-3 bg-rail py-4 text-primary-foreground">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-accent font-display text-lg font-bold text-accent-foreground">T</div>
      {items.map(({ to, icon: Icon, label }) => (
        <Link
          key={to}
          to={to}
          title={label}
          className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground/60 transition hover:bg-primary-foreground/10 hover:text-primary-foreground"
          activeProps={{ className: "bg-primary text-primary-foreground" }}
        >
          <Icon className="h-5 w-5" />
        </Link>
      ))}
      <Link to="/" title="Déconnexion" className="mt-auto grid h-11 w-11 place-items-center rounded-xl text-primary-foreground/60 hover:text-primary-foreground">
        <LogOut className="h-5 w-5" />
      </Link>
    </nav>
  );
}

export function Avatar({ initials, status, size = "md" }: { initials: string; status?: string; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "h-20 w-20 text-2xl" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <div className={`relative grid ${s} shrink-0 place-items-center rounded-full bg-bubble font-semibold text-primary`}>
      {initials}
      {status && (
        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${status === "online" ? "bg-success" : status === "away" ? "bg-accent" : "bg-muted-foreground"}`} />
      )}
    </div>
  );
}
