import type React from "react";

import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
