"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { SlowMo } from "gsap/EasePack";

export default function Home() {
  useEffect(() => {
    // Ensure the animation runs after the component mounts
    gsap.to(".box", {
      duration: 3,
      rotation: 360,
      scale: 2,
    });
    gsap.registerPlugin(SlowMo);
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <div>
      <h1>Hello World</h1>
      {/* Box to animate */}
      <div
        className="box"
        style={{ width: "100px", height: "100px", background: "red" }}
      ></div>
      <div
        className="box"
        style={{ width: "100px", height: "100px", background: "red" }}
      ></div>
    </div>
  );
}
