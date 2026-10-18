import { data } from "./resume";
import notes from "../../../../notes.json";

export const siteUrl = "https://sinafateh.ir";
export const personId = `${siteUrl}/#person`;

export const slugify = (value: string) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

export const projects = (data.projects ?? []).map((project) => {
  const slug = "slug" in project && typeof project.slug === "string" ? project.slug : slugify(project.name);
  return { ...project, slug, href: `/projects/${slug}/` };
});

const projectSlugs = new Set(projects.map((project) => project.slug));
if (projectSlugs.size !== projects.length) throw new Error("Each project in resume.json needs a unique slug.");

const noteSlugs = new Set<string>();
for (const note of notes) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(note.slug) || noteSlugs.has(note.slug)) {
    throw new Error(`Invalid or duplicate note slug in notes.json: ${note.slug}`);
  }
  noteSlugs.add(note.slug);
  if (!note.en.title || !note.fa.title || !note.en.sections.length || !note.fa.sections.length) {
    throw new Error(`Note ${note.slug} needs English and Persian titles and sections.`);
  }
  for (const slug of note.related) {
    if (!projectSlugs.has(slug)) throw new Error(`Note ${note.slug} refers to missing project ${slug}.`);
  }
}

// Add a note to notes.json once; both language routes and the sitemap follow.
export const topics = notes.map((note) => ({
  slug: note.slug,
  related: note.related,
  ...note.en,
  fa: note.fa,
}));
