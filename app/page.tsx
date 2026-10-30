import Hero from "@/components/Hero";
import type { ReactNode } from "react";

const projects = [
  {
    name: "Diorama",
    href: "https://github.com/aaronkoolkoder/wallpaperapp",
    blurb: "live wallpapers for macOS, rendered natively in Metal",
  },
  { name: "Table", blurb: "poker and blackjack with friends, with 3D avatars" },
  { name: "Signal", blurb: "a daily AI brief built from the sources you actually read" },
  {
    name: "Extrovert AI",
    href: "https://github.com/aaronkoolkoder/Extrovert-AI",
    blurb: "practice hard conversations with lifelike AI personas",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/aaronkoolkoder" },
  // TODO: Email, LinkedIn, Resume
];

function A({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <span>{children}</span>;
  return (
    <a
      href={href}
      className="underline decoration-[var(--line)] underline-offset-2 transition-colors hover:decoration-foreground"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <main className="relative mx-auto max-w-[36rem] px-4 pb-24 text-base leading-6">
        <h1 className="mb-6 text-xl font-medium tracking-tight">Aaron Merchant</h1>

        <div className="space-y-6">
          <p>I like building software that feels good to use.</p>

          <p>
            I&apos;m a student at the University of Waterloo. Right now I&apos;m making{" "}
            <A href={projects[0].href}>live wallpapers for the Mac</A>
            {" "}and a poker app for my friends.
          </p>

          <p>
            I care most about the last ten percent of a project: the timing of an animation, an
            empty state, the small details nobody asks for.
          </p>

          <div>
            <p>A few projects I&apos;ve loved working on:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 marker:text-muted">
              {projects.map((p) => (
                <li key={p.name}>
                  <A href={p.href}>{p.name}</A> <span className="text-muted">-</span> {p.blurb}
                </li>
              ))}
            </ul>
          </div>

          <nav className="flex gap-5 pt-2">
            {links.map((l) => (
              <A key={l.label} href={l.href}>
                {l.label}
              </A>
            ))}
          </nav>
        </div>
      </main>
    </>
  );
}
