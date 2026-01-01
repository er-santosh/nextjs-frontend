"use client";

import MobileMenu from "@/components/partials/header/mobile-menu";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

function Navigation() {
  return (
    <nav className="hidden gap-8 md:flex">
      {navItems.map(item => (
        <a
          key={item.href}
          href={item.href}
          className="text-muted-foreground hover:text-foreground text-sm transition"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default function Header() {
  return (
    <header className="border-border bg-background/95 supports-backdrop-filter:bg-background/60 fixed top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileMenu navItems={navItems} />
            <Logo height={40} width={40} />
          </div>
          <Navigation />
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button size="sm" className="hidden sm:inline-flex">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
