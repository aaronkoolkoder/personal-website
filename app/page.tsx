import FitToScreen from "@/components/FitToScreen";
import Hero, { Clock } from "@/components/Hero";
import ThemeToggle from "@/components/ThemeToggle";
import type { ReactNode } from "react";

const projects = [
  {
    name: "Diorama",
    href: "https://github.com/aaronkoolkoder/wallpaperapp",
    blurb: "a native macOS wallpaper engine built on Metal",
  },
  { name: "Targeting drone", blurb: "an autonomous quadcopter that tracks targets with OpenCV" },
  { name: "Seal A Driveway", blurb: "a multiplayer game with 7.2M+ plays" },
  {
    name: "Extrovert AI",
    href: "https://github.com/aaronkoolkoder/Extrovert-AI",
    blurb: "practice conversations with AI video personas",
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
          <p>I like building software that runs on real hardware.</p>

          <p>
            I study Computer Engineering at Waterloo. I&apos;m currently building hardware-in-the-loop
            testing for ZeroPilot, the open-source autopilot at{" "}
            <A href="https://www.uwarg.com">WARG</A>.
          </p>

          <p>
            Before that I co-founded Lunate Studios and shipped 4 multiplayer games, and spent a summer
            at IQC&apos;s Quantum School modelling qubits with linear algebra.
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
