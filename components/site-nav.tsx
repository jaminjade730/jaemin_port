"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IntroAudio } from "@/components/intro-audio";
import { ThemeToggle } from "@/components/theme-toggle";

const PAGES = [
  { href: "/", label: "Intro" },
  { href: "/profile", label: "Profile" },
  { href: "/portfolio", label: "Portfolio" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="intro__nav">
      <Link href="/" className="intro__brand">
        이재민 · Lee Jaemin
      </Link>

      <nav className="intro__links" aria-label="페이지">
        {PAGES.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={`intro__link${pathname === page.href ? " is-active" : ""}`}
            aria-current={pathname === page.href ? "page" : undefined}
          >
            {page.label}
          </Link>
        ))}
      </nav>

      <span className="intro__nav-right">
        <ThemeToggle />
        <IntroAudio />
      </span>
    </header>
  );
}
