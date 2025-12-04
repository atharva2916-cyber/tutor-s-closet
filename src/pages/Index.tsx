import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo & Branding */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">
            Tutor's Closet
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Find the perfect tutor for your child
          </p>
        </div>

        {/* Role Selection */}
        <div className="w-full max-w-sm space-y-4 animate-slide-up">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            I am a...
          </p>
          
          <RoleCard
            icon={Users}
            title="Parent / Student"
            description="Find and book tutors near you"
            onClick={() => navigate("/parent/login")}
          />
          
          <RoleCard
            icon={GraduationCap}
            title="Tutor"
            description="Teach students and earn money"
            onClick={() => navigate("/tutor/login")}
          />
        </div>

        {/* Admin Link */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button
            variant="ghost"
            className="text-muted-foreground text-sm"
            onClick={() => navigate("/admin/login")}
          >
            Admin Login
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Safe & Trusted Home Tutoring
        </p>
      </footer>
    </div>
  );
};

export default Index;
