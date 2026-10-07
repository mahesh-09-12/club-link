"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Shield, User, Users, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "coordinator" | "faculty">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRoleChange = (newRole: "student" | "coordinator" | "faculty") => {
    setRole(newRole);
    if (newRole === "student") {
      setEmail("");
    } else if (newRole === "coordinator") {
      setEmail("");
    } else {
      setEmail("");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate based on role-prefixed routing to avoid App Router collisions
    if (role === "student") {
      router.push("/student/dashboard");
    } else if (role === "coordinator") {
      router.push("/coordinator/dashboard");
    } else if (role === "faculty") {
      router.push("/faculty/dashboard");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="w-full max-w-md border border-border bg-card p-8 rounded-lg shadow-xs">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose your role to login to your demo dashboard
          </p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            className={`flex flex-col items-center justify-center p-3 border rounded-md transition-all text-center relative cursor-pointer ${role === "student"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:bg-muted/50 text-muted-foreground"
              }`}
          >
            <User className="size-5 mb-1" />
            <span className="text-[10px] font-semibold">Student</span>
            {role === "student" && (
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="size-2" />
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("coordinator")}
            className={`flex flex-col items-center justify-center p-3 border rounded-md transition-all text-center relative cursor-pointer ${role === "coordinator"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:bg-muted/50 text-muted-foreground"
              }`}
          >
            <Users className="size-5 mb-1" />
            <span className="text-[10px] font-semibold">Coordinator</span>
            {role === "coordinator" && (
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="size-2" />
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("faculty")}
            className={`flex flex-col items-center justify-center p-3 border rounded-md transition-all text-center relative cursor-pointer ${role === "faculty"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:bg-muted/50 text-muted-foreground"
              }`}
          >
            <Shield className="size-5 mb-1" />
            <span className="text-[10px] font-semibold">Faculty</span>
            {role === "faculty" && (
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
                <Check className="size-2" />
              </span>
            )}
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              required
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
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 text-sm border border-border bg-background rounded-md outline-none focus:border-primary transition-colors"
            />
          </div>
          <Button type="submit" className="w-full mt-2 font-medium">
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
