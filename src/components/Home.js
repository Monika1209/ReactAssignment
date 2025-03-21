import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

function Home() {
  const headingRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      id="box"
      style={{
        backgroundColor: isDarkMode ? "black" : "white",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.3s",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          id="heading"
          ref={headingRef}
          style={{
            color: isDarkMode ? "white" : "black",
            fontSize: "9rem",
            transition: "color 0.3s",
          }}
        >
          Monika Kushwaha
        </h1>
        <button
          onClick={toggleTheme}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: isDarkMode ? "#fff" : "#333",
            color: isDarkMode ? "#333" : "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default Home;
