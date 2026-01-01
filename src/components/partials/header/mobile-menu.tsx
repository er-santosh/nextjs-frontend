"use client";

import { useState } from "react";

import { Menu, Sparkles, Code2, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
}

const iconMap: Record<string, typeof Sparkles> = {
  "#features": Sparkles,
  "#tech": Code2,
  "#docs": BookOpen,
};

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const element = document.getElementById(href.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-2">
          {navItems.map(item => {
            const Icon = iconMap[item.href] ?? Sparkles;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-muted-foreground hover:bg-accent hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="text-base font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
