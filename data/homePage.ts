import { StaticImageData } from "next/image";
import myPhoto from "@/public/portrait.jpg";

interface Hero {
  title: string;
  description: string;
};

interface AboutPreview {
  title: string;
  description: string;
  photo: StaticImageData | string;
  photoAlt: string;
};

export const heroData: Hero = {
  title: "A Coder Lost in Curiosity",
  description: "I’m Sirajddn, a software engineer working in software web and game development. I care about understanding why things work not just making them work."
};

export const aboutPreview: AboutPreview = {
  title: "I believe good software starts with understanding, not assumptions.",
  description: "My journey into software engineering began with curiosity. Coming from a civil engineering background, I taught myself programming by focusing on the fundamentals rather than shortcuts. Today, I enjoy designing maintainable systems, exploring how technologies work beneath the surface, and solving problems with thoughtful architecture instead of quick fixes. Whether I'm building web applications, backend services, or experimenting with new ideas, I'm always looking to understand the \"why\" before deciding on the \"how.\"",
  photo: myPhoto,
  photoAlt: "potrait photo"
};