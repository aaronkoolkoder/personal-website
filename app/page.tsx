import FitToScreen from "@/components/FitToScreen";
import Hero, { Clock } from "@/components/Hero";
import ThemeToggle from "@/components/ThemeToggle";
import type { ReactNode } from "react";

const projects = [
  {
    name: "Diorama",
    href: "https://github.com/aaronkoolkoder/wallpaperapp",
    blurb: "live wallpapers for macOS, rendered in Metal at under 0.5% CPU",
  },
  { name: "Targeting drone", blurb: "a quadcopter that finds and tracks targets on its own" },
  {
    name: "Extrovert AI",
    href: "https://github.com/aaronkoolkoder/Extrovert-AI",
    blurb: "rehearse interviews and pitches with AI video personas",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/aaronkoolkoder" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aaronmerch" },
  { label: "Email", href: "mailto:avmercha@uwaterloo.ca" },
  // drop resume.pdf into /public
  { label: "Resume", href: "/resume.pdf" },
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
      <FitToScreen>
        <h1 className="mb-[clamp(0.6em,2dvh,1.5em)] text-[1.25em] font-medium tracking-tight">Aaron Merchant</h1>

        <div className="space-y-[clamp(0.6em,2dvh,1.5em)]">
          <p>
            I&apos;m interested in software that leaves the screen: drones, flight controllers, and
            the code that keeps them in the air.
          </p>

          <p>
            I study Computer Engineering at Waterloo and write flight software at{" "}
            <A href="https://www.uwarg.com">WARG</A>, where I&apos;m building the test rig that runs our
            autopilot against simulated flights before it ever leaves the ground.
          </p>

          <p>
            This summer I co-founded a small game studio. Our game Seal A Driveway hit 7.2M plays and
            11K players at once before it was acquired.
          </p>

          <div>
            <p>A few projects I&apos;ve loved working on:</p>
            <ul className="mt-[0.25em] list-disc space-y-[0.25em] pl-[1.25em] marker:text-muted">
              {projects.map((p) => (
                <li key={p.name}>
                  <A href={p.href}>{p.name}</A> <span className="text-muted">-</span> {p.blurb}
                </li>
              ))}
            </ul>
          </div>

          <nav className="flex gap-[1.25em]">
            {links.map((l) => (
              <A key={l.label} href={l.href}>
                {l.label}
              </A>
            ))}
          </nav>

          <div className="flex min-h-[1.6em] items-center justify-between text-[0.8em] text-muted">
            <Clock />
            <ThemeToggle />
          </div>
        </div>
      </FitToScreen>
    </>
  );
}
