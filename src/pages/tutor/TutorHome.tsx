import { useState } from "react";
import { Bell, CheckCircle, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingRequestCard } from "@/components/BookingRequestCard";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

const mockRequests = [
  {
    id: 1,
    studentName: "Aryan Kumar",
    parentName: "Sunita Kumar",
    subject: "Mathematics",
    classLevel: "8",
    time: "Today, 4:00 PM",
    duration: "1 hour",
    distance: "1.5 km",
    address: "B-42, Sector 15, Noida",
  },
  {
    id: 2,
    studentName: "Priya Singh",
    parentName: "Rajesh Singh",
    subject: "Physics",
    classLevel: "11",
    time: "Tomorrow, 5:00 PM",
    duration: "1.5 hours",
    distance: "2.3 km",
    address: "A-12, Sector 18, Noida",
  },
];

export default function TutorHome() {
  const [requests, setRequests] = useState(mockRequests);
  const [isVerified, setIsVerified] = useState(true); // Mock verification status

  const handleAccept = (id: number) => {
    toast.success("Request accepted! Check your schedule.");
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDecline = (id: number) => {
    toast.info("Request declined");
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Good Morning,</p>
              <h1 className="text-xl font-bold text-foreground">Tutor</h1>
            </div>
            <div className="flex items-center gap-2">
              {isVerified ? (
                <span className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-full">
                  <CheckCircle className="w-3 h-3 text-success" />
                  <span className="text-xs font-medium text-success">Verified</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                  <Clock className="w-3 h-3 text-accent" />
                  <span className="text-xs font-medium text-accent">Pending</span>
                </span>
              )}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-6 h-6" />
                {requests.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card rounded-xl border-2 border-border p-3 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Classes Done</p>
          </div>
          <div className="bg-card rounded-xl border-2 border-border p-3 text-center">
            <p className="text-2xl font-bold text-success">4.8</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
          <div className="bg-card rounded-xl border-2 border-border p-3 text-center">
            <div className="flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-accent" />
              <span className="text-2xl font-bold text-accent">4,800</span>
            </div>
            <p className="text-xs text-muted-foreground">This Month</p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            New Requests
            {requests.length > 0 && (
              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                {requests.length}
              </span>
            )}
          </h2>
        </div>

        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <BookingRequestCard
                key={request.id}
                {...request}
                onAccept={() => handleAccept(request.id)}
                onDecline={() => handleDecline(request.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-2xl border-2 border-border">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No pending requests</p>
            <p className="text-sm text-muted-foreground mt-1">
              New requests will appear here
            </p>
          </div>
        )}
      </main>

      <BottomNav role="tutor" />
    </div>
  );
}
