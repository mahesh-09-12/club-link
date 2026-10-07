"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User, Users, Shield, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "coordinator">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful registration, redirect to login
    router.push("/login");
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="w-full max-w-md border border-border bg-card p-8 rounded-lg shadow-xs">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Join ClubLink to discover and manage campus activities
          </p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex flex-col items-center justify-center p-3 border rounded-md transition-all text-center relative cursor-pointer ${role === "student"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:bg-muted/50 text-muted-foreground"
              }`}
          >
            <User className="size-5 mb-1" />
            <span className="text-xs font-semibold">Student</span>
            {role === "student" && (
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="size-2" />
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setRole("coordinator")}
            className={`flex flex-col items-center justify-center p-3 border rounded-md transition-all text-center relative cursor-pointer ${role === "coordinator"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:bg-muted/50 text-muted-foreground"
              }`}
          >
            <Users className="size-5 mb-1" />
            <span className="text-xs font-semibold">Club Coordinator</span>
            {role === "coordinator" && (
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="size-2" />
              </span>
            )}
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full px-3 py-2 text-sm border border-border bg-background rounded-md outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              University Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full px-3 py-2 text-sm border border-border bg-background rounded-md outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-2 text-sm border border-border bg-background rounded-md outline-none focus:border-primary transition-colors"
            />
          </div>
          <Button type="submit" className="w-full mt-2 font-medium rounded-md">
            Register as {role === "student" ? "Student" : "Coordinator"}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
