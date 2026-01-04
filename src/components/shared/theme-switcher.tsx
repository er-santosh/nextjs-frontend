"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/classname";

const themes = [
  {
    key: "system",
    icon: Monitor,
    label: "System theme",
  },
  {
    key: "light",
    icon: Sun,
    label: "Light theme",
  },
  {
    key: "dark",
    icon: Moon,
    label: "Dark theme",
  },
] as const;

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "bg-background ring-border relative isolate flex h-8 space-x-0.5 rounded-full p-1 ring-1",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            key={key}
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            onClick={() => setTheme(key)}
            type="button"
            suppressHydrationWarning
          >
            <motion.span
              className="bg-primary absolute inset-0 rounded-full"
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8,
              }}
              transition={{ type: "spring", duration: 0.3 }}
              suppressHydrationWarning
            />
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4 transition-colors",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )}
              suppressHydrationWarning
            />
          </button>
        );
      })}
    </div>
  );
};
export function SoloThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      suppressHydrationWarning
    >
      <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
