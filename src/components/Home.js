import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function Home() {
  const headingRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    // Get the original text
    const headingText = heading.textContent;
    const splittedText = headingText.split("");
    const halfVal = Math.floor(splittedText.length / 2);

    // Create the new inner HTML with two span classes: "a" and "b"
    let clutter = "";
    splittedText.forEach((elem, index) => {
      if (index < halfVal) {
        clutter += `<span class="a">${elem}</span>`;
      } else {
        clutter += `<span class="b">${elem}</span>`;
      }
    });
    heading.innerHTML = clutter;

    // Animate the first half
    gsap.from(heading.querySelectorAll(".a"), {
      y: 40,
      duration: 0.8,
      delay: 0.5,
      opacity: 0,
      stagger: 0.15,
    });

    // Animate the second half
    gsap.from(heading.querySelectorAll(".b"), {
      y: 40,
      duration: 0.8,
      delay: 0.5,
      opacity: 0,
      stagger: -0.15,
    });
  }, []);

  return (
    <div
      id="box"
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 id="heading" ref={headingRef} style={{ color: "white", textAlign: "center", fontSize: "9rem" }}>  
        Monika Kushwaha
      </h1>
    </div>
  );
}

export default Home;
