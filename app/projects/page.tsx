import Hero, { Clock } from "@/components/Hero";
import ProjectSearch from "@/components/ProjectSearch";
import SiteNav from "@/components/SiteNav";
import ThemeToggle from "@/components/ThemeToggle";
import { projects } from "@/lib/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects · Aaron Merchant",
  description: "Things Aaron Merchant has built.",
};

export default function ProjectsPage() {
  return (
    <>
      <Hero />
      <main className="relative mx-auto max-w-[36rem] px-4 pb-16 leading-[1.5]">
        <header className="mb-[1.5em] flex items-baseline justify-between gap-4">
          <h1 className="text-[1.25em] font-medium tracking-tight">Aaron Merchant</h1>
          <SiteNav active="projects" />
        </header>

        <ProjectSearch projects={projects} />

        <footer className="mt-[1em] flex min-h-[1.6em] items-center justify-between border-t border-[var(--line)] pt-[1em] text-[0.8em] text-muted">
          <Clock />
          <ThemeToggle />
        </footer>
      </main>
    </>
  );
}
