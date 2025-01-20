"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline();

      tl.from(".animate-in", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        ".svg-animate",
        {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.5",
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-secondary-dark p-4"
    >
      <div className="text-center">
        <svg
          className="svg-animate mx-auto mb-8 h-64 w-64"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M43.2,-51.3C55.8,-40.9,65.7,-27.5,69.5,-12.1C73.3,3.3,71,20.7,62.6,34.4C54.2,48.1,39.7,58.1,23.4,64.5C7.1,70.9,-11,73.7,-26.4,68.5C-41.8,63.3,-54.5,50.1,-62.9,34.6C-71.3,19.1,-75.4,1.3,-71.5,-14.2C-67.6,-29.7,-55.7,-42.9,-42.1,-53.2C-28.5,-63.5,-13.2,-70.9,1,-72.1C15.3,-73.3,30.6,-61.7,43.2,-51.3Z"
            transform="translate(100 100)"
          />
        </svg>
        <h1 className="animate-in text-6xl font-bold text-white mb-4">404</h1>
        <p className="animate-in text-2xl text-white mb-8">
          Oops! Page not found
        </p>
        <Link
          href="/"
          className="animate-in inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-dark bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors duration-300"
        >
          <FaHome className="mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
