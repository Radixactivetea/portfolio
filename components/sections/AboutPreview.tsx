"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

type AboutPreviewProps = {
  photo: StaticImageData | string;
  photoAlt?: string;
};

const AboutPreview = ({ photo, photoAlt = "Portrait photo" }: AboutPreviewProps) => {
  const rootRef = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      href="/about"
      ref={rootRef}
      className="group relative flex flex-col md:flex-row items-center gap-10 md:gap-16 rounded-3xl border border-white/10 bg-white/2 p-8 md:p-12 transition-colors duration-500 hover:bg-white/4"
    >
      {/* text side */}
      <div className="flex-1 order-2 md:order-1">
        <span className="text-sm uppercase tracking-widest text-white/40">
          About Me
        </span>

        <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-white leading-snug">
          I believe good software starts with understanding, not assumptions.
        </h2>

        <p className="mt-4 max-w-md text-white/60">
          My journey into software engineering began with curiosity. Coming from a civil engineering background, I taught myself programming by focusing on the fundamentals rather than shortcuts. Today, I enjoy designing maintainable systems, exploring how technologies work beneath the surface, and solving problems with thoughtful architecture instead of quick fixes. Whether I'm building web applications, backend services, or experimenting with new ideas, I'm always looking to understand the "why" before deciding on the "how."
        </p>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-transform duration-300 group-hover:translate-x-1">
          Read more about me
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>

      {/* photo side */}
      <div className="order-1 md:order-2 relative h-56 w-56 md:h-72 md:w-72 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={photo}
          alt={photoAlt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

    </Link>
  );
};

export default AboutPreview;