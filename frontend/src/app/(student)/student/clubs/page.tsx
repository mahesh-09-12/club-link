"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Search, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function StudentClubsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const clubs = [
    {
      id: "acm",
      name: "ACM Student Chapter",
      category: "Technical",
      description: "Advancing computing as a science & profession. Join for hackathons, workshops, and coding sessions.",
      membersCount: 142,
      joined: true,
    },
    {
      id: "robotics",
      name: "Robotics & Automation Club",
      category: "Engineering",
      description: "Build bots, learn microcontrollers, and compete in national robotics competitions.",
      membersCount: 89,
      joined: true,
    },
    {
      id: "literary",
      name: "Creative Writing Society",
      category: "Arts",
      description: "A community for poets, novelists, and storytellers to share feedback and express creativity.",
      membersCount: 56,
      joined: false,
    },
    {
      id: "chess",
      name: "Chess Club",
      category: "Sports & Gaming",
      description: "Play, practice, compete. Open to all skill levels from absolute beginners to Grandmasters.",
      membersCount: 75,
      joined: true,
    },
    {
      id: "fine-arts",
      name: "Fine Arts Club",
      category: "Arts",
      description: "Unleash your creativity with painting, sketching, and sculpture workshops.",
      membersCount: 43,
      joined: false,
    },
    {
      id: "gdg",
      name: "Google Developer Group on Campus",
      category: "Technical",
      description: "Learn Google Technologies, Cloud Computing, Android, and Flutter with developers.",
      membersCount: 110,
      joined: false,
    },
  ];

  const categories = ["All", "Technical", "Engineering", "Arts", "Sports & Gaming"];

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase()) || 
                          club.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || club.category === category;
    return matchesSearch && matchesCategory;
  });

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
            className="px-3 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="border border-border bg-card hover:bg-muted/10 transition-colors p-6 rounded-lg shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                  {club.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="size-3.5" /> {club.membersCount}
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-4 text-foreground">{club.name}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {club.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
              <Link href={`/student/clubs?id=${club.id}`} className={cn(buttonVariants({ variant: "link", size: "sm" }), "p-0 h-auto font-medium text-xs")}>
                View Details
              </Link>
              {club.joined ? (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Joined</span>
              ) : (
                <Button size="sm" className="font-medium text-xs">
                  Request to Join
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredClubs.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-lg bg-card">
          <Compass className="size-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No clubs found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
