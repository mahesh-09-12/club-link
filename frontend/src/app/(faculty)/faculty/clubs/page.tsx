"use client";

import { useState } from "react";
import { Compass, Search, Ban, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FacultyClubsPage() {
  const [search, setSearch] = useState("");

  const clubs = [
    { id: "1", name: "ACM Student Chapter", advisor: "Dr. Alan Turing", status: "Active", membersCount: 142 },
    { id: "2", name: "Robotics Club", advisor: "Dr. Grace Hopper", status: "Active", membersCount: 89 },
    { id: "3", name: "Creative Writing Society", advisor: "Prof. Shakespeare", status: "Active", membersCount: 56 },
    { id: "4", name: "FinTech Club", advisor: "Dr. Adam Smith", status: "Pending Approval", membersCount: 0 },
  ];

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.advisor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campus Clubs Directory</h1>
        <p className="text-muted-foreground mt-1 font-sans">
          Review, suspend, or approve all active and proposed clubs across the campus.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search clubs by name or advisor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Table grid */}
      <div className="border border-border bg-card rounded-lg shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-4">Club Name</th>
              <th className="p-4">Faculty Advisor</th>
              <th className="p-4">Status</th>
              <th className="p-4">Members</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredClubs.map((club) => (
              <tr key={club.id} className="hover:bg-muted/10 transition-colors">
                <td className="p-4 font-semibold text-foreground">{club.name}</td>
                <td className="p-4 text-muted-foreground">{club.advisor}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                      club.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {club.status}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{club.membersCount}</td>
                <td className="p-4 text-right">
                  {club.status === "Pending Approval" ? (
                    <Button size="xs" className="h-7 px-2">
                      Approve
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="xs"
                      className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive h-7 px-2"
                    >
                      Suspend
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">No clubs found matching search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
