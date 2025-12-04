import { Star, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TutorCardProps {
  name: string;
  subjects: string[];
  rating: number;
  reviews: number;
  distance: string;
  availability: string;
  experience: string;
  hourlyRate: number;
  imageUrl?: string;
  onBook: () => void;
  onViewProfile: () => void;
}

export function TutorCard({
  name,
  subjects,
  rating,
  reviews,
  distance,
  availability,
  experience,
  hourlyRate,
  imageUrl,
  onBook,
  onViewProfile,
}: TutorCardProps) {
  return (
    <div className="bg-card rounded-2xl border-2 border-border shadow-card p-4 animate-fade-in">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-xl bg-primary/10 overflow-hidden flex-shrink-0">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-primary">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-foreground truncate">{name}</h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-semibold">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {subjects.slice(0, 3).map((subject) => (
              <span
                key={subject}
                className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
              >
                {subject}
              </span>
            ))}
            {subjects.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-muted-foreground">
                +{subjects.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {availability}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">{experience} experience</p>
          <p className="text-lg font-bold text-primary">₹{hourlyRate}/hr</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onViewProfile}>
            View
          </Button>
          <Button size="sm" onClick={onBook}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
