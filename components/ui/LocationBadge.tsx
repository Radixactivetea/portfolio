"use client";

import React, { useMemo } from 'react';
import { MapPin } from 'lucide-react';
import GlassSurface from '@/components/ui/GlassSurface';

/** Shared with GlassNavbar.tsx and ClockBadge.tsx so all three pills line up. */
export const HEADER_HEIGHT = 60;

/** "Asia/Kuala_Lumpur" -> "Kuala Lumpur" */
function zoneToPlace(tz: string) {
  const city = tz.split('/').pop() ?? tz;
  return city.replace(/_/g, ' ');
}

export default function LocationBadge() {
  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);

  return (
    <div className="fixed top-0 left-0 z-50 pt-6 px-4 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto">
        <GlassSurface
          width="fit-content"
          height={HEADER_HEIGHT}
          borderRadius={HEADER_HEIGHT / 2}
          displace={5}
          backgroundOpacity={0.15}
        >
          <div className="flex h-full items-center gap-1.5 whitespace-nowrap px-5 text-[11px] uppercase tracking-wider text-white/70">
            <MapPin size={12} />
            {zoneToPlace(timeZone)}
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}