"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowRight, Clock, CheckCircle, XCircle, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { joinRequestService } from "@/services/joinRequestService";
import { clubService } from "@/services/clubService";
import { JoinRequest, Club } from "@/types";

export default function MyClubsPage() {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [clubsMap, setClubsMap] = useState<Record<number, Club>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch user's join requests & available clubs in parallel
      const [reqData, clubsData] = await Promise.all([
        joinRequestService.getMyJoinRequests(),
        clubService.getClubs().catch(() => []), // fallback to empty array if public clubs fetch fails
      ]);

      const map: Record<number, Club> = {};
      clubsData.forEach((c) => {
        map[c.id] = c;
      });

      setClubsMap(map);
      setRequests(reqData);
    } catch (err) {
      console.error("Failed to load student join requests:", err);
      setError("Unable to load your club join requests. Please check backend connectivity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Club Requests</h1>
        <p className="text-muted-foreground mt-1">
          Track the status of your club join requests and manage your applications.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-8 animate-spin mb-3 text-primary" />
          <p className="text-sm">Loading your club requests...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-destructive/20 bg-destructive/5 rounded-lg text-center">
          <AlertCircle className="size-10 text-destructive mb-3" />
          <h3 className="text-lg font-semibold text-foreground">Failed to Load Requests</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">{error}</p>
          <Button onClick={fetchData} variant="outline" className="mt-4 gap-2">
            <RefreshCw className="size-4" /> Try Again
          </Button>
        </div>
      )}

      {/* Requests List */}
      {!loading && !error && requests.length > 0 && (
        <div className="space-y-4">
          {requests.map((req) => {
            const club = clubsMap[req.club_id];
            const clubName = club?.name || `Club #${req.club_id}`;
            const category = club?.category || "General";
            const description = club?.description || "Student organization";
            const submittedDate = new Date(req.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <div
                key={req.id}
                className="border border-border bg-card p-6 rounded-lg shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Submitted on {submittedDate}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{clubName}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-border gap-4 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Status
                    </span>
                    {req.status === "pending" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Clock className="size-3.5" /> Pending Approval
                      </span>
                    )}
                    {req.status === "approved" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="size-3.5" /> Request Approved
                      </span>
                    )}
                    {req.status === "rejected" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20">
                        <XCircle className="size-3.5" /> Request Rejected
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/clubs/${req.club_id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "gap-1.5 inline-flex items-center"
                    )}
                  >
                    View Club <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && requests.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card">
          <Bookmark className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground">No Club Requests Yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            You haven&apos;t submitted any join requests for campus clubs yet. Explore available clubs to get started!
          </p>
          <Link href="/student/clubs" className={buttonVariants({ variant: "default" })}>
            Discover Clubs
          </Link>
        </div>
      )}
    </div>
  );
}
