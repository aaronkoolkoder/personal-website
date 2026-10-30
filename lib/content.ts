// Everything the site says lives here, so editing copy never means touching layout.

export const name = "Aaron Merchant";

export const about = [
  "Hey, I'm Aaron. I build software I'd actually want to use myself.",
  "Lately that's a live wallpaper engine for macOS and a poker app for my friends. I care most about the part where a project goes from working to feeling good.",
];

export type Project = {
  name: string;
  blurb: string;
  stack: string;
  href?: string;
};

export const projects: Project[] = [
  {
    name: "Diorama",
    blurb: "Live wallpapers for macOS. Plays Wallpaper Engine scenes natively in Metal.",
    stack: "Swift · Metal",
    href: "https://github.com/aaronkoolkoder/wallpaperapp",
  },
  {
    name: "Table",
    blurb: "Poker and blackjack with friends, with a 3D avatar creator.",
    stack: "SwiftUI · Supabase",
  },
  {
    name: "Signal",
    blurb: "A daily AI brief built from the sources you actually read.",
    stack: "Next.js · AI",
  },
  {
    name: "Extrovert AI",
    blurb: "Practice interviews and pitches with lifelike AI personas. Built at RythmHacks.",
    stack: "React · Tavus",
    href: "https://github.com/aaronkoolkoder/Extrovert-AI",
  },
];

export type Job = {
  role: string;
  org: string;
  when: string;
  blurb: string;
};

// TODO: fill in real experience
export const experience: Job[] = [
  {
    role: "Your role",
    org: "Company / team",
    when: "2026",
    blurb: "One line about what you did and what came of it.",
  },
];

// Drop a resume.pdf into /public and this link starts working.
export const resumeHref = "/resume.pdf";

export const contact = [
  { label: "GitHub", value: "aaronkoolkoder", href: "https://github.com/aaronkoolkoder" },
  // TODO: add email / LinkedIn
];
