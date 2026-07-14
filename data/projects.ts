// ---- Types ----------------------------------------------------------------

type Section = {
  title: string;
  content: string;
};

type Feature = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

type EngineeringDecision = {
  decision: string;
  reason: string;
};

type Challenge = {
  challenge: string;
  solution: string;
};

// Constrain to a known set of categories instead of free-form `string`.
// Add new categories here as needed — TS will flag anything misspelled.
type TechCategory =
  | "Framework"
  | "Frontend Library"
  | "Programming Language"
  | "Styling"
  | "Animation"
  | "Deployment";

type Technology = {
  name: string;
  category: TechCategory;
};

type Metric = {
  label: string;
  value: string;
};

type GalleryItem = {
  id: string;
  image: string;
  caption: string;
};

type Project = {
  slug: string; // used to build the detail-page link, e.g. `/projects/${slug}`
  name: string;
  shortDescription: string;
  thumbnail: string; // cover image used in listings/carousels

  overview: Section;
  problem: Section;
  approach: Section;

  architecture: {
    title: string; // was missing from the type but present in the data
    diagram: {
      image: string;
      alt: string;
    };
    description: string;
  };

  features: Feature[];

  screenshots: string[];

  engineeringDecisions: EngineeringDecision[];

  challenges: Challenge[];

  technology: Technology[];

  results: {
    metrics: Metric[];
    description: string;
  };

  lessonsLearned: string[];

  gallery: GalleryItem[];
};

// ---- Data -------------------------------------------------------------
// `satisfies Project` (instead of `as const` alone) gives us BOTH:
//   1. Compile-time validation against the Project shape (catches typos,
//      missing fields, and extra/misplaced fields like the old `title`
//      inside `architecture`).
//   2. Literal type inference preserved on `project`, same as `as const`.

// NOTE: a carousel implies more than one project. Switched `project` (single
// object) to `projects` (array). If you genuinely only have one project right
// now, this still works fine — it's just an array of length 1 — and it means
// no rewrite is needed once you add project #2.
export const projects = [
  {
    slug: "developer-portfolio",
    thumbnail: "/images/portfolio.png",
    name: "Developer Portfolio",

    shortDescription:
      "A modern personal portfolio website built with Next.js, React, and Tailwind CSS to showcase projects, engineering experience, and technical skills.",

    overview: {
      title: "Overview",
      content:
        "This portfolio website serves as a central place to present my software engineering work, technical projects, and professional journey. The goal was to create a fast, responsive, and maintainable platform that reflects my engineering style."
    },

    problem: {
      title: "Problem",
      content:
        "Traditional portfolio websites often become outdated and difficult to maintain. I needed a flexible system where adding new projects, updating skills, and documenting engineering decisions could be done efficiently without rewriting page layouts."
    },

    approach: {
      title: "Approach",
      content:
        "I designed the portfolio as a component-driven application using React. Content is structured as reusable data objects, allowing each project case study to share the same layout while maintaining unique content. The UI focuses on clean typography, responsive design, and smooth user experience."
    },

    architecture: {
      title: "Architecture",
      diagram: {
        image: "/images/portfolio-architecture.png",
        alt: "Portfolio system architecture diagram"
      },
      description:
        "The application uses Next.js for routing and rendering, React components for reusable UI sections, and Tailwind CSS for styling. Project data is separated from presentation components, making the system easier to scale."
    },

    features: [
      {
        id: "project-case-studies",
        title: "Project Case Studies",
        description:
          "Detailed project pages showing the problem, approach, architecture, engineering decisions, and results.",
        image: "/images/project-case-study.png"
      },
      {
        id: "responsive-design",
        title: "Responsive Design",
        description:
          "A mobile-first interface optimized for different screen sizes including desktop, tablet, and mobile.",
        image: "/images/responsive-design.png"
      },
      {
        id: "reusable-components",
        title: "Reusable Components",
        description:
          "Built reusable React components for sections like hero, gallery, technology stack, and project cards.",
        image: "/images/components.png"
      },
      {
        id: "dark-mode",
        title: "Dark Mode",
        description:
          "Implemented theme switching using Tailwind CSS dark mode support.",
        image: "/images/dark-mode.png"
      }
    ],

    screenshots: [
      "/images/homepage.png",
      "/images/projects-page.png",
      "/images/project-detail.png"
    ],

    engineeringDecisions: [
      {
        decision: "Used Next.js App Router",
        reason:
          "Provides modern routing, server components, improved performance, and better project organization."
      },
      {
        decision: "Built UI with reusable React components",
        reason:
          "Avoided duplicated layouts and made future portfolio updates faster."
      },
      {
        decision: "Used Tailwind CSS instead of traditional CSS files",
        reason:
          "Allowed faster styling iteration and consistent design tokens across components."
      },
      {
        decision: "Separated content from UI",
        reason:
          "Project information is stored as TypeScript objects, allowing pages to be generated dynamically."
      }
    ],

    challenges: [
      {
        challenge: "Creating a flexible structure for different project types.",
        solution:
          "Designed a common project schema that supports screenshots, architecture diagrams, features, and technical explanations."
      },
      {
        challenge: "Maintaining performance while adding animations and images.",
        solution:
          "Used Next.js image optimization, lazy loading, and lightweight animations."
      },
      {
        challenge: "Balancing visual design with technical information.",
        solution:
          "Created a structured case-study format that presents both user-facing results and engineering details."
      }
    ],

    technology: [
      { name: "Next.js", category: "Framework" },
      { name: "React", category: "Frontend Library" },
      { name: "TypeScript", category: "Programming Language" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Framer Motion", category: "Animation" },
      { name: "Vercel", category: "Deployment" }
    ],

    results: {
      metrics: [
        { label: "Performance Score", value: "95+ Lighthouse" },
        { label: "Development Speed", value: "Reusable Components" },
        { label: "Deployment", value: "Automated CI/CD" }
      ],
      description:
        "The portfolio provides a scalable foundation for documenting future projects while maintaining fast loading speed and a consistent user experience."
    },

    lessonsLearned: [
      "Good component architecture makes future improvements significantly easier.",
      "Content structure is just as important as visual design.",
      "Performance should be considered from the beginning, not optimized later.",
      "A portfolio should demonstrate engineering decisions, not only final screenshots."
    ],

    gallery: [
      {
        id: "gallery-home",
        image: "/images/gallery-home.png",
        caption: "Portfolio landing page"
      },
      {
        id: "gallery-projects",
        image: "/images/gallery-projects.png",
        caption: "Project showcase section"
      },
      {
        id: "gallery-mobile",
        image: "/images/gallery-mobile.png",
        caption: "Mobile responsive layout"
      }
    ]
  }
] as const satisfies Project[];

export type { Project, Section, Feature, EngineeringDecision, Challenge, Technology, Metric, GalleryItem };