import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Users, Calendar, Sparkles, ArrowUpRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentDashboard() {
  const stats = [
    { name: "My Clubs", value: "3", icon: Users, desc: "Active memberships" },
    { name: "Registered Events", value: "2", icon: Calendar, desc: "Upcoming this month" },
    { name: "ML Recommendations", value: "5", icon: Sparkles, desc: "Personalized matches" },
  ];

  const currentClubs = [
    { id: "acm", name: "ACM Student Chapter", role: "Member", logo: "💻" },
    { id: "robotics", name: "Robotics Club", role: "Treasurer", logo: "🤖" },
    { id: "chess", name: "Chess Club", role: "Member", logo: "♟️" },
  ];

  const upcomingRegisteredEvents = [
    {
      id: "hackathon",
      title: "Campus Hackathon 2026",
      date: "Aug 15, 2026",
      time: "9:00 AM",
      club: "ACM Student Chapter",
    },
    {
      id: "workshop",
      title: "Introduction to Arduino",
      date: "Aug 18, 2026",
      time: "2:00 PM",
      club: "Robotics Club",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening in your campus community.</p>
        </div>
        <Link href="/student/clubs" className={cn(buttonVariants({ size: "sm" }), "gap-1.5 inline-flex items-center")}>
          <Plus className="size-4" /> Discover New Clubs
        </Link>
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

      {/* Main Dashboard Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Clubs */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold tracking-tight">My Active Clubs</h2>
              <Link href="/student/my-clubs" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-primary font-medium")}>
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {currentClubs.map((club) => (
                <div
                  key={club.id}
                  className="border border-border bg-muted/20 hover:bg-muted/40 transition-colors p-4 rounded-md flex flex-col justify-between items-start"
                >
                  <span className="text-2xl mb-2">{club.logo}</span>
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">{club.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{club.role}</p>
                  </div>
                  <Link href={`/student/clubs?id=${club.id}`} className={cn(buttonVariants({ variant: "link", size: "sm" }), "p-0 h-auto text-xs mt-3 text-primary font-semibold inline-flex items-center gap-0.5")}>
                    Go to Page <ArrowUpRight className="size-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Events */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold tracking-tight">Registered Events</h2>
              <Link href="/student/events" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-primary font-medium")}>
                Explore Events
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingRegisteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border border-border p-4 rounded-md gap-4"
                >
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-primary">{event.club}</span>
                    <h3 className="font-semibold text-sm text-foreground mt-0.5">{event.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <Link href={`/student/events?id=${event.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          {/* Quick ML Recommendations */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-primary mb-4">
                <Sparkles className="size-5 fill-primary/10" />
                <h2 className="text-lg font-bold tracking-tight text-foreground">Recommended for You</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Based on your interests in software dev, algorithms, and microchips:
              </p>
              <div className="space-y-3">
                <div className="border border-border bg-muted/20 p-3 rounded-md">
                  <h4 className="font-semibold text-xs text-foreground">Cybersecurity Alliance</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Learn pen testing, CTF tricks, and Linux admin.</p>
                </div>
                <div className="border border-border bg-muted/20 p-3 rounded-md">
                  <h4 className="font-semibold text-xs text-foreground">AI Research Circle</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Discuss LLMs, agentic systems, and neural nets.</p>
                </div>
              </div>
            </div>
            <Link href="/student/recommendations" className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full mt-6 gap-1 inline-flex items-center justify-center")}>
              See all recommendations <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          {/* Announcements */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
            <h2 className="text-lg font-bold tracking-tight mb-4">Latest Announcements</h2>
            <div className="space-y-3">
              <div className="border-l-2 border-primary pl-3 py-1">
                <h4 className="font-semibold text-xs text-foreground">Annual Membership Fee Due</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">Robotics Club • 1 day ago</p>
              </div>
              <div className="border-l-2 border-primary pl-3 py-1">
                <h4 className="font-semibold text-xs text-foreground">Next ACM Meeting Postponed</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">ACM Club • 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
