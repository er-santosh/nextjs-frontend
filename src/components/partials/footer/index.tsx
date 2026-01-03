import Logo from "@/components/shared/logo";

import { APP_ROUTES } from "@/constants/app-routes";

import FooterColumn from "./footer-column";

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: APP_ROUTES.SITE.PRICING },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: APP_ROUTES.SITE.CONTACT }],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-card/50 border-t px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo height={40} width={40} />
          </div>

          {footerColumns.map(section => (
            <FooterColumn
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
        <div className="border-border text-muted-foreground flex flex-col items-center justify-center gap-4 border-t pt-8 text-sm sm:flex-row">
          <p>© {currentYear} Starter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
