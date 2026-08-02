import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const hideTimer = setTimeout(() => setHidden(true), 1200);
    const removeTimer = setTimeout(() => {
      setRemoved(true);
      document.body.style.overflow = "";
    }, 1800);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`cya-loading-screen${hidden ? " is-hidden" : ""}`} aria-hidden={hidden}>
      <div className="cya-loading-screen__bone-wrap">
        <svg
          className="cya-loading-screen__bone"
          width="64"
          height="64"
          viewBox="0 0 64 64"
        >
          <g fill="#E4602F">
            <rect x="14" y="26" width="36" height="12" rx="6" />
            <circle cx="12" cy="24" r="8" />
            <circle cx="12" cy="40" r="8" />
            <circle cx="52" cy="24" r="8" />
            <circle cx="52" cy="40" r="8" />
          </g>
        </svg>
      </div>
      <div className="cya-loading-screen__shadow"></div>
      <div className="cya-loading-screen__brand">
        Refugio <span>Colitas</span> &amp; Amor
      </div>
      <div className="cya-loading-screen__dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
