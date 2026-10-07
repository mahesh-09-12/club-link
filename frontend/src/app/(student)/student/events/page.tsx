"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Search, MapPin, Clock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function StudentEventsPage() {
  const [search, setSearch] = useState("");

  const events = [
    {
      id: "hackathon",
      title: "Campus Hackathon 2026",
      club: "ACM Student Chapter",
      date: "Aug 15, 2026",
      time: "9:00 AM",
      location: "Main Auditorium",
      description: "A 24-hour coding sprint to build innovative solutions for campus challenges. Prizes worth $1000!",
      registered: true,
    },
    {
      id: "workshop",
      title: "Introduction to Arduino",
      club: "Robotics Club",
      date: "Aug 18, 2026",
      time: "2:00 PM",
      location: "Lab 4",
      description: "Get hands-on experience programming Arduino microcontrollers and connecting basic sensors.",
      registered: true,
    },
    {
      id: "poetry",
      title: "Poetry Slam & Coffee House",
      club: "Creative Writing Society",
      date: "Aug 22, 2026",
      time: "6:00 PM",
      location: "Student Center Lounge",
      description: "An open mic evening to recite poetry, read short stories, and share refreshments with peers.",
      registered: false,
    },
    {
      id: "chess-tourney",
      title: "Blitz Tournament",
      club: "Chess Club",
      date: "Aug 25, 2026",
      time: "5:00 PM",
      location: "Room 102",
      description: "A fast-paced 5-minute blitz tournament. Swiss system format. Medals for top three.",
      registered: false,
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.club.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Events Discovery</h1>
        <p className="text-muted-foreground mt-1">
          Stay updated with workshops, hackathons, and gatherings organized by clubs.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search events by title or hosting club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-border bg-card rounded-md text-sm outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border border-border bg-card hover:bg-muted/10 transition-colors p-6 rounded-lg shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{event.club}</span>
                {event.registered && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Registered
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold mt-2 text-foreground">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
              
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
              <Link href={`/student/events?id=${event.id}`} className={cn(buttonVariants({ variant: "link", size: "sm" }), "p-0 h-auto font-medium text-xs")}>
                View details
              </Link>
              {!event.registered && (
                <Button size="sm" className="font-medium text-xs">
                  Register
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 border border-dashed border-border rounded-lg bg-card">
          <Calendar className="size-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No events found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
