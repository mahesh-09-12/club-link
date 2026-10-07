"use client";

import type { ComponentType, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemedProvider = NextThemesProvider as ComponentType<any>;

type ThemeProviderProps = {
  children: ReactNode;
  [key: string]: unknown;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemedProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={["light", "dark", "system"]}
      {...props}
    >
      {children}
    </ThemedProvider>
  );
}
