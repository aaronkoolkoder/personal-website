import A from "@/components/A";
import Chip from "@/components/Chip";
import FitToScreen from "@/components/FitToScreen";
import Hero, { Clock } from "@/components/Hero";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import { featured } from "@/lib/projects";

const links = [
  { label: "GitHub", href: "https://github.com/aaronkoolkoder" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aaronmerch" },
  { label: "Email", href: "mailto:avmercha@uwaterloo.ca" },
  // drop resume.pdf into /public
  { label: "Resume", href: "/resume.pdf" },
];

export default function Home() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Hero />
      <FitToScreen>
        <header className="mb-[clamp(0.6em,2dvh,1.5em)] flex items-baseline justify-between gap-4">
          <h1 className="text-[1.25em] font-medium tracking-tight">Aaron Merchant</h1>
          <SiteNav active="home" />
        </header>

        <div className="space-y-[clamp(0.6em,2dvh,1.5em)]">
          <p>I&apos;m interested in machine learning and software that runs close to hardware.</p>

          <p>
            I study Computer Engineering @{" "}
            <Chip href="https://uwaterloo.ca" logo="/logos/waterloo.png">
              University of Waterloo
            </Chip>{" "}
            and I&apos;m currently an Embedded Software Developer @{" "}
            <Chip href="https://www.uwarg.com" logo="/logos/uwarg.png" invertInDark>
              UWARG
            </Chip>
            .
          </p>

          <p>
            This summer I co-founded the game development company{" "}
            <Chip
              href="https://www.roblox.com/communities/261071327/Lunate-Studios#!/about"
              logo="/logos/lunate.png"
            >
              Lunate Studios
            </Chip>
            . We developed 2 games, with one reaching 7.2M plays and 11K CCU before getting acquired.
          </p>

          <div>
            <p>Projects I did include:</p>
            <ul className="mt-[0.25em] list-disc space-y-[0.25em] pl-[1.25em] marker:text-muted">
              {featured.map((p) => (
                <li key={p.id}>
                  <A href={`/projects#${p.id}`}>{p.name}</A> <span className="text-muted">-</span>{" "}
                  {p.blurb}
                </li>
              ))}
            </ul>
            <p className="mt-[0.25em]">
              <A href="/projects">All projects →</A>
            </p>
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
    </div>
  );
}
