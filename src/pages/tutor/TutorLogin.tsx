import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Phone, ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Studies",
  "Physics",
  "Chemistry",
  "Biology",
];

export default function TutorLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [qualification, setQualification] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);

  const handlePhoneSubmit = () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setStep(2);
  };

  const handleSignUp = () => {
    if (!name || !age || !qualification) {
      toast.error("Please fill all required fields");
      return;
    }
    if (selectedSubjects.length === 0) {
      toast.error("Please select at least one subject");
      return;
    }
    if (availability.length === 0) {
      toast.error("Please select your availability");
      return;
    }
    
    toast.success("Registration submitted! Awaiting verification.");
    navigate("/tutor");
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleAvailability = (time: string) => {
    setAvailability((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {step === 1 ? "Tutor Login" : "Complete Your Profile"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {step === 1 ? "Enter your phone number" : `Step ${step - 1} of 2`}
        </p>
      </div>

      {/* Progress */}
      {step > 1 && (
        <div className="flex gap-2 mb-6 max-w-sm mx-auto w-full">
          {[2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {/* Form */}
      <div className="flex-1 max-w-sm mx-auto w-full space-y-4 animate-slide-up overflow-auto">
        {step === 1 && (
          <>
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
            <Button className="w-full" size="lg" onClick={handlePhoneSubmit}>
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min={18}
              max={70}
            />
            <Input
              type="text"
              placeholder="Highest Qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />

            <div className="pt-4">
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Upload ID & Qualification Documents
              </label>
              <button className="w-full p-6 rounded-xl border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Tap to upload</span>
              </button>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Subjects You Teach
              </label>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedSubjects.includes(subject)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <label className="text-sm font-medium text-muted-foreground mb-3 block">
                Your Availability
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Morning", "Afternoon", "Evening"].map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleAvailability(time)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      availability.includes(time)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleSignUp}>
                Submit
              </Button>
            </div>
          </>
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
