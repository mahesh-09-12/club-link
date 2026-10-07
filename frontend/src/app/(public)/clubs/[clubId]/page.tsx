"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, CheckCircle, Clock, Shield, Loader2, AlertCircle } from "lucide-react";
import { clubService } from "@/services/clubService";
import { Club } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clubIdParam = params?.clubId as string;

  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!clubIdParam) return;

    const fetchClubDetails = async () => {
      setLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const data = await clubService.getClubById(clubIdParam);
        setClub(data);
      } catch (err: unknown) {
        console.error("Failed to fetch club details:", err);
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          (err as { response?: { status?: number } }).response?.status === 404
        ) {
          setNotFound(true);
        } else {
          setError("Failed to load club details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [clubIdParam]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="size-8 animate-spin mb-3 text-primary" />
        <p className="text-sm">Loading club details...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 text-center max-w-lg">
        <div className="border border-dashed border-border p-8 rounded-lg bg-card">
          <AlertCircle className="size-10 text-amber-500 mx-auto mb-3" />
          <h2 className="text-2xl font-bold tracking-tight">Club Not Found</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            We couldn&apos;t find any club matching ID &quot;{clubIdParam}&quot;. It may have been removed or does not exist.
          </p>
          <Button onClick={() => router.push("/clubs")} className="mt-6 gap-2">
            <ArrowLeft className="size-4" /> Back to Clubs
          </Button>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 text-center max-w-lg">
        <div className="border border-destructive/20 bg-destructive/5 p-8 rounded-lg">
          <AlertCircle className="size-10 text-destructive mx-auto mb-3" />
          <h2 className="text-xl font-bold tracking-tight">Unable to Load Details</h2>
          <p className="text-muted-foreground mt-2 text-sm">{error || "An unexpected error occurred."}</p>
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" onClick={() => router.push("/clubs")}>
              Back to Clubs
            </Button>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(club.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="container mx-auto px-4 md:px-6 py-12 max-w-4xl font-sans">
      {/* Back Navigation */}
      <Link
        href="/clubs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="size-4" /> Back to All Clubs
      </Link>

      {/* Main Detail Header Card */}
      <div className="border border-border bg-card p-6 md:p-8 rounded-xl shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                {club.category}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium capitalize",
                  club.status === "active"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                )}
              >
                {club.status === "active" ? (
                  <CheckCircle className="size-3.5" />
                ) : (
                  <Clock className="size-3.5" />
                )}
                {club.status} Status
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mt-3">
              {club.name}
            </h1>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">About the Club</h2>
          <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
            {club.description}
          </p>
        </div>

        {/* Additional Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/50">
            <Shield className="size-4 text-primary" />
            <span>Faculty Advisor ID: <strong className="text-foreground">{club.faculty_coordinator_id}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/20 p-3 rounded-lg border border-border/50">
            <Calendar className="size-4 text-primary" />
            <span>Established: <strong className="text-foreground">{formattedDate}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
