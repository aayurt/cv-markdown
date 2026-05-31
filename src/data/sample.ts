import type { ResumeData } from '../types/resume';

export const SAMPLE_DATA: ResumeData = {
  header: {
    name: "Aayurt Shrestha",
    title: "Full-stack Software Engineer",
    github: "github.com/aayurt",
    website: "aayurtshrestha.com.np",
    phone: "+977 9843516471",
    email: "aayurtshrestha@gmail.com",
    status: "Open to work",
  },
  summary:
    "Full-stack Software Engineer with 5+ years of experience designing and building scalable distributed systems, multi-tenant SaaS platforms, and real-time applications. Experienced in architecting high-concurrency WebSocket systems, event-driven microservices, and batch/streaming data pipelines.",
  projects: [],
  experience: [
    {
      company: "Founding Engineer (Contract)",
      position: "Founding Engineer",
      period: "May 2026",
      bullets: [
        "Architected and delivered full-stack applications establishing the core technical foundation and dev-workflows.",
        "Designed scalable APIs and modular backend services, improving system flexibility and maintainability.",
        "Collaborated with clients to translate product requirements into production-ready features and systems.",
        "Applied LLMs to speed up implementation while maintaining code quality, testing, and reliability standards.",
        "Built high-performance, real-time systems with a focus on scalability and maintainable architecture.",
      ],
    },
    {
      company: "Pageup People (Clinch)",
      position: "Software Engineer",
      period: "Oct 2023 – Jun 2025",
      bullets: [
        "Architected and delivered high-scale features for a multi-tenant recruitment marketing platform.",
        "Built a real-time, Slack-style chat system supporting thousands of concurrent users during live events.",
        "Designed batch and streaming pipelines powering workflows, automation, and search infrastructure.",
        "Spearheaded AI/LLM integration to automate personalization and enhance candidate engagement.",
        "Driven legacy-to-modern migration by refactoring CakePHP modules into scalable Node.js microservices.",
        "Optimized database performance via indexing and refactoring to reduce dashboard latency.",
        "Led frontend modernisation using Next.js, improving performance, SEO, and accessibility compliance.",
        "Engineered secure public APIs and integration frameworks that accelerated partner onboarding by 30%.",
        "Mentored engineering teams while improving testing standards with Playwright and Jest.",
      ],
    },
    {
      company: "MobileKraft",
      position: "Software Engineer",
      period: "Sep 2022 – Jul 2023",
      overview: "Full-stack web and mobile development for enterprise asset tracking",
      bullets: [
        "Architected full-stack web and Flutter apps for enterprise-grade asset tracking and operational workflows.",
        "Owned the full product lifecycle, from stakeholder requirements through to final production deployment.",
        "Engineered a low-code visual API builder, abstracting complex schemas to empower non-technical users.",
        "Optimized backend latency using Redis caching and query tuning, significantly improving API response times.",
        "Standardized foundational API patterns, developing shared service layers that accelerated feature delivery.",
        "Ensured system reliability through proactive production monitoring, bug fixes, and release management.",
      ],
    },
    {
      company: "Himalayan Techies",
      position: "Software Engineer",
      period: "Dec 2019 – Jul 2022",
      bullets: [
        "Delivered end-to-end full-stack features for government and client applications, owning the lifecycle from UI design to database implementation.",
        "Engineered offline-first solutions for rural environments, ensuring resilience in low-bandwidth settings.",
        "Developed transaction and reporting engines for large-scale cooperative management systems.",
        "Architected responsive interfaces from wireframes while mentoring junior developers on team standards.",
        "Managed server infrastructure and Apache configurations to ensure high availability across domains.",
      ],
    },
  ],
  education: [
    {
      school: "Kingston University",
      degree: "MSc",
      major: "Software Engineering with Management Studies",
      period: "2023",
    },
    {
      school: "Patan Multiple Campus",
      degree: "BSc",
      major: "Computer Science & IT",
      period: "2019",
    },
  ],
  skills: [],
  appendix: [],
};
