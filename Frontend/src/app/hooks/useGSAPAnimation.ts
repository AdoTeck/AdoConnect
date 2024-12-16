import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.querySelectorAll(".animate-in"), {
        opacity: 0,
        scale: 0.95,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  return containerRef;
};
