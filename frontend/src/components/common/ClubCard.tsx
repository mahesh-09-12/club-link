import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";
import { Club } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClubCardProps {
  club: Club;
  detailsHref?: string;
  showJoinButton?: boolean;
}

export function ClubCard({
  club,
  detailsHref,
  showJoinButton = false,
}: ClubCardProps) {
  const href = detailsHref || `/clubs/${club.id}`;

  return (
    <div className="border border-border bg-card hover:bg-muted/10 transition-colors p-6 rounded-lg shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
            {club.category}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium capitalize",
              club.status === "active"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            )}
          >
            {club.status === "active" ? (
              <CheckCircle className="size-3" />
            ) : (
              <Clock className="size-3" />
            )}
            {club.status}
          </span>
        </div>
        <h3 className="text-lg font-semibold mt-4 text-foreground">{club.name}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {club.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "link", size: "sm" }),
            "p-0 h-auto font-medium text-xs text-primary"
          )}
        >
          View Details &rarr;
        </Link>
        {showJoinButton && (
          <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            Open Membership
          </span>
        )}
      </div>
    </div>
  );
}
