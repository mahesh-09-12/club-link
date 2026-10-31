"use client";

import { useState } from "react";
import { Calendar, Plus, Clock, MapPin, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  RSVPCount: number;
}

export default function CoordinatorEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    const newEvent: EventItem = {
      id: Date.now().toString(),
      title,
      date,
      time: time || "12:00 PM",
      location: location || "TBD",
      RSVPCount: 0,
    };
    setEvents([...events, newEvent]);
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Events</h1>
          <p className="text-muted-foreground mt-1">
            Create workshops, schedule activities, and view attendee registrations.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Event Form */}
        <div className="border border-border bg-card p-6 rounded-lg shadow-xs h-fit">
          <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-1.5">
            <Plus className="size-4.5 text-primary" /> Schedule Event
          </h3>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g. Robotics Design Sprint"
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-xs outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-xs outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 2:00 PM"
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-xs outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lab 4"
                className="w-full px-3 py-2 border border-border bg-background rounded-md text-xs outline-none focus:border-primary transition-colors"
              />
            </div>
            <Button type="submit" size="sm" className="w-full mt-2 font-medium">
              Schedule Event
            </Button>
          </form>
        </div>

        {/* Events list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold tracking-tight">Scheduled Events</h3>
          
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-border bg-card p-6 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-foreground">{event.title}</h4>
                  <div className="flex gap-4 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3.5" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="size-3.5" /> {event.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-border">
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-muted-foreground uppercase">RSVPs</span>
                    <span className="text-sm font-semibold text-foreground">{event.RSVPCount} Registered</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 size-8"
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-12 border border-dashed border-border rounded-lg bg-card">
                <Calendar className="size-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No events scheduled yet. Create an event using the form.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
