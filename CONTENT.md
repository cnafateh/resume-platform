# Updating the portfolio

The portfolio is generated from three JSON files at the repository root. Edit them and rebuild the site; no Astro component changes are needed for ordinary content updates.

| File | Content |
| --- | --- |
| `resume.json` | English profile, experience, skills, projects, dates, and project links |
| `resume.fa.json` | Persian homepage text, project names and descriptions, plus Persian labels for work, education, skills, and certificates |
| `notes.json` | Engineering notes in English and Persian |

## Projects

Add a project to `resume.json.projects`. Give it a stable ASCII `slug`; its English and Persian URLs will be `/projects/<slug>/` and `/fa/projects/<slug>/`. The English name, description, keywords, dates, and links come from this record.

Add a matching entry under `resume.fa.json.projects[slug]` with `title` and `description`. New projects without this entry still get both pages, but their Persian page falls back to English text. When renaming a project, keep its existing `slug` so old links remain valid.

The `homepage` object in `resume.fa.json` controls the Persian page title, search description, hero, introduction, and contact copy.

```json
{
  "name": "Project name",
  "slug": "project-name",
  "description": "What was built and your role.",
  "startDate": "2026",
  "endDate": "Present",
  "keywords": ["ASP.NET Core", "Docker"],
  "links": { "live": "https://example.com/", "github": "https://github.com/example/project" }
}
```

## Notes

Add one object to the `notes.json` array. Both `en` and `fa` need a `title`, `description`, `intro`, and `sections`. Each section has a `heading` and `body`. `related` contains project slugs and connects the note to the corresponding project pages.

```json
{
  "slug": "example-topic",
  "related": ["project-name"],
  "en": {
    "title": "Example topic",
    "description": "A short search description.",
    "intro": "A short introduction.",
    "sections": [{ "heading": "A useful question?", "body": "A practical answer." }]
  },
  "fa": {
    "title": "موضوع نمونه",
    "description": "توضیح کوتاه برای جست‌وجو.",
    "intro": "مقدمهٔ کوتاه.",
    "sections": [{ "heading": "یک پرسش کاربردی؟", "body": "پاسخ عملی." }]
  }
}
```

The build creates both note pages, internal links, metadata, language alternates, and sitemap entries. Run `npm run build` from `apps/portfolio` before deployment.
