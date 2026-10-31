"use client";

import A from "@/components/A";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/projects";
import { ImageIcon, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

function matches(p: Project, words: string[]) {
  const haystack = [p.name, p.blurb, p.details, ...p.tags].join(" ").toLowerCase();
  return words.every((w) => haystack.includes(w));
}

function ProjectImage({ project }: { project: Project }) {
  const frame = "aspect-[16/10] w-full overflow-hidden rounded-lg";

  if (!project.image) {
    // Empty slot until a screenshot is added in lib/projects.ts
    return (
      <div
        className={`${frame} grid place-items-center border border-dashed border-[var(--line)] bg-[var(--chip)] text-muted`}
        aria-hidden
      >
        <ImageIcon className="size-[1.25em] opacity-60" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(project.image)}
      alt={`${project.name} screenshot`}
      loading="lazy"
      className={`${frame} border border-[var(--line)] bg-[var(--chip)] object-cover`}
    />
  );
}

export default function ProjectSearch({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return words.length ? projects.filter((p) => matches(p, words)) : projects;
  }, [projects, query]);

  // "/" focuses the search, Escape clears it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div>
      <label className="group flex items-center gap-[0.6em] rounded-lg bg-[var(--chip)] px-[0.75em] py-[0.55em] transition-shadow focus-within:ring-1 focus-within:ring-foreground/20">
        <Search className="size-[1em] shrink-0 text-muted" strokeWidth={2} aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQuery("");
              e.currentTarget.blur();
            }
          }}
          placeholder="search by name, language or tool"
          aria-label="Search projects"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="grid size-[1.4em] place-items-center rounded-full text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-[0.9em]" strokeWidth={2} />
          </button>
        ) : (
          <kbd className="rounded-[4px] border border-[var(--line)] px-[0.4em] font-sans text-[0.75em] text-muted">
            /
          </kbd>
        )}
      </label>

      <p className="mt-[0.75em] text-[0.85em] text-muted" aria-live="polite">
        {query
          ? `${results.length} of ${projects.length} projects`
          : `${projects.length} projects`}
      </p>

      {results.length ? (
        <ul className="mt-[0.5em]">
          {results.map((p) => (
            <li
              key={p.id}
              id={p.id}
              className="scroll-mt-8 border-t border-[var(--line)] py-[1.25em] target:animate-[highlight_2s_ease-out]"
            >
              <div className="grid gap-[1em] sm:grid-cols-[11rem_1fr] sm:gap-[1.25em]">
                <ProjectImage project={p} />
                <div>
                  <h2 className="font-medium">{p.name}</h2>
                  <p className="mt-[0.25em] text-foreground/85">{p.details}</p>
                  <p className="mt-[0.5em] text-[0.9em] text-muted">{p.tags.join(", ")}</p>
                  {p.href && (
                    <p className="mt-[0.5em]">
                      <A href={p.href}>{p.linkLabel ?? "link"}</A>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-[1.5em] border-t border-[var(--line)] pt-[1.5em] text-muted">
          Nothing matches &ldquo;{query}&rdquo;.{" "}
          <button onClick={() => setQuery("")} className="underline decoration-[var(--line)] underline-offset-2 hover:text-foreground">
            Clear search
          </button>
        </p>
      )}
    </div>
  );
}
