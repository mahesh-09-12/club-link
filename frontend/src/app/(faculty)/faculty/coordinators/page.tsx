"use client";

import { useState } from "react";
import { UserCheck, ShieldAlert, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FacultyCoordinatorsPage() {
  const [coordinators, setCoordinators] = useState([
    { id: "1", name: "David Miller", email: "d.miller@university.edu", club: "Robotics Club", role: "Student Coordinator", status: "Approved" },
    { id: "2", name: "Emily Watson", email: "e.watson@university.edu", club: "Creative Writing Society", role: "Student Coordinator", status: "Approved" },
    { id: "3", name: "Jane Carter", email: "j.carter@university.edu", club: "FinTech Club", role: "Proposed Coordinator", status: "Pending Approval" },
  ]);

  const handleApprove = (id: string) => {
    setCoordinators(
      coordinators.map((c) =>
        c.id === id ? { ...c, role: "Student Coordinator", status: "Approved" } : c
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Club Coordinators</h1>
        <p className="text-muted-foreground mt-1">
          Review coordinator nominations, approve credentials, and verify assignments.
        </p>
      </div>

      {/* Roster list */}
      <div className="border border-border bg-card rounded-lg shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/20 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-4">Name</th>
              <th className="p-4">Club</th>
              <th className="p-4">Role / Nomination</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coordinators.map((coord) => (
              <tr key={coord.id} className="hover:bg-muted/10 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-foreground">{coord.name}</div>
                  <div className="text-xs text-muted-foreground">{coord.email}</div>
                </td>
                <td className="p-4 text-muted-foreground">{coord.club}</td>
                <td className="p-4 text-muted-foreground">{coord.role}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                      coord.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {coord.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {coord.status === "Pending Approval" ? (
                    <Button size="xs" onClick={() => handleApprove(coord.id)} className="h-7 px-2">
                      Approve Nomination
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground font-medium">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
