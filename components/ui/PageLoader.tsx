"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLoading } from "@/components/providers/LoadingProvider";
import { getLenis } from "@/lib/lenis";

const MIN_DISPLAY_TIME = 100; // ms — so it doesn't just flash if the page is already ready

const waitForImages = () => {
  const imgs = Array.from(document.images);
  const pending = imgs.filter((img) => !img.complete);
  if (pending.length === 0) return Promise.resolve();

  return Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true }); // don't hang on broken images
        })
    )
  );
};

const waitForFonts = () => {
  if ("fonts" in document) return document.fonts.ready;
  return Promise.resolve();
};

const PageLoader = () => {
  const { finishLoading } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    getLenis()?.stop();
    const startTime = Date.now();
    const counter = { value: 0 };

    // drive the counter to ~90% right away, "waiting" for the real signal to arrive
    const introTween = gsap.to(counter, {
      value: 90,
      duration: 2,
      ease: "power1.out",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = `${Math.floor(counter.value)}`;
        if (barRef.current) gsap.set(barRef.current, { scaleX: counter.value / 100 });
      },
    });

    Promise.all([waitForFonts(), waitForImages()]).then(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(MIN_DISPLAY_TIME - elapsed, 0);

      setTimeout(() => {
        introTween.kill(); // stop the "fake progress" tween, we're really done now

        // snap the rest of the way to 100 quickly, then fade out
        gsap
          .timeline({
            onComplete: () => {
              setHidden(true);
              getLenis()?.start();
              finishLoading();
            },
          })
          .to(counter, {
            value: 100,
            duration: 0.3,
            ease: "power1.out",
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = `${Math.floor(counter.value)}`;
              if (barRef.current) gsap.set(barRef.current, { scaleX: counter.value / 100 });
            },
          })
          .to(containerRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.1");
      }, remaining);
    });

    return () => {
      introTween.kill();
    };
  }, [finishLoading]);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black"
    >
      <span ref={counterRef} className="font-mono text-4xl text-white">0</span>
      <div className="mt-4 h-px w-40 overflow-hidden bg-white/20">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-white" />
      </div>
    </div>
  );
};

export default PageLoader;