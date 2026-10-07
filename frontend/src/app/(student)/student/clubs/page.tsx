"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Compass, Search, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { ClubCard } from "@/components/common/ClubCard";
import { clubService } from "@/services/clubService";
import { Club } from "@/types";
import { Button } from "@/components/ui/button";

export default function StudentClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");

  const fetchClubs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clubService.getClubs();
      setClubs(data);
    } catch (err) {
      console.error("Failed to fetch clubs for student view:", err);
      setError("Unable to load clubs right now. Please check backend connectivity.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    clubService
      .getClubs()
      .then((data) => {
        if (isMounted) {
          setClubs(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Failed to fetch clubs for student view:", err);
          setError("Unable to load clubs right now. Please check backend connectivity.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    clubs.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["All", ...Array.from(set)];
  }, [clubs]);

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(search.toLowerCase()) ||
        club.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All" ||
        club.category.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [clubs, search, category]);

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Discover Clubs</h1>
        <p className="text-muted-foreground mt-1">
          Explore student-run groups and find your community on campus.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clubs by name or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary transition-colors cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="size-8 animate-spin mb-3 text-primary" />
          <p className="text-sm">Fetching clubs from server...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-destructive/20 bg-destructive/5 rounded-lg text-center">
          <AlertCircle className="size-10 text-destructive mb-3" />
          <h3 className="text-lg font-semibold text-foreground">Error loading clubs</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">{error}</p>
          <Button onClick={fetchClubs} variant="outline" className="mt-4 gap-2">
            <RefreshCw className="size-4" /> Try Again
          </Button>
        </div>
      )}

      {/* Clubs Grid */}
      {!loading && !error && filteredClubs.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              detailsHref={`/clubs/${club.id}`}
              showJoinButton={true}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredClubs.length === 0 && (
        <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card">
          <Compass className="size-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground">No clubs available</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {clubs.length === 0
              ? "There are currently no active clubs registered on the platform."
              : "No clubs match your current search and category filters."}
          </p>
        </div>
      )}
    </div>
  );
}
