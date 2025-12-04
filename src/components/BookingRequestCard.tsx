import { MapPin, Clock, BookOpen, User } from "lucide-react";
import { Button } from "./ui/button";

interface BookingRequestCardProps {
  studentName: string;
  parentName: string;
  subject: string;
  classLevel: string;
  time: string;
  duration: string;
  distance: string;
  address: string;
  onAccept: () => void;
  onDecline: () => void;
}

export function BookingRequestCard({
  studentName,
  parentName,
  subject,
  classLevel,
  time,
  duration,
  distance,
  address,
  onAccept,
  onDecline,
}: BookingRequestCardProps) {
  return (
    <div className="bg-card rounded-2xl border-2 border-border shadow-card p-5 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{studentName}</h3>
            <p className="text-sm text-muted-foreground">Parent: {parentName}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
          New Request
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="font-medium">{subject}</span>
          <span className="text-muted-foreground">• Class {classLevel}</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="font-medium">{time}</span>
          <span className="text-muted-foreground">• {duration}</span>
        </div>
        
        <div className="flex items-start gap-3 text-sm">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-medium">{distance} away</span>
            <p className="text-muted-foreground text-xs mt-0.5">{address}</p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onDecline}>
          Decline
        </Button>
        <Button className="flex-1" onClick={onAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
}
