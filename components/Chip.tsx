/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

// An organisation shown inline as a small logo + name pill.
export default function Chip({
  href,
  logo,
  invertInDark = false,
  children,
}: {
  href: string;
  logo: string;
  /** for single-colour black logos that vanish on a dark background */
  invertInDark?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-[0.35em] rounded-[5px] bg-[var(--chip)] py-[0.05em] pr-[0.45em] pl-[0.25em] align-baseline leading-[1.35] whitespace-nowrap transition-colors hover:bg-[var(--chip-hover)]"
    >
      <img
        src={logo}
        alt=""
        width={16}
        height={16}
        className={`size-[1em] rounded-[3px] object-contain ${invertInDark ? "invert-dark" : ""}`}
      />
      {children}
    </a>
  );
}
