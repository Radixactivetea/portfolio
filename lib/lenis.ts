import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const registerLenis = (instance: Lenis) => {
  lenis = instance;
};

export const getLenis = () => lenis;