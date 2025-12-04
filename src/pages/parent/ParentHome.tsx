import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Filter, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TutorCard } from "@/components/TutorCard";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

const mockTutors = [
  {
    id: 1,
    name: "Priya Sharma",
    subjects: ["Mathematics", "Science", "English"],
    rating: 4.9,
    reviews: 127,
    distance: "1.2 km",
    availability: "Morning",
    experience: "5 years",
    hourlyRate: 400,
  },
  {
    id: 2,
    name: "Rahul Verma",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    rating: 4.8,
    reviews: 89,
    distance: "2.5 km",
    availability: "Evening",
    experience: "3 years",
    hourlyRate: 350,
  },
  {
    id: 3,
    name: "Anjali Patel",
    subjects: ["Hindi", "Social Studies", "English"],
    rating: 4.7,
    reviews: 64,
    distance: "0.8 km",
    availability: "Afternoon",
    experience: "7 years",
    hourlyRate: 450,
  },
];

export default function ParentHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutors = mockTutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h1 className="text-xl font-bold text-foreground">Parent</h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Sector 15, Noida</span>
            <Button variant="link" size="sm" className="h-auto p-0 text-primary">
              Change
            </Button>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search subject or tutor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {["Mathematics", "Science", "English"].map((subject) => (
            <button
              key={subject}
              onClick={() => setSearchQuery(subject)}
              className="p-3 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Tutors List */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">
            Nearby Tutors ({filteredTutors.length})
          </h2>
        </div>

        <div className="space-y-4">
          {filteredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              {...tutor}
              onBook={() => {
                navigate(`/parent/book/${tutor.id}`);
              }}
              onViewProfile={() => {
                navigate(`/parent/tutor/${tutor.id}`);
              }}
            />
          ))}

          {filteredTutors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tutors found</p>
              <Button
                variant="link"
                onClick={() => setSearchQuery("")}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNav role="parent" />
    </div>
  );
}
