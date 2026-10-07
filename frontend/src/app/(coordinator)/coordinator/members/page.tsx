import { Users, Mail, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoordinatorMembersPage() {
  const members = [
    { id: "1", name: "David Miller", email: "d.miller@university.edu", major: "Computer Science", role: "Treasurer" },
    { id: "2", name: "John Doe", email: "johndoe@university.edu", major: "Electrical Eng", role: "Member" },
    { id: "3", name: "Sarah Connor", email: "s.connor@university.edu", major: "Mechanical Eng", role: "Member" },
    { id: "4", name: "Emily Watson", email: "e.watson@university.edu", major: "Physics", role: "Secretary" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Club Members</h1>
        <p className="text-muted-foreground mt-1">
          Manage member rosters, assign officer roles, or remove members.
        </p>
      </div>

      {/* Member Roster List */}
      <div className="border border-border bg-card rounded-lg shadow-xs overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Member List ({members.length})</span>
        </div>
        <div className="divide-y divide-border">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors"
            >
              <div>
                <h4 className="font-semibold text-sm text-foreground">{member.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                  <Mail className="size-3" /> {member.email} • {member.major}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded border border-border bg-muted text-muted-foreground">
                  {member.role}
                </span>
                <Button size="xs" variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 h-8 gap-1">
                  <UserMinus className="size-3.5" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
