import { IndianRupee, TrendingUp, Calendar, ArrowDownToLine } from "lucide-react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const transactions = [
  { id: 1, student: "Aryan Kumar", subject: "Mathematics", date: "Dec 4", amount: 400 },
  { id: 2, student: "Priya Singh", subject: "Physics", date: "Dec 3", amount: 525 },
  { id: 3, student: "Rahul Sharma", subject: "Chemistry", date: "Dec 2", amount: 400 },
  { id: 4, student: "Neha Gupta", subject: "English", date: "Dec 1", amount: 350 },
];

export default function TutorEarnings() {
  const totalEarnings = 4800;
  const pendingAmount = 1200;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Earnings" showHelp />

      <main className="px-4 py-6 max-w-md mx-auto">
        {/* Balance Card */}
        <div className="bg-primary rounded-2xl p-6 text-primary-foreground mb-6 shadow-elevated animate-fade-in">
          <p className="text-sm opacity-80 mb-1">Available Balance</p>
          <div className="flex items-center gap-1 mb-4">
            <IndianRupee className="w-8 h-8" />
            <span className="text-4xl font-bold">{totalEarnings}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+₹{pendingAmount} pending</span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
            >
              <ArrowDownToLine className="w-4 h-4 mr-1" />
              Withdraw
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl border-2 border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <p className="text-xl font-bold">₹2,400</p>
            <p className="text-xs text-success">+12% from last week</p>
          </div>
          <div className="bg-card rounded-xl border-2 border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <p className="text-xl font-bold">₹4,800</p>
            <p className="text-xs text-muted-foreground">12 classes</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground">Recent Earnings</h2>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-card rounded-xl border-2 border-border p-4 flex items-center justify-between animate-fade-in"
            >
              <div>
                <p className="font-semibold text-foreground">{tx.student}</p>
                <p className="text-sm text-muted-foreground">
                  {tx.subject} • {tx.date}
                </p>
              </div>
              <p className="font-bold text-success">+₹{tx.amount}</p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav role="tutor" />
    </div>
  );
}
