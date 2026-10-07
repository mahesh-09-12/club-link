import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2 font-bold text-lg text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors duration-200">
              <span>ClubLink</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
              <Link href="/" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Home</Link>
              <Link href="/clubs" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Clubs</Link>
              <Link href="/events" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Events</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-muted-foreground cursor-pointer transition-colors duration-200 hover:text-foreground">
              Login
            </Link>
            <Link href="/register" className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-md cursor-pointer transition duration-200")}>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/40 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="font-bold text-primary tracking-tight cursor-pointer hover:text-primary/80 transition-colors duration-200">ClubLink</Link>
            <p className="text-xs text-muted-foreground">
              Connecting Students with Campus Clubs. Discover, join, and build connections.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link href="/" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Home</Link>
            <Link href="/clubs" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Clubs</Link>
            <Link href="/events" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Events</Link>
            <Link href="/login" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Login</Link>
            <Link href="/register" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Get Started</Link>
            <Link href="/about" className="cursor-pointer transition-colors duration-200 hover:text-foreground">About</Link>
            <Link href="/contact" className="cursor-pointer transition-colors duration-200 hover:text-foreground">Contact</Link>
          </div>
          <p className="text-xs text-muted-foreground md:order-last">
            &copy; {new Date().getFullYear()} ClubLink. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
