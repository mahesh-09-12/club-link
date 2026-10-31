import { BarChart3 } from "lucide-react";

export default function FacultyReportsPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">
          Campus-wide engagement metrics, attendance audits, and club performance reports.
        </p>
      </div>

      {/* Clean Placeholder State */}
      <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card max-w-2xl mx-auto">
        <BarChart3 className="size-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Analytics Engine</h3>
        <p className="text-sm text-muted-foreground mt-1 px-4">
          Campus reporting and exportable audit logs will be enabled as event and attendance data accumulates.
        </p>
      </div>
    </div>
  );
}
