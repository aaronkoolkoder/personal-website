export type Project = {
  id: string;
  name: string;
  /** One line for the home page list */
  blurb: string;
  /** A couple of sentences for the projects page */
  details: string;
  tags: string[];
  href?: string;
  /** label for the link on the projects page */
  linkLabel?: string;
  /** screenshot in /public/projects, e.g. "/projects/diorama.png" (16:10 works best) */
  image?: string;
};

export const projects: Project[] = [
  {
    id: "diorama",
    name: "Diorama",
    blurb: "live wallpapers for macOS, rendered in Metal at under 0.5% CPU",
    details:
      "A native macOS wallpaper engine that plays Wallpaper Engine scenes on Apple Silicon. Multi-pass effects, particles and audio reactivity in Metal, GLSL-to-Metal shader translation through SPIR-V, and 477 automated tests.",
    tags: ["Swift", "SwiftUI", "Metal", "C++", "GLSL"],
    href: "https://github.com/aaronkoolkoder/wallpaperapp",
    linkLabel: "source",
    image: "/projects/diorama.webp",
  },
  {
    id: "drone",
    name: "Autonomous targeting drone",
    blurb: "a quadcopter that finds and tracks targets on its own",
    details:
      "An F450 quadcopter on ArduPilot and MAVLink that detects faces and objects with OpenCV, then uses kinematic targeting to aim a water actuator at them. PID control and IMU/GPS telemetry keep it steady.",
    tags: ["Python", "OpenCV", "ArduPilot", "MAVLink", "Computer vision"],
    image: "/projects/drone.jpg",
  },
  {
    id: "seal-a-driveway",
    name: "Seal A Driveway",
    blurb: "a multiplayer Roblox game with 7.2M plays and 11K CCU",
    details:
      "Lunate Studios' biggest game: 7.2M+ plays and 11K peak concurrent players before it was acquired. Server-side validation, networking, saved player data, and progression, economy and quest systems.",
    tags: ["Luau", "Roblox", "Game dev"],
    href: "https://www.roblox.com/games/120014184236770",
    linkLabel: "play",
    image: "/projects/seal-a-driveway.jpg",
  },
  {
    id: "extrovert-ai",
    name: "Extrovert AI",
    blurb: "rehearse interviews and pitches with AI video personas",
    details:
      "Built at RythmHacks. Practice real conversations with lifelike AI video personas, then get scored on six communication traits like clarity and confidence, with dashboards to track progress.",
    tags: ["React", "Flask", "OpenAI", "Tavus", "Supabase"],
    href: "https://github.com/aaronkoolkoder/Extrovert-AI",
    linkLabel: "source",
    image: "/projects/extrovert-ai.jpg",
  },
  {
    id: "table",
    name: "Table",
    blurb: "poker and blackjack with friends, with 3D avatars",
    details:
      "An iOS app for playing poker and blackjack with friends, with CPU opponents, game history and a 3D avatar creator.",
    tags: ["Swift", "SwiftUI", "Supabase", "iOS"],
    image: "/projects/table.png",
  },
  {
    id: "signal",
    name: "Signal",
    blurb: "a daily AI brief built from the sources you actually read",
    details:
      "Pulls from the sources you follow, scores what matters with AI, and sends a short daily brief on your schedule.",
    tags: ["Next.js", "TypeScript", "AI"],
    image: "/projects/signal.png",
  },
];

/** Shown on the home page */
export const featured = ["diorama", "drone", "extrovert-ai"].map(
  (id) => projects.find((p) => p.id === id)!,
);
