import { BarChart3, TrendingUp, Users, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FacultyReportsPage() {
  const analyticsSummary = [
    { name: "Total Registrations", value: "3,482", change: "+12.4% vs last semester" },
    { name: "Event Attendance Rate", value: "78%", change: "+3.2% vs last semester" },
    { name: "Most Active Club", value: "ACM Student Chapter", change: "142 members" },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">
          Campus-wide engagement charts, RSVP trends, and club performance metrics.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        {analyticsSummary.map((item) => (
          <div key={item.name} className="border border-border bg-card p-6 rounded-lg shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.name}</span>
              <div className="text-2xl font-bold mt-2 text-foreground">{item.value}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-primary font-medium">
              <TrendingUp className="size-3.5" /> {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* Reports Listing */}
      <div className="border border-border bg-card rounded-lg p-6 shadow-xs">
        <h3 className="text-lg font-bold tracking-tight mb-4">Exportable Audits</h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-md hover:bg-muted/10 transition-colors gap-4">
            <div>
              <h4 className="font-semibold text-sm text-foreground">Semester Club Attendance Roster</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Aggregated RSVP counts, attendee verification, and check-in rates.</p>
            </div>
            <Button size="sm" variant="outline" className="gap-1 text-xs">
              Export CSV <ArrowRight className="size-3.5" />
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-md hover:bg-muted/10 transition-colors gap-4">
            <div>
              <h4 className="font-semibold text-sm text-foreground">Faculty Advisors Alignment Report</h4>
              <p className="text-xs text-muted-foreground mt-0.5">List of active faculty members supervising recognized student organizations.</p>
            </div>
            <Button size="sm" variant="outline" className="gap-1 text-xs">
              Export CSV <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
