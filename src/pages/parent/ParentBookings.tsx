import { useState } from "react";
import { Clock, CheckCircle, XCircle, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Booking {
  id: number;
  tutorName: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    tutorName: "Priya Sharma",
    subject: "Mathematics",
    date: "Dec 5, 2024",
    time: "4:00 PM",
    duration: "1 hour",
    status: "pending",
    amount: 400,
  },
  {
    id: 2,
    tutorName: "Rahul Verma",
    subject: "Physics",
    date: "Dec 4, 2024",
    time: "5:00 PM",
    duration: "1.5 hours",
    status: "confirmed",
    amount: 525,
  },
  {
    id: 3,
    tutorName: "Anjali Patel",
    subject: "English",
    date: "Dec 2, 2024",
    time: "3:00 PM",
    duration: "1 hour",
    status: "completed",
    amount: 450,
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-accent",
    bg: "bg-accent/10",
    label: "Pending",
  },
  confirmed: {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
    label: "Confirmed",
  },
  completed: {
    icon: CheckCircle,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Completed",
  },
  cancelled: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Cancelled",
  },
};

export default function ParentBookings() {
  const [showRating, setShowRating] = useState<number | null>(null);
  const [rating, setRating] = useState(0);

  const handleRate = (bookingId: number) => {
    toast.success("Thank you for your feedback!");
    setShowRating(null);
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="My Bookings" showHelp />

      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="space-y-4">
          {mockBookings.map((booking) => {
            const status = statusConfig[booking.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={booking.id}
                className="bg-card rounded-2xl border-2 border-border shadow-card p-4 animate-fade-in"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground">{booking.tutorName}</h3>
                    <p className="text-sm text-muted-foreground">{booking.subject}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${status.bg}`}>
                    <StatusIcon className={`w-3 h-3 ${status.color}`} />
                    <span className={`text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground text-xs">Date</p>
                    <p className="font-medium">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Time</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Duration</p>
                    <p className="font-medium">{booking.duration}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <p className="font-bold text-primary">₹{booking.amount}</p>

                  {booking.status === "completed" && showRating !== booking.id && (
                    <Button size="sm" variant="outline" onClick={() => setShowRating(booking.id)}>
                      Rate Session
                    </Button>
                  )}

                  {booking.status === "pending" && (
                    <Button size="sm" variant="outline" className="text-destructive">
                      Cancel
                    </Button>
                  )}
                </div>

                {showRating === booking.id && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    <p className="text-sm font-medium mb-2">Rate your experience</p>
                    <div className="flex gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setRating(star)}>
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowRating(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={rating === 0}
                        onClick={() => handleRate(booking.id)}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav role="parent" />
    </div>
  );
}
