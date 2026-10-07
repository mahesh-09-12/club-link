import Link from "next/link";
import { Users, Calendar, UserPlus, Clock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CoordinatorDashboard() {
  const stats = [
    { name: "Total Members", value: "89", icon: Users, desc: "+4 this week" },
    { name: "Scheduled Events", value: "3", icon: Calendar, desc: "Next on Aug 18" },
    { name: "Pending Approvals", value: "5", icon: UserPlus, desc: "Requires attention" },
  ];

  const pendingMembers = [
    { id: "1", name: "Sarah Connor", email: "s.connor@university.edu", major: "Electrical Eng" },
    { id: "2", name: "David Miller", email: "d.miller@university.edu", major: "Computer Science" },
  ];

  const upcomingEvents = [
    { id: "workshop", title: "Introduction to Arduino", date: "Aug 18, 2026", RSVPCount: 34 },
    { id: "expo", title: "Robo-Expo 2026", date: "Sep 05, 2026", RSVPCount: 128 },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Coordinator Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Managing: <span className="font-semibold text-foreground">Robotics & Automation Club</span>
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
        {/* Pending Approvals */}
        <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold tracking-tight">Pending Membership Requests</h2>
            <Link href="/coordinator/members" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-primary font-medium")}>
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {pendingMembers.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-4 border border-border rounded-md bg-muted/10"
              >
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{req.name}</h4>
                  <p className="text-xs text-muted-foreground">{req.major} • {req.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="xs" variant="outline" className="text-[10px] h-7 px-2">
                    Decline
                  </Button>
                  <Button size="xs" className="text-[10px] h-7 px-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
            {pendingMembers.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6">No pending membership requests.</p>
            )}
          </div>
        </div>

        {/* Club Events Overview */}
        <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold tracking-tight">Upcoming Scheduled Events</h2>
            <Link href="/coordinator/events" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-primary font-medium")}>
              Manage Events
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between border border-border p-4 rounded-md"
              >
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Clock className="size-3" /> Scheduled on {event.date}
                  </p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {event.RSVPCount} RSVPs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
