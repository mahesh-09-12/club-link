"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Brain, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecommendationsPage() {
  const [interests, setInterests] = useState([
    "Coding", "Open Source", "Robotics", "Hardware", "Arduino"
  ]);
  const [newInterest, setNewInterest] = useState("");

  const recommendedClubs = [
    {
      id: "cyber",
      name: "Cybersecurity Alliance",
      matchPercentage: 94,
      reason: "Matches your interests in Coding, Network protocols, and Linux administration.",
      description: "Learn pen testing, CTF tricks, secure programming, and participate in global cybersecurity competitions.",
    },
    {
      id: "ai",
      name: "AI Research Circle",
      matchPercentage: 88,
      reason: "Matches your interests in Coding, Algorithms, and Mathematics.",
      description: "Discuss modern LLMs, neural networks, computer vision, and work on collaborative ML projects.",
    },
    {
      id: "gdg",
      name: "Google Developer Group",
      matchPercentage: 82,
      reason: "Matches your interest in Open Source and Web Technologies.",
      description: "Google technologies developer community focused on Android, Cloud, Angular, and tech talks.",
    },
  ];

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
          <Sparkles className="size-6 fill-primary/10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ML Club Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            Our Machine Learning matching engine aligns your interests with campus clubs.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column: Manage interests */}
        <div className="border border-border bg-card p-6 rounded-lg shadow-xs h-fit">
          <h3 className="text-lg font-bold tracking-tight flex items-center gap-1.5 mb-2">
            <Brain className="size-4.5 text-primary" /> Your Interest Profile
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            We analyze these tags to compute matching scores for every campus club.
          </p>

          <form onSubmit={handleAddInterest} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="e.g. Flutter, Design..."
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs border border-border bg-background rounded-md outline-none focus:border-primary transition-colors"
            />
            <Button type="submit" size="sm" className="text-xs">
              Add
            </Button>
          </form>

          <div className="flex flex-wrap gap-1.5">
            {interests.map((interest, idx) => (
              <span
                key={interest}
                onClick={() => handleRemoveInterest(idx)}
                className="inline-flex items-center gap-1 cursor-pointer rounded-full bg-secondary text-secondary-foreground hover:bg-destructive/10 hover:text-destructive px-2 py-0.5 text-xs font-medium border border-border"
              >
                {interest} <span className="text-[10px] opacity-60">×</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right columns: Recommendations list */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold tracking-tight">Personalized Matches</h3>
          
          <div className="space-y-4">
            {recommendedClubs.map((club) => (
              <div
                key={club.id}
                className="border border-border bg-card p-6 rounded-lg shadow-xs space-y-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h4 className="text-lg font-bold text-foreground">{club.name}</h4>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold border border-emerald-200">
                    <Zap className="size-3.5 fill-emerald-100" /> {club.matchPercentage}% Match
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground">{club.description}</p>
                
                <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <Sparkles className="size-3.5 shrink-0" /> Why this match: {club.reason}
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" size="sm">
                    View Page
                  </Button>
                  <Button size="sm" className="gap-1">
                    Apply to Join <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
