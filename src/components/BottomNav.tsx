import { Home, Search, Calendar, User, BookOpen, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const parentNavItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/parent" },
  { icon: Search, label: "Find", path: "/parent/search" },
  { icon: Calendar, label: "Bookings", path: "/parent/bookings" },
  { icon: User, label: "Profile", path: "/parent/profile" },
];

const tutorNavItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/tutor" },
  { icon: BookOpen, label: "Requests", path: "/tutor/requests" },
  { icon: Calendar, label: "Schedule", path: "/tutor/schedule" },
  { icon: Wallet, label: "Earnings", path: "/tutor/earnings" },
  { icon: User, label: "Profile", path: "/tutor/profile" },
];

interface BottomNavProps {
  role: "parent" | "tutor";
}

export function BottomNav({ role }: BottomNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = role === "parent" ? parentNavItems : tutorNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border safe-area-inset z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "animate-bounce-soft")} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
