"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";

export type CarouselItem = {
  src: StaticImageData | string;
  alt: string;
  title?: string;
  description?: string;
  link?: string;
};

// Derived instead of hand-duplicated — stays in sync with CarouselItem automatically.
type SharedDescription = Pick<CarouselItem, "title" | "description" | "link">;

type CarouselProps = {
  items: CarouselItem[];
  sharedDescription?: SharedDescription; // when provided, this is used instead of per-slide title/description/link
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
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (i: number) => {
      if (slideCount === 0) return;
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

  const isAtStart = !loop && index === 0;
  const isAtEnd = !loop && index === slideCount - 1;

  useEffect(() => {
    if (!autoPlay || isInteracting) return;
    const id = setInterval(next, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlay, autoPlayInterval, next, isInteracting]);

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
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = { startX: e.clientX, isDragging: true, deltaX: 0 };
    setIsInteracting(true);
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
    setIsInteracting(false);
  };

  // if sharedDescription is passed, it wins over per-slide fields — otherwise fall back to the current slide's own data
  const activeText = sharedDescription ?? items[index];

  if (slideCount === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={activeText?.title ?? "Image carousel"}
      className={`w-full outline-none ${className}`}
      onMouseEnter={() => autoPlay && setIsInteracting(true)}
      onMouseLeave={() => autoPlay && setIsInteracting(false)}
    >
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex touch-pan-y"
            style={{
              transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
              transition: dragState.current.isDragging
                ? "none"
                : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {items.map((item, i) => (
              <div
                key={`${item.link ?? item.src}-${i}`}
                className="w-full shrink-0 select-none"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slideCount}`}
                aria-hidden={i !== index}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1024}
                  height={576}
                  sizes="100vw"
                  className="w-full h-auto object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {showArrows && slideCount > 1 && (
          <>
            <button
              onClick={prev}
              disabled={isAtStart}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              disabled={isAtEnd}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 disabled:opacity-30 disabled:cursor-not-allowed"
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
              aria-current={i === index}
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