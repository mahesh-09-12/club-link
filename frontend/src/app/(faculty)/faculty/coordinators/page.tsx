import { UserCheck } from "lucide-react";

export default function FacultyCoordinatorsPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Club Coordinators</h1>
        <p className="text-muted-foreground mt-1">
          Review coordinator nominations and verify assignments.
        </p>
      </div>

      {/* Clean Placeholder State */}
      <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card max-w-2xl mx-auto">
        <UserCheck className="size-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Coordinator Management</h3>
        <p className="text-sm text-muted-foreground mt-1 px-4">
          Faculty advisor assignments and coordinator nomination reviews will be enabled in a future release.
        </p>
      </div>
    </div>
  );
}
