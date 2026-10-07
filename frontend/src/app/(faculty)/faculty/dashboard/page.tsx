import Link from "next/link";
import { Compass, Users, CheckCircle, AlertCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FacultyDashboard() {
  const stats = [
    { name: "Active Clubs", value: "24", icon: Compass, desc: "2 pending approval" },
    { name: "Total Club Members", value: "1,240", icon: Users, desc: "Across all clubs" },
    { name: "Assigned Coordinators", value: "32", icon: CheckCircle, desc: "Faculty & Student" },
  ];

  const pendingClubs = [
    { id: "1", name: "FinTech Club", proposer: "Alice Smith", date: "Jul 22, 2026" },
    { id: "2", name: "Astronomy & Stargazing", proposer: "Bob Jones", date: "Jul 24, 2026" },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Campus-wide Club Management & Administrative Panel.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="border border-border bg-card p-6 rounded-lg shadow-xs flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <stat.icon className="size-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.name}</span>
              <div className="text-2xl font-bold mt-0.5">{stat.value}</div>
              <span className="text-xs text-muted-foreground">{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Club Approvals */}
        <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-1.5">
              <AlertCircle className="size-4.5 text-primary" /> Pending Join Request Approvals
            </h2>
            <Link href="/faculty/join-requests" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-primary font-medium")}>
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {pendingClubs.map((club) => (
              <div
                key={club.id}
                className="flex items-center justify-between p-4 border border-border rounded-md bg-muted/10"
              >
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{club.name}</h4>
                  <p className="text-xs text-muted-foreground">Proposed by {club.proposer} • {club.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="xs" variant="outline" className="text-[10px] h-7 px-2">
                    Decline
                  </Button>
                  <Button size="xs" className="text-[10px] h-7 px-2">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
            {pendingClubs.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">No pending club registration approvals.</p>
            )}
          </div>
        </div>

        {/* System Operations/Quick links */}
        <div className="border border-border bg-card rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight mb-3">System Actions & Reports</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Access database exports, system configurations, and campus engagement metrics.
            </p>
            <div className="space-y-3">
              <Link href="/faculty/reports" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-start text-xs font-semibold inline-flex items-center")}>
                Generate Engagement Audit
              </Link>
              <Link href="/faculty/coordinators" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-start text-xs font-semibold inline-flex items-center")}>
                Assign New Faculty Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
