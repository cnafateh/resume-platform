import { data } from "./resume";

export const siteUrl = "https://sinafateh.ir";
export const personId = `${siteUrl}/#person`;

export const slugify = (value: string) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

export const projects = (data.projects ?? []).map((project) => ({
  ...project,
  slug: slugify(project.name),
  href: `/projects/${slugify(project.name)}/`,
}));

export const topics = [
  {
    slug: "asp-net-core",
    title: "ASP.NET Core development",
    description: "How Sina Fateh approaches ASP.NET Core MVC, API design, Entity Framework Core, dependency injection, validation, and maintainable C# applications.",
    intro: "I use C# and ASP.NET Core to build web applications with clear responsibilities between controllers, services, models, and persistence. TaskFlow is a concrete example in my portfolio.",
    sections: [
      { heading: "What is ASP.NET Core MVC?", body: "MVC separates request handling, application data, and presentation. In TaskFlow, controllers receive requests, ViewModels shape form data, and a service layer keeps task and project rules outside the controllers." },
      { heading: "Why use dependency injection?", body: "Dependency injection lets a controller depend on a service contract rather than construct its own dependencies. That makes responsibilities easier to inspect and application logic easier to test." },
      { heading: "How does Entity Framework Core fit?", body: "Entity Framework Core handles the persistence model. TaskFlow uses SQLite and a one-to-many relationship between projects and tasks, including cascade deletion when a project is removed." },
      { heading: "Where should validation happen?", body: "Request and form validation should reject invalid input at the boundary. Business rules belong in the application layer, where they can be reused by more than one endpoint or interface." },
      { heading: "What makes an API maintainable?", body: "Consistent routes, explicit contracts, focused services, predictable errors, and tests for important behavior help an API remain understandable as requirements change." },
    ],
    related: ["taskflow", "e-commerce-backend"],
  },
  {
    slug: "docker-deployment",
    title: "Docker and deployment",
    description: "Sina Fateh's practical notes on Docker images, Compose, Nginx, Linux deployment, CI/CD, HTTPS, and self-hosted applications.",
    intro: "I containerize applications so builds and runtime dependencies are repeatable. My portfolio and several projects use Docker, a reverse proxy, HTTPS, and image-based deployment on a Linux server.",
    sections: [
      { heading: "Why use a multi-stage Docker build?", body: "A build stage installs tools and produces the application artifact. A smaller runtime stage serves only what is needed in production. This separates build dependencies from the deployed image." },
      { heading: "What does Docker Compose manage?", body: "Compose describes related services, networks, volumes, and restart behavior in one configuration. It is useful for coordinating a web application, database, and reverse proxy during deployment." },
      { heading: "Where does Nginx fit?", body: "Nginx can serve static assets or proxy requests to an application. For WebSocket applications, the proxy must preserve connection upgrade headers and route traffic to the correct upstream." },
      { heading: "How should HTTPS be handled?", body: "The public reverse proxy terminates TLS and routes requests by domain. DNS must point to the server and the application must generate canonical URLs for its public HTTPS origin." },
      { heading: "What is a safe deployment workflow?", body: "Build an image in CI, publish an immutable version tag, deploy that version, check the service, and retain an earlier image for rollback. My resume platform uses GitHub Actions and GHCR in this workflow." },
      { heading: "How do you troubleshoot a failed deployment?", body: "Check DNS and TLS first, then proxy routing, container health and logs, network reachability, and application configuration. Separating those layers narrows down the failure." },
    ],
    related: ["resume-as-code-platform", "self-hosted-server-deployment-infrastructure", "pediatric-clinic-platform-medisite"],
  },
  {
    slug: "backend-engineering",
    title: "Backend engineering and APIs",
    description: "Sina Fateh on REST APIs, Django REST Framework, PostgreSQL, authentication, Redis, WebSockets, and backend architecture.",
    intro: "My backend work spans ASP.NET Core and Django. The projects below show authentication, persistence, real-time messaging, API design, and operating applications after deployment.",
    sections: [
      { heading: "How do you design a useful REST API?", body: "Start with the resources and the operations users need. Use consistent request and response shapes, validate input, communicate errors clearly, and document endpoints with OpenAPI where appropriate." },
      { heading: "How should authorization be modeled?", body: "Authentication identifies a user. Authorization decides what that user may do. The pediatric clinic platform uses distinct Doctor, Editor, and Patient roles with role-based access rules." },
      { heading: "When is PostgreSQL useful?", body: "PostgreSQL supports relational data, constraints, indexing, and transactional updates. I use it in projects where durable relationships and query behavior matter." },
      { heading: "Where does Redis help?", body: "Redis is useful for short-lived cached data and other fast-access workloads. Cache entries need an expiration and invalidation strategy so users do not receive stale results." },
      { heading: "How do WebSockets change backend design?", body: "A persistent connection enables live events but also requires connection authentication, routing, disconnection handling, and durable storage when conversation history matters. My private chat project uses Django Channels and PostgreSQL for those needs." },
      { heading: "What makes a backend production-ready?", body: "Beyond endpoint behavior, it needs configuration, logging, migrations, backups, HTTPS, deployment checks, and a way to diagnose failures without exposing secrets." },
    ],
    related: ["private-real-time-chat-platform", "pediatric-clinic-platform-medisite", "e-commerce-backend"],
  },
  {
    slug: "software-engineering",
    title: "Software engineering practice",
    description: "Sina Fateh's software engineering approach to maintainability, testing, CI/CD, architecture, and operating real web applications.",
    intro: "I treat software engineering as the full path from a user need to a system that can be maintained and operated. These short notes connect code structure with testing and deployment.",
    sections: [
      { heading: "What does maintainable code mean?", body: "A maintainer should be able to find a behavior, understand its dependencies, change it in one place, and verify the result. Small responsibilities and clear names help more than extra layers without purpose." },
      { heading: "When should you add a service layer?", body: "A service layer is useful when business rules would otherwise be repeated in controllers, views, or endpoints. TaskFlow uses one to separate application logic from MVC request handling." },
      { heading: "What should tests cover?", body: "Tests should exercise meaningful behavior and failure cases: authorization boundaries, data constraints, critical user flows, and integration points. A test that only repeats an implementation detail gives less confidence." },
      { heading: "Why automate builds?", body: "CI can catch build and test failures before an image is published. Versioned artifacts make deployments reproducible and provide a known rollback target." },
      { heading: "How do you choose a technology?", body: "Start with the product's requirements, the team's ability to maintain it, hosting constraints, and the operational cost. A simpler stack that meets those needs often makes delivery and maintenance easier." },
    ],
    related: ["taskflow", "telegram-archive-viewer", "resume-as-code-platform"],
  },
] as const;
