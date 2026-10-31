import { Sparkles, Brain } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
          <Sparkles className="size-6 fill-primary/10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            Interest-based club matching engine aligning student interests with campus organizations.
          </p>
        </div>
      </div>

      {/* Clean Placeholder State */}
      <div className="text-center py-16 border border-dashed border-border rounded-lg bg-card max-w-2xl mx-auto">
        <Brain className="size-10 text-muted-foreground mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Recommendations Engine</h3>
        <p className="text-sm text-muted-foreground mt-1 px-4">
          Personalized interest matching will be calculated once interest profiles are configured in a future release.
        </p>
      </div>
    </div>
  );
}
