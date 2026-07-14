"use client";

import React, { useState } from 'react';
import { Home, User, Briefcase, Image as ImageIcon } from 'lucide-react';
import GlassSurface from '@/components/ui/GlassSurface';
import { HEADER_HEIGHT } from '@/components/ui/LocationBadge';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Work', href: '#work', icon: Briefcase },
  { label: 'Gallery', href: '#gallery', icon: ImageIcon }
];

export default function GlassNavbar() {
  const [active, setActive] = useState<string>('Home');

  return (
    // Fixed + horizontally centered wrapper. pointer-events-none on the
    // wrapper so it never blocks clicks on the page behind it; pointer
    // events are re-enabled on the pill itself.
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <div className="pointer-events-auto">
        <GlassSurface
          width="fit-content"
          height={HEADER_HEIGHT}
          borderRadius={HEADER_HEIGHT / 2}
          displace={5}
          backgroundOpacity={0.15}
          blur={14}
        >
          <nav aria-label="Primary" className="flex h-full items-center gap-1 px-1.5">
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const isActive = active === label;
              return (
                <a
                  key={label}
                  href={href}
                  onClick={() => setActive(label)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium tracking-wide
                    transition-all duration-300 ease-out
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60
                    ${isActive
                      ? 'bg-white/15 text-white shadow-[0_0_18px_rgba(255,255,255,0.15)]'
                      : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                    }`}
                >
                  <Icon size={15} className={isActive ? 'opacity-100' : 'opacity-70'} />
                  <span className="hidden sm:block">{label}</span>
                </a>
              );
            })}
          </nav>
        </GlassSurface>
      </div>
    </div>
  );
}