"use client";

import { useState, type ReactNode } from "react";

export function ViewResearchToggle({
  label = "VIEW RESEARCH",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`case-research${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="case-research__toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{label}</span>
        <span className="case-research__icon" aria-hidden>
          <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
            <path d="M2.2 4.2h7.6L6 9.2z" />
          </svg>
        </span>
      </button>
      <div className="case-research__body" hidden={!open}>
        {children}
      </div>
    </div>
  );
}
