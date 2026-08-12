import resume from "../../../../resume.json";

export interface CV {
  name: string;
  title: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  personalWebsiteUrl: string;
  contact: Contact;
  work: Work[];
  education: Education[];
  skills: SkillGroup[];
}

export interface Contact {
  email: string;
  tel: string;
  social: Social[];
}

export interface Social {
  name: string;
  url: string;
}

export interface Work {
  company: string;
  link: string;
  title: string;
  start: string;
  end: string | null;
  description: string;
  achievements?: string[];
  badges?: string[];
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string | null;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

const formatLocation = () => {
  const city = resume.basics.location?.city;
  const country = resume.basics.location?.countryCode;

  return [city, country].filter(Boolean).join(", ");
};

export const CV_DATA: CV = {
  name: resume.basics.name,

  title: resume.basics.label,

  location: formatLocation(),

  locationLink: "",

  about: resume.basics.about,
  summary: resume.basics.summary,

  personalWebsiteUrl: resume.basics.url ?? "",

  contact: {
    email: resume.basics.email,
    tel: resume.basics.phone ?? "",

    social: (resume.basics.profiles ?? []).map((profile) => ({
      name: profile.network,
      url: profile.url,
    })),
  },

  work: (resume.work ?? []).map((job) => ({
    company: job.name,
    link: job.url ?? "",
    title: job.position,
    start: job.startDate,
    end: job.endDate ?? null,
    description: job.summary ?? "",
    achievements: job.highlights ?? [],
    badges: job.keywords ?? [],
  })),

  education: (resume.education ?? []).map((item) => ({
    school: item.institution,
    degree: [item.studyType, item.area].filter(Boolean).join(" in "),
    start: item.startDate,
    end: item.endDate ?? null,
  })),

  skills: (resume.skills ?? []).map((skill) => ({
    name: skill.name,
    skills: skill.keywords ?? [],
  })),
};