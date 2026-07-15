import { StaticImageData } from "next/image";
import myPhoto from "@/public/images/portrait.jpg";

interface TitleDescription {
  title: string;
  description: string;
};

interface AboutPreview extends TitleDescription {
  photo: StaticImageData | string;
  photoAlt: string;
}

interface WhatIDo extends TitleDescription {
  index: string;
}

export const heroData: TitleDescription = {
  title: "A Coder Lost in Curiosity",
  description: "I’m Sirajddn, a software engineer working in software web and game development. I care about understanding why things work not just making them work."
};

export const aboutPreview: AboutPreview = {
  title: "I believe good software starts with understanding, not assumptions.",
  description: "My journey into software engineering began with curiosity. Coming from a civil engineering background, I taught myself programming by focusing on the fundamentals rather than shortcuts. Today, I enjoy designing maintainable systems, exploring how technologies work beneath the surface, and solving problems with thoughtful architecture instead of quick fixes. Whether I'm building web applications, backend services, or experimenting with new ideas, I'm always looking to understand the \"why\" before deciding on the \"how.\"",
  photo: myPhoto,
  photoAlt: "potrait photo"
};

export const whatIDo: WhatIDo[] = [
  {
    index: "01",
    title: "Software Architecture",
    description:
      "Designing modular and scalable systems with clear separation of concerns, reusable components, and maintainable structures.",
  },
  {
    index: "02",
    title: "Full-Stack Engineering",
    description:
      "Developing end-to-end applications by connecting intuitive interfaces, robust APIs, and efficient data systems.",
  },
  {
    index: "03",
    title: "Backend Engineering",
    description:
      "Building reliable server-side logic, database structures, and services that support complex application requirements.",
  },
  {
    index: "04",
    title: "System Optimization",
    description:
      "Improving software reliability and performance through better architecture, efficient data handling, and problem analysis.",
  },
]