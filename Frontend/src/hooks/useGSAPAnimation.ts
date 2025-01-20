import gsap from "gsap";
import { useEffect, useRef } from "react";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
      // Animate the container
      tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Animate the left section (features)
      tl.from(
        containerRef.current.querySelector(".left-section"),
        {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // Animate the right section (form)
      tl.from(
        containerRef.current.querySelector(".right-section"),
        {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // Animate form elements
      tl.from(
        containerRef.current.querySelectorAll(".animate-in"),
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      );
    }
  }, []);

  return containerRef;
};
