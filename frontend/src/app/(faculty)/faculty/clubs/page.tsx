"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Loader2, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { clubService } from "@/services/clubService";
import { Club } from "@/types";

export default function FacultyClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    clubService
      .getClubs()
      .then((data) => {
        if (isMounted) setClubs(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campus Clubs Directory</h1>
        <p className="text-muted-foreground mt-1">
          Directory of active and registered campus clubs.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search clubs by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
          <Loader2 className="size-6 animate-spin mr-2 text-primary" /> Loading campus clubs...
        </div>
      )}

      {/* Table grid */}
      {!loading && (
        <div className="border border-border bg-card rounded-lg shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Club ID</th>
                <th className="p-4">Club Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Faculty Advisor ID</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClubs.map((club) => (
                <tr key={club.id} className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-mono text-xs text-muted-foreground">#{club.id}</td>
                  <td className="p-4 font-semibold text-foreground">{club.name}</td>
                  <td className="p-4 text-muted-foreground">{club.category}</td>
                  <td className="p-4 text-muted-foreground">#{club.faculty_coordinator_id}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${
                        club.status === "active"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {club.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/clubs/${club.id}`} className={buttonVariants({ variant: "outline", size: "xs" })}>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredClubs.length === 0 && (
            <div className="text-center py-16">
              <Compass className="size-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No clubs found in the campus directory.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
