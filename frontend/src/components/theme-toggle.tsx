"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const themeModes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const currentTheme = theme === "system" ? "system" : theme;
    const currentIndex = themeModes.findIndex((item) => item.value === currentTheme);
    const nextIndex = (currentIndex + 1) % themeModes.length;
    setTheme(themeModes[nextIndex].value);
  };

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const currentMode = theme === "system" ? "System" : currentTheme === "dark" ? "Dark" : "Light";
  const Icon = themeModes.find((item) => item.value === (theme === "system" ? "system" : currentTheme))?.icon ?? Sun;

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="rounded-md text-muted-foreground transition-colors duration-200"
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        <Sun className="size-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={cycleTheme}
      className="rounded-md text-muted-foreground transition-colors duration-200 hover:text-foreground"
      aria-label={`Switch theme. Current mode: ${currentMode}`}
      title={`Current theme: ${currentMode}`}
    >
      <Icon className="size-4" />
    </Button>
  );
}
