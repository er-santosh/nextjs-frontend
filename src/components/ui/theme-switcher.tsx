"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import useMounted from "@/hooks/use-mounted";

import { cn } from "@/lib/utils/classname/classname";

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
];

export type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <div
        className={cn(
          "bg-background ring-border relative isolate flex h-8 space-x-0.5 rounded-full p-1 ring-1",
          className
        )}
      >
        {themes.map(({ key }) => (
          <Skeleton key={key} className="h-6 w-6 rounded-full" />
        ))}
      </div>
    );
  }

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
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => setTheme(key)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="bg-primary absolute inset-0 rounded-full"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export function SoloThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  if (!isMounted) {
    return <Skeleton className="h-9 w-9 rounded-md" />;
  }

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 scale-100 rotate-0 text-white transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-5 w-5 scale-0 rotate-90 text-black transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
