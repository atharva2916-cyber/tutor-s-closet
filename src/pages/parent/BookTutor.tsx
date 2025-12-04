import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, BookOpen, MapPin, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Hindi",
  "Social Studies",
  "Physics",
  "Chemistry",
];

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const durations = [
  { label: "1 Hour", value: 1 },
  { label: "1.5 Hours", value: 1.5 },
  { label: "2 Hours", value: 2 },
];

export default function BookTutor() {
  const navigate = useNavigate();
  const { tutorId } = useParams();
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [isBooked, setIsBooked] = useState(false);

  const handleBook = () => {
    if (!selectedSubject || !selectedDate || !selectedTime) {
      toast.error("Please complete all fields");
      return;
    }
    
    setIsBooked(true);
    toast.success("Booking request sent!");
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Booking Sent!
          </h1>
          <p className="text-muted-foreground mb-8">
            Waiting for tutor to accept your request
          </p>
          <Button onClick={() => navigate("/parent/bookings")}>
            View My Bookings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header title="Book a Session" showBack />

      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Select Subject
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedSubject === subject
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            <Button
              className="w-full mt-6"
              disabled={!selectedSubject}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Select Date & Time
            </h2>

            <div className="mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="flex h-12 w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Preferred Time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                      selectedTime === time
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Session Duration
            </h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {durations.map((dur) => (
                <button
                  key={dur.value}
                  onClick={() => setSelectedDuration(dur.value)}
                  className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    selectedDuration === dur.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-secondary rounded-xl p-4 mb-6">
              <h3 className="font-semibold mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subject</span>
                  <span className="font-medium">{selectedSubject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{selectedDuration} hour(s)</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">₹{400 * selectedDuration}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleBook}>
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
