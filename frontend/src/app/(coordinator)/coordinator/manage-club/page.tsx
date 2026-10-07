"use client";

import { useState } from "react";
import { Settings, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManageClubPage() {
  const [clubName, setClubName] = useState("Robotics & Automation Club");
  const [tagline, setTagline] = useState("Building the future, one actuator at a time.");
  const [description, setDescription] = useState(
    "We build custom microcontrollers, participate in national competitions, and host tutorials."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Club Profile</h1>
        <p className="text-muted-foreground mt-1 font-sans">
          Update your club information, description, and settings displayed to public and students.
        </p>
      </div>

      {/* Edit Form */}
      <div className="border border-border bg-card p-6 rounded-lg shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Club Name
              </label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Short Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Detailed Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-sm outline-none focus:border-primary transition-colors resize-y"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            {saved ? (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="size-4" /> Club details updated!
              </span>
            ) : (
              <span />
            )}
            <Button type="submit" className="gap-1.5 font-medium">
              <Save className="size-4" /> Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
