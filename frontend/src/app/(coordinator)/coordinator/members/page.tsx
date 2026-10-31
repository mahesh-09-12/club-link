import { Users } from "lucide-react";

export default function CoordinatorMembersPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Club Members Roster</h1>
        <p className="text-muted-foreground mt-1">
          Manage member rosters and assign officer roles.
        </p>
      </div>

      {/* Empty / Feature Placeholder State */}
      <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card">
        <Users className="size-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Member Roster System</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mt-1">
          Formal member roster management will be enabled in a future release. Review student applications under Join Requests.
        </p>
      </div>
    </div>
  );
}
