import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ParentLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const handleContinue = () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    // Simulate checking if user exists
    setIsNewUser(true);
  };

  const handleSignUp = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!studentClass) {
      toast.error("Please select student's class");
      return;
    }
    
    toast.success("Welcome to Tutor's Closet!");
    navigate("/parent");
  };

  const handleLogin = () => {
    toast.success("Welcome back!");
    navigate("/parent");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {isNewUser ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isNewUser ? "Let's get you started" : "Enter your phone number"}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 max-w-sm mx-auto w-full space-y-4 animate-slide-up">
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className="pl-12"
            maxLength={10}
          />
        </div>

        {isNewUser && (
          <>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            
            <select
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="flex h-12 w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary transition-all duration-200"
            >
              <option value="">Select Student's Class</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={`${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
          </>
        )}

        <Button
          className="w-full"
          size="lg"
          onClick={isNewUser ? handleSignUp : handleContinue}
        >
          {isNewUser ? "Create Account" : "Continue"}
          <ArrowRight className="w-5 h-5" />
        </Button>

        {isNewUser && (
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setIsNewUser(false);
              handleLogin();
            }}
          >
            Already have an account? Login
          </Button>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Button variant="ghost" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
