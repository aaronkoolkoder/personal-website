"use client";

import {
  createContext,
  type ReactNode,
  use,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { ChevronLeft, ChevronRight, Moon, Sun, Sunrise, Sunset } from "lucide-react";

// The photo is re-graded through the day: filter values and a soft-light tint
// are interpolated between these keyframes (hour of day, 0–24).
type Grade = {
  h: number;
  brightness: number;
  saturate: number;
  sepia: number;
  hue: number;
  tint: [number, number, number, number];
  stars: number;
};

const GRADES: Grade[] = [
  { h: 0, brightness: 0.45, saturate: 0.6, sepia: 0, hue: 12, tint: [20, 30, 90, 0.5], stars: 1 },
  { h: 5, brightness: 0.55, saturate: 0.7, sepia: 0.05, hue: 8, tint: [60, 50, 120, 0.4], stars: 0.7 },
  { h: 6.5, brightness: 0.95, saturate: 1.25, sepia: 0.3, hue: -20, tint: [255, 140, 130, 0.35], stars: 0.1 },
  { h: 9, brightness: 1.1, saturate: 1.1, sepia: 0.05, hue: 0, tint: [255, 230, 200, 0.1], stars: 0 },
  { h: 13, brightness: 1.22, saturate: 1.15, sepia: 0, hue: 0, tint: [200, 225, 255, 0.15], stars: 0 },
  { h: 17.5, brightness: 1.05, saturate: 1.35, sepia: 0.35, hue: -12, tint: [255, 160, 70, 0.35], stars: 0 },
  { h: 19.5, brightness: 0.8, saturate: 1.1, sepia: 0.2, hue: -18, tint: [170, 90, 170, 0.4], stars: 0.3 },
  { h: 21.5, brightness: 0.52, saturate: 0.7, sepia: 0, hue: 10, tint: [30, 35, 100, 0.5], stars: 0.9 },
  { h: 24, brightness: 0.45, saturate: 0.6, sepia: 0, hue: 12, tint: [20, 30, 90, 0.5], stars: 1 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function gradeAt(hour: number): Grade {
  const h = ((hour % 24) + 24) % 24;
  const i = GRADES.findIndex((g) => g.h > h);
  const a = GRADES[i - 1];
  const b = GRADES[i];
  const t = (h - a.h) / (b.h - a.h);
  return {
    h,
    brightness: lerp(a.brightness, b.brightness, t),
    saturate: lerp(a.saturate, b.saturate, t),
    sepia: lerp(a.sepia, b.sepia, t),
    hue: lerp(a.hue, b.hue, t),
    tint: a.tint.map((v, k) => lerp(v, b.tint[k], t)) as Grade["tint"],
    stars: lerp(a.stars, b.stars, t),
  };
}

function formatHour(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  const mins = Math.round((h % 1) * 60);
  const h12 = Math.floor(h) % 12 || 12;
  return `${h12}:${String(mins).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

// Fixed pseudo-random star field so server and client markup match.
const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(r(1) * 100), y: round(r(2) * 42), size: r(3) < 0.85 ? 1 : 2, delay: round(r(4) * 6) };
});

const noopSubscribe = () => () => {};

function currentHour() {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

type TimeOfDay = {
  /** null until hydrated, then the visitor's local hour (plus any scrubbing) */
  hour: number | null;
  shift: (step: number) => void;
};

const TimeContext = createContext<TimeOfDay | null>(null);

function useTimeOfDay() {
  const ctx = use(TimeContext);
  if (!ctx) throw new Error("useTimeOfDay must be used inside <TimeProvider>");
  return ctx;
}

export function TimeProvider({ children }: { children: ReactNode }) {
  const now = useSyncExternalStore(noopSubscribe, currentHour, () => null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const step = e.key === "h" || e.key === "ArrowLeft" ? -1 : e.key === "l" || e.key === "ArrowRight" ? 1 : 0;
      if (!step) return;
      setOffset((o) => o + step);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<TimeOfDay>(
    () => ({
      hour: now === null ? null : now + offset,
      shift: (step) => {
        setOffset((o) => o + step);
      },
    }),
    [now, offset],
  );

  return <TimeContext value={value}>{children}</TimeContext>;
}

export default function Hero() {
  const { hour, shift } = useTimeOfDay();
  const [loaded, setLoaded] = useState(false);

  const g = useMemo(() => gradeAt(hour ?? 12), [hour]);
  const ready = hour !== null;
  const shown = ready && loaded;

  return (
    <div className="relative shrink-0">
      <div
        aria-hidden="true"
        onClick={() => shift(2)}
        className="relative -mb-14 h-[min(clamp(150px,32vw,380px),34dvh)] w-full overflow-hidden hero-fade sm:pointer-events-none"
      >
        {/* Opening: the scene washes in from the page colour, soft and slightly zoomed, then settles. */}
        <div
          className="absolute inset-0 transition-[opacity,filter,transform] duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,filter,transform]"
          style={{
            opacity: shown ? 1 : 0,
            filter: shown ? "blur(0px)" : "blur(14px)",
            transform: shown ? "scale(1)" : "scale(1.06)",
          }}
        >
          <div className="absolute inset-0 [animation:drift_70s_ease-in-out_infinite_alternate]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={(img) => {
                if (img?.complete) setLoaded(true);
              }}
              onLoad={() => setLoaded(true)}
              src="/mountains.webp"
              alt=""
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[50%_22%] transition-[filter] duration-700 ease-out"
              style={{
                filter: `brightness(${g.brightness}) saturate(${g.saturate}) sepia(${g.sepia}) hue-rotate(${g.hue}deg)`,
              }}
            />
            <div
              className="absolute inset-0 mix-blend-soft-light transition-[background-color] duration-700 ease-out"
              style={{ backgroundColor: `rgba(${g.tint.join(",")})` }}
            />
            <div
              className="absolute inset-0 transition-opacity duration-700 [mask-image:linear-gradient(to_bottom,black_15%,transparent_45%)]"
              style={{ opacity: ready ? g.stars : 0 }}
            >
              {STARS.map((s, i) => (
                <span
                  key={i}
                  className="absolute rounded-full bg-white [animation:twinkle_4s_ease-in-out_infinite]"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: s.size,
                    height: s.size,
                    animationDelay: `${s.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseIcon({ hour }: { hour: number }) {
  const h = ((hour % 24) + 24) % 24;
  const [phase, Icon] =
    h >= 5 && h < 8 ? ["sunrise", Sunrise] : h >= 8 && h < 17 ? ["day", Sun] : h >= 17 && h < 20 ? ["sunset", Sunset] : ["night", Moon];
  return <Icon key={phase} className="size-[1.1em] animate-[fade-in_400ms_ease-out]" strokeWidth={1.75} />;
}

export function TimeControl() {
  const { hour, shift } = useTimeOfDay();
  const button =
    "grid size-[1.6em] place-items-center rounded-full transition-colors hover:bg-foreground/5 hover:text-foreground active:scale-90";

  return (
    <div className="flex items-center gap-[0.15em] text-[0.8em] text-muted select-none" title="Tip: press h / l">
      <button onClick={() => shift(-1)} className={button} aria-label="An hour earlier">
        <ChevronLeft className="size-[1em]" strokeWidth={2} />
      </button>
      <span className="flex min-w-[5.5em] items-center justify-center gap-[0.4em] tabular-nums" aria-live="polite">
        {hour !== null && (
          <>
            <PhaseIcon hour={hour} />
            {formatHour(hour)}
          </>
        )}
      </span>
      <button onClick={() => shift(1)} className={button} aria-label="An hour later">
        <ChevronRight className="size-[1em]" strokeWidth={2} />
      </button>
    </div>
  );
}
