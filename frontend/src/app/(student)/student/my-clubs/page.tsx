import Link from "next/link";
import { Bookmark, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MyClubsPage() {
  const joinedClubs = [
    {
      id: "acm",
      name: "ACM Student Chapter",
      role: "Member",
      category: "Technical",
      description: "Advancing computing as a science & profession. Join for hackathons, workshops, and coding sessions.",
      joinedDate: "Sep 2025",
    },
    {
      id: "robotics",
      name: "Robotics & Automation Club",
      role: "Treasurer",
      category: "Engineering",
      description: "Build bots, learn microcontrollers, and compete in national robotics competitions.",
      joinedDate: "Oct 2025",
    },
    {
      id: "chess",
      name: "Chess Club",
      role: "Member",
      category: "Sports & Gaming",
      description: "Play, practice, compete. Open to all skill levels from absolute beginners to Grandmasters.",
      joinedDate: "Jan 2026",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Clubs</h1>
        <p className="text-muted-foreground mt-1">
          Manage your memberships, roles, and club specific pages.
        </p>
      </div>

      {/* Clubs List */}
      <div className="space-y-6">
        {joinedClubs.map((club) => (
          <div
            key={club.id}
            className="border border-border bg-card p-6 rounded-lg shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {club.category}
                </span>
                <span className="text-xs text-muted-foreground">Joined in {club.joinedDate}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">{club.name}</h3>
              <p className="text-sm text-muted-foreground">{club.description}</p>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-border gap-4 shrink-0">
              <div className="text-left md:text-right">
                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</span>
                <span className="text-sm font-semibold text-foreground">{club.role}</span>
              </div>
              <Link href={`/student/clubs?id=${club.id}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5 inline-flex items-center")}>
                Enter Club <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        ))}

        {joinedClubs.length === 0 && (
          <div className="text-center py-12 border border-dashed border-border rounded-lg bg-card">
            <Bookmark className="size-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-4">You have not joined any campus clubs yet.</p>
            <Link href="/student/clubs" className={buttonVariants({ variant: "default" })}>
              Find a Club
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
