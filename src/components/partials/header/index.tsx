"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Contact, Gem } from "lucide-react";

import GetStartedButton from "@/components/shared/get-started-button";
import Logo from "@/components/shared/logo";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";

import type { NavItem } from "@/types";

const MobileMenu = dynamic(
  () => import("@/components/partials/header/mobile-menu"),
  { ssr: false }
);

const navItems: NavItem[] = [
  { title: "Pricing", url: "/pricing", icon: Gem },
  { title: "Contact", url: "/contact", icon: Contact },
];

function Navigation() {
  return (
    <nav className="hidden gap-8 md:flex">
      {navItems.map(item => (
        <Link
          key={item.url}
          href={item.url}
          className="text-muted-foreground hover:text-foreground text-sm transition"
        >
          {item.title}
        </Link>
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
            <GetStartedButton className="hidden sm:inline-flex" />
          </div>
        </div>
      </div>
    </header>
  );
}
