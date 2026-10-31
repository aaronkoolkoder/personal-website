import Link from "next/link";
import type { ReactNode } from "react";

const style =
  "underline decoration-[var(--line)] underline-offset-2 transition-colors hover:decoration-foreground";

// Quiet underlined link; internal pages go through next/link, files and
// external URLs stay plain anchors so the browser opens them directly.
export default function A({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <span>{children}</span>;
  const internal = href.startsWith("/");
  const isFile = internal && /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]);
  if (internal && !isFile) {
    return (
      <Link href={href} className={style}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={style} {...(isFile ? { target: "_blank", rel: "noopener" } : {})}>
      {children}
    </a>
  );
}
