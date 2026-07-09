'use client'

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);


export default function SmoothScroll() {

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.8,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    registerLenis(lenis);

    lenis.on(
      "scroll",
      ScrollTrigger.update
    );


    gsap.ticker.add((time) => {

      lenis.raf(time * 1000);

    });


    gsap.ticker.lagSmoothing(0);


    return () => {

      lenis.destroy();

    };


  }, []);


  return null;

}