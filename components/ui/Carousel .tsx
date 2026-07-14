"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

type CarouselItem = {
  src: StaticImageData | string;
  alt: string;
  title?: string;
  description?: string;
  link?: string;
};

type SharedDescription = {
  title?: string;
  description?: string;
  link?: string;
};

type CarouselProps = {
  items: CarouselItem[];
  sharedDescription?: SharedDescription; // NEW: when provided, this is used instead of per-slide title/description/link
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  loop?: boolean;
  className?: string;
};

const Carousel = ({
  items,
  sharedDescription,
  autoPlay = false,
  autoPlayInterval = 4000,
  showArrows = true,
  showDots = true,
  loop = true,
  className = "",
}: CarouselProps) => {
  const [index, setIndex] = useState(0);
  const slideCount = items.length;

  const dragState = useRef({ startX: 0, isDragging: false, deltaX: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (i: number) => {
      if (loop) {
        setIndex(((i % slideCount) + slideCount) % slideCount);
      } else {
        setIndex(Math.max(0, Math.min(i, slideCount - 1)));
      }
    },
    [loop, slideCount]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, next]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handleKey);
    return () => el?.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, isDragging: true, deltaX: 0 };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging) return;
    const delta = e.clientX - dragState.current.startX;
    dragState.current.deltaX = delta;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!dragState.current.isDragging) return;
    const threshold = 60;
    if (dragState.current.deltaX > threshold) {
      prev();
    } else if (dragState.current.deltaX < -threshold) {
      next();
    }
    dragState.current.isDragging = false;
    setDragOffset(0);
  };

  // if sharedDescription is passed, it wins over per-slide fields — otherwise fall back to the current slide's own data
  const activeText = sharedDescription ?? items[index];

  return (
    <div ref={containerRef} tabIndex={0} className={`w-full outline-none ${className}`}>
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="flex touch-pan-y"
            style={{
              transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
              transition: dragState.current.isDragging
                ? "none"
                : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {items.map((item, i) => (
              <div key={i} className="w-full shrink-0 select-none">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1024}
                  height={576}
                  className="w-full h-auto object-cover"
                  priority={i === 0}
                  loading={i === 0 ? undefined : "eager"}
                />
              </div>
            ))}
          </div>
        </div>

        {showArrows && slideCount > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {showDots && slideCount > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      )}

      {(activeText?.title || activeText?.description) && (
        <div className="mt-6 flex w-full gap-2 px-8">
          {activeText.title && (
            <h3 className="flex-1 text-xl font-semibold text-white">{activeText.title}</h3>
          )}
          {activeText.description && (
            <div className="flex-1">
              <p className="mb-1 text-sm text-white/60">{activeText.description}</p>
              {activeText.link && (
                <a
                  href={activeText.link}
                  className="text-sm text-[#82f1fc] transition-colors duration-300 hover:text-white"
                >
                  Read case study →
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;