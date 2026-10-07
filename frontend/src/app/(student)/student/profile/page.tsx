"use client";

import { useState } from "react";
import { User, Mail, Shield, BookOpen, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentProfilePage() {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.j@university.edu");
  const [major, setMajor] = useState("Computer Science");
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
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1 font-sans">
          Manage your personal details, academic field, and preferences.
        </p>
      </div>

      {/* Profile Form */}
      <div className="border border-border bg-card p-6 rounded-lg shadow-xs">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-border bg-background rounded-md text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-9 pr-4 py-2 border border-border bg-muted/40 rounded-md text-sm text-muted-foreground outline-none cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                University email is locked and managed by campus single sign-on.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Academic Major
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-border bg-background rounded-md text-sm outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Account Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value="Student"
                  disabled
                  className="w-full pl-9 pr-4 py-2 border border-border bg-muted/40 rounded-md text-sm text-muted-foreground outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            {saved ? (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle className="size-4" /> Profile updated successfully!
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
