import copy from "../../../../resume.fa.json";
import { topics } from "./seo";

export const faName = copy.name;
export const faHomepage = copy.homepage;
export const faProjectPath = (slug: string) => `/fa/projects/${slug}/`;
export const faTopicPath = (slug: string) => `/fa/topics/${slug}/`;

const projects = copy.projects as Record<string, { title: string; description: string }>;
const skills = copy.skills as Record<string, string>;
const jobs = copy.work as Record<string, { place: string; role: string; summary: string; highlights: string[] }>;
const education = copy.education as Record<string, { place: string; degree: string }>;
const certificates = copy.certificates as Record<string, string>;
const issuers = copy.issuers as Record<string, string>;

export const faProject = (slug: string, englishTitle: string, englishDescription: string) =>
  projects[slug] ?? { title: englishTitle, description: englishDescription };

export const faTopic = (slug: string) => {
  const topic = topics.find((item) => item.slug === slug);
  return topic?.fa ?? {
    title: topic?.title ?? slug,
    description: topic?.description ?? "",
    intro: topic?.intro ?? "",
    sections: topic?.sections ?? [],
  };
};

export const faSkillGroup = (name: string) => skills[name] ?? name;
export const faJob = (name: string) => jobs[name] ?? { place: name, role: "", summary: "", highlights: [] };
export const faEducation = (institution: string) => education[institution] ?? { place: institution, degree: "" };
export const faCertificate = (name: string) => certificates[name] ?? name;
export const faIssuer = (issuer: string) => issuers[issuer] ?? issuer;
export const faDate = (date?: string) => date === "Present" ? "اکنون" : date ?? "";
