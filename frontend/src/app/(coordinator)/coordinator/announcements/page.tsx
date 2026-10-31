"use client";

import { useState } from "react";
import { Megaphone, Plus, Clock, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function CoordinatorAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    const newAnn: AnnouncementItem = {
      id: Date.now().toString(),
      title,
      content,
      date: "Just now",
    };
    setAnnouncements([newAnn, ...announcements]);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground mt-1">
          Broadcast news, alerts, or meetings directly to all club members.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Post Form */}
        <div className="border border-border bg-card p-6 rounded-lg shadow-xs h-fit">
          <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-1.5">
            <Plus className="size-4.5 text-primary" /> Post Announcement
          </h3>
          <form onSubmit={handlePost} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Announcement Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Lab Sync Postponed"
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-xs outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={4}
                placeholder="Write announcement details..."
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-xs outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <Button type="submit" size="sm" className="w-full mt-2 font-medium">
              Publish Broadcast
            </Button>
          </form>
        </div>

        {/* Announcements list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold tracking-tight">Active Broadcasts</h3>
          
          <div className="space-y-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="border border-border bg-card p-6 rounded-lg shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-bold text-foreground">{ann.title}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(ann.id)}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive size-8"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{ann.content}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" /> Published {ann.date}
                </div>
              </div>
            ))}

            {announcements.length === 0 && (
              <div className="text-center py-12 border border-dashed border-border rounded-lg bg-card">
                <Megaphone className="size-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No announcements broadcasted yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
