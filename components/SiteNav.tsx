import Link from "next/link";

const PAGES = [
  { id: "home", label: "home", href: "/" },
  { id: "projects", label: "projects", href: "/projects" },
] as const;

export default function SiteNav({ active }: { active: (typeof PAGES)[number]["id"] }) {
  return (
    <nav className="flex gap-[1em] text-[0.95em]">
      {PAGES.map((p) =>
        p.id === active ? (
          <span key={p.id} aria-current="page" className="underline decoration-foreground/40 underline-offset-4">
            {p.label}
          </span>
        ) : (
          <Link key={p.id} href={p.href} className="text-muted transition-colors hover:text-foreground">
            {p.label}
          </Link>
        ),
      )}
    </nav>
  );
}
