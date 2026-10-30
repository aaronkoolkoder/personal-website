"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";

const MAX_PX = 16;
const MIN_PX = 10;

// The page never scrolls, so the text block picks the largest font size
// (everything inside is sized in em) that still fits under the banner.
export default function FitToScreen({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const main = mainRef.current;
    const content = contentRef.current;
    if (!main || !content) return;

    const fits = (px: number) => {
      content.style.fontSize = `${px}px`;
      return content.offsetHeight <= main.clientHeight;
    };

    const fit = () => {
      let size = MAX_PX;
      if (!fits(MAX_PX)) {
        let lo = MIN_PX;
        let hi = MAX_PX;
        for (let i = 0; i < 8; i++) {
          const mid = (lo + hi) / 2;
          if (fits(mid)) lo = mid;
          else hi = mid;
        }
        size = lo;
        fits(size);
      }
      // Last resort on absurdly small screens: let the text block itself scroll.
      main.style.overflowY = content.offsetHeight > main.clientHeight ? "auto" : "hidden";
      content.dataset.fitted = "";
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(main);
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-0 w-full flex-1 overflow-hidden">
      <div
        ref={contentRef}
        data-fit
        className="mx-auto max-w-[36em] px-4 pb-[1.5em] leading-[1.5] opacity-0 transition-opacity duration-300 data-fitted:opacity-100"
      >
        {children}
      </div>
    </main>
  );
}
