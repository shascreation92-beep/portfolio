import React, { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible((prev) => (prev ? prev : true));
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <div
      className="cursor-glow"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
        transition: "opacity 0.25s ease, left 0.05s linear, top 0.05s linear"
      }}
    />
  );
}
