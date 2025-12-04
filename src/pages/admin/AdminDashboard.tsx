import { useState } from "react";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  IndianRupee, 
  CheckCircle, 
  XCircle,
  Clock,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PendingTutor {
  id: number;
  name: string;
  age: number;
  qualification: string;
  subjects: string[];
  phone: string;
  submittedAt: string;
}

const mockPendingTutors: PendingTutor[] = [
  {
    id: 1,
    name: "Amit Kumar",
    age: 28,
    qualification: "M.Sc. Mathematics",
    subjects: ["Mathematics", "Physics"],
    phone: "9876543210",
    submittedAt: "2 hours ago",
  },
  {
    id: 2,
    name: "Sneha Sharma",
    age: 25,
    qualification: "B.Ed., B.A. English",
    subjects: ["English", "Hindi"],
    phone: "9876543211",
    submittedAt: "5 hours ago",
  },
];

const stats = [
  { label: "Total Parents", value: 156, icon: Users, color: "text-primary" },
  { label: "Active Tutors", value: 42, icon: GraduationCap, color: "text-success" },
  { label: "Bookings Today", value: 28, icon: Calendar, color: "text-accent" },
  { label: "Revenue (₹)", value: "45,200", icon: IndianRupee, color: "text-primary" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [pendingTutors, setPendingTutors] = useState(mockPendingTutors);
  const [activeTab, setActiveTab] = useState<"overview" | "tutors" | "bookings" | "payments">("overview");

  const handleApproveTutor = (id: number) => {
    toast.success("Tutor approved!");
    setPendingTutors((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRejectTutor = (id: number) => {
    toast.info("Tutor rejected");
    setPendingTutors((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 max-w-6xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="ghost" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="px-4 py-6 max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl border-2 border-border p-4 animate-fade-in"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: "overview", label: "Overview" },
            { key: "tutors", label: "Pending Tutors" },
            { key: "bookings", label: "Bookings" },
            { key: "payments", label: "Payments" },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              {tab.label}
              {tab.key === "tutors" && pendingTutors.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">
                  {pendingTutors.length}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "tutors" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Pending Verifications</h2>
            {pendingTutors.length > 0 ? (
              pendingTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-card rounded-2xl border-2 border-border p-5 animate-fade-in"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{tutor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tutor.qualification} • Age: {tutor.age}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 px-2 py-1 bg-accent/10 rounded-full">
                      <Clock className="w-3 h-3 text-accent" />
                      <span className="text-xs font-medium text-accent">
                        {tutor.submittedAt}
                      </span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutor.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Phone: {tutor.phone}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleRejectTutor(tutor.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="success"
                      className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                      onClick={() => handleApproveTutor(tutor.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-2xl border-2 border-border">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
                <p className="text-muted-foreground">All tutors verified!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "overview" && (
          <div className="bg-card rounded-2xl border-2 border-border p-6 text-center">
            <p className="text-muted-foreground">
              Welcome to the admin dashboard. Use the tabs above to manage tutors, bookings, and payments.
            </p>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bg-card rounded-2xl border-2 border-border p-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Booking management coming soon</p>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="bg-card rounded-2xl border-2 border-border p-6 text-center">
            <IndianRupee className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Payment management coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}
