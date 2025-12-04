import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

export function RoleCard({ icon: Icon, title, description, onClick, className }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-6 rounded-2xl border-2 border-border bg-card text-left shadow-card",
        "hover:border-primary hover:shadow-elevated hover:scale-[1.02]",
        "active:scale-[0.98] transition-all duration-200",
        "flex flex-col items-center gap-4",
        className
      )}
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </button>
  );
}
