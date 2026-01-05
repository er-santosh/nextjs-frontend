import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 font-bold">{title}</h3>
      <ul className="text-muted-foreground space-y-3 text-sm">
        {links.map(link => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-foreground transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
