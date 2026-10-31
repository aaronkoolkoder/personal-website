// Prefix a /public path with the base path, e.g. "/personal-website" on GitHub Pages.
// next/link handles this itself, but plain <img> and <a> tags don't.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
