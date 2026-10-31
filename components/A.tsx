import Link from "next/link";
import type { ReactNode } from "react";

const style =
  "underline decoration-[var(--line)] underline-offset-2 transition-colors hover:decoration-foreground";

// Quiet underlined link; internal paths go through next/link.
export default function A({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <span>{children}</span>;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={style}>
      {children}
    </a>
  );
}
