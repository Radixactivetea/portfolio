'use client';

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import GlassSurface from '@/components/ui/GlassSurface';
import { HEADER_HEIGHT } from '@/components/ui/LocationBadge';

export default function ClockBadge() {
  // Start as null so server and first client render agree (both render the
  // placeholder). The real clock only appears once mounted on the client,
  // which avoids a text-content hydration mismatch on every tick.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';

  return (
    <div className="fixed top-0 right-0 z-50 pt-6 px-4 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto">
        <GlassSurface
          width="fit-content"
          height={HEADER_HEIGHT}
          borderRadius={HEADER_HEIGHT / 2}
          displace={5}
          backgroundOpacity={0.15}
        >
          <div className="flex h-full items-center gap-1.5 whitespace-nowrap px-5 text-sm font-semibold tabular-nums text-white">
            <Clock size={13} className="text-white/70" />
            {timeStr}
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}