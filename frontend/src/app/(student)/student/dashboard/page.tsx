"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Users, FileText, Compass, Plus, ArrowUpRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { clubService } from "@/services/clubService";
import { joinRequestService } from "@/services/joinRequestService";
import { Club, JoinRequest } from "@/types";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [myRequests, setMyRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      clubService.getClubs().catch(() => []),
      joinRequestService.getMyJoinRequests().catch(() => []),
    ]).then(([clubsData, requestsData]) => {
      if (isMounted) {
        setClubs(clubsData);
        setMyRequests(requestsData);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const approvedCount = myRequests.filter((r) => r.status === "approved").length;
  const pendingCount = myRequests.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back{user?.full_name ? `, ${user.full_name}` : ""}! Here&apos;s your campus club overview.
          </p>
        </div>
        <Link href="/student/clubs" className={cn(buttonVariants({ size: "sm" }), "gap-1.5 inline-flex items-center")}>
          <Plus className="size-4" /> Discover Campus Clubs
        </Link>
      </div>

      {/* Real Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="border border-border bg-card p-6 rounded-lg shadow-xs flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <Compass className="size-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Campus Clubs</span>
            <div className="text-2xl font-bold mt-0.5">{loading ? "..." : clubs.length}</div>
            <span className="text-xs text-muted-foreground">Registered on platform</span>
          </div>
        </div>

        <div className="border border-border bg-card p-6 rounded-lg shadow-xs flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <FileText className="size-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Join Requests</span>
            <div className="text-2xl font-bold mt-0.5">{loading ? "..." : myRequests.length}</div>
            <span className="text-xs text-muted-foreground">{pendingCount} pending approval</span>
          </div>
        </div>

        <div className="border border-border bg-card p-6 rounded-lg shadow-xs flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <Users className="size-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Approved Requests</span>
            <div className="text-2xl font-bold mt-0.5">{loading ? "..." : approvedCount}</div>
            <span className="text-xs text-muted-foreground">Successful join requests</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Join Requests Overview */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold tracking-tight">Recent Join Requests</h2>
              <Link href="/student/my-clubs" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-xs text-primary font-medium")}>
                View all requests
              </Link>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground text-sm">
                <Loader2 className="size-5 animate-spin mr-2" /> Loading requests...
              </div>
            ) : myRequests.length > 0 ? (
              <div className="space-y-3">
                {myRequests.slice(0, 3).map((req) => {
                  const club = clubs.find((c) => c.id === req.club_id);
                  return (
                    <div
                      key={req.id}
                      className="border border-border bg-muted/10 p-4 rounded-md flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">
                          {club?.name || `Club #${req.club_id}`}
                        </h4>
                        <span className="text-xs text-muted-foreground">
                          Submitted on {new Date(req.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-muted border border-border">
                        {req.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-border rounded-md">
                <p className="text-sm text-muted-foreground">You haven&apos;t submitted any club join requests yet.</p>
                <Link href="/student/clubs" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-3")}>
                  Browse Clubs
                </Link>
              </div>
            )}
          </div>

          {/* Events Placeholder */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
            <h2 className="text-lg font-bold tracking-tight mb-2">Upcoming Campus Events</h2>
            <p className="text-sm text-muted-foreground border border-dashed border-border p-6 rounded-md text-center">
              No events scheduled yet. Event management will be enabled in a future release.
            </p>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          {/* Recommendations Placeholder */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
            <h2 className="text-lg font-bold tracking-tight mb-2">Recommendations</h2>
            <p className="text-xs text-muted-foreground mb-4">
              Discover clubs tailored to student interests.
            </p>
            <div className="border border-dashed border-border p-4 rounded-md text-center">
              <p className="text-xs text-muted-foreground">Recommendations will appear as new clubs join the platform.</p>
            </div>
          </div>

          {/* Announcements Placeholder */}
          <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
            <h2 className="text-lg font-bold tracking-tight mb-2">Campus Announcements</h2>
            <p className="text-xs text-muted-foreground border border-dashed border-border p-4 rounded-md text-center">
              No announcements published yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
