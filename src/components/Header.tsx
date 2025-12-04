import { ArrowLeft, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showHelp?: boolean;
  onHelpClick?: () => void;
}

export function Header({ title, showBack = false, showHelp = false, onHelpClick }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => navigate(-1)}
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
        </div>
        
        {showHelp && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onHelpClick}
            className="rounded-xl text-primary"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
