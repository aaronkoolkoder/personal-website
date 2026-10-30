"use client";

import { DockNav, type DockNavItem } from "@/components/ui/dock-nav";
import { about, contact, experience, name, projects, resumeHref } from "@/lib/content";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const TABS = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function tabFromHash(): TabId {
  const hash = window.location.hash.slice(1);
  return TABS.some((t) => t.id === hash) ? (hash as TabId) : "about";
}

export default function Home() {
  const [tab, setTab] = useState<TabId>("about");

  useEffect(() => {
    const sync = () => setTab(tabFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const items: DockNavItem[] = TABS.map((t) => ({
    label: t.label,
    href: `#${t.id}`,
    iconSrc: `/icons/${t.id}.png`,
    active: t.id === tab,
  }));

  return (
    <>
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-[18vh] pb-48">
        <h1 className="mb-8 text-sm text-neutral-500">{name}</h1>
        <AnimatePresence mode="wait">
          <motion.section
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h2 className="mb-6 text-2xl font-medium tracking-tight">
              {TABS.find((t) => t.id === tab)!.label}
            </h2>
            <TabContent tab={tab} />
          </motion.section>
        </AnimatePresence>
      </main>

      <div className="fixed inset-x-0 bottom-0 flex justify-center pb-6">
        <div className="origin-bottom scale-[0.8] rounded-3xl border border-neutral-200/70 bg-white/70 px-3 pt-3 pb-4 shadow-lg shadow-black/5 backdrop-blur-xl sm:scale-100 dark:border-neutral-800 dark:bg-neutral-900/70">
          <DockNav aria-label="Sections" items={items} />
        </div>
      </div>
    </>
  );
}

function TabContent({ tab }: { tab: TabId }) {
  switch (tab) {
    case "about":
      return (
        <div className="space-y-4 leading-relaxed text-neutral-700 dark:text-neutral-300">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );

    case "projects":
      return (
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {projects.map((p) => (
            <li key={p.name} className="py-4 first:pt-0">
              <div className="flex items-baseline justify-between gap-4">
                {p.href ? (
                  <a href={p.href} className="font-medium underline-offset-4 hover:underline">
                    {p.name} ↗
                  </a>
                ) : (
                  <span className="font-medium">{p.name}</span>
                )}
                <span className="shrink-0 text-xs text-neutral-500">{p.stack}</span>
              </div>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">{p.blurb}</p>
            </li>
          ))}
        </ul>
      );

    case "experience":
      return (
        <ul className="space-y-6">
          {experience.map((j) => (
            <li key={`${j.org}-${j.role}`}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium">
                  {j.role} <span className="text-neutral-500">· {j.org}</span>
                </span>
                <span className="shrink-0 text-xs text-neutral-500">{j.when}</span>
              </div>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">{j.blurb}</p>
            </li>
          ))}
        </ul>
      );

    case "resume":
      return (
        <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>The one-page version of everything here.</p>
          <a
            href={resumeHref}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            Open resume (PDF)
          </a>
        </div>
      );

    case "contact":
      return (
        <ul className="space-y-3">
          {contact.map((c) => (
            <li key={c.label} className="flex gap-6">
              <span className="w-20 text-neutral-500">{c.label}</span>
              <a href={c.href} className="underline-offset-4 hover:underline">
                {c.value}
              </a>
            </li>
          ))}
        </ul>
      );
  }
}
