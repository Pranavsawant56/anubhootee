"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { navLinks } from "@/lib/content";
import SearchDialog from "@/components/SearchDialog";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isHome = pathname === "/";

  const sectionHref = (hash) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (isTyping) return;

      if (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        setSearchOpen(true);
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <motion.header
        className={styles.header}
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`container ${styles.inner}`}>
          <a className={styles.brand} href={sectionHref("#home")} aria-label="Anubhootee home">
            <img src="/images/header-emblem.png" alt="" width="90" height="90" />
            <span className={styles.brandText}>
              <span className={styles.wordmark}>Anubhootee</span>
              <span className={styles.tagline}>
                <span className={styles.devanagari} lang="mr">अनुभूती</span>
                <span className={styles.dot}>·</span>
                Culture in context
              </span>
            </span>
          </a>

          <div className={styles.right}>
            <nav className={styles.nav} aria-label="Primary navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  className={`${styles.navLink} ${link.label === "Home" ? styles.navLinkActive : ""}`}
                  href={sectionHref(link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Search the journal"
              aria-keyshortcuts="/ Control+K"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} strokeWidth={1.9} aria-hidden="true" />
            </button>

            <a className={styles.cta} href={sectionHref("#stories")}>
              <span>Read the journal</span>
              <span className={styles.ctaArrow} aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              className={styles.menuButton}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={21} strokeWidth={1.8} aria-hidden="true" />
              ) : (
                <Menu size={21} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

      </motion.header>

      <div
        id="mobile-navigation"
        className={`${styles.mobilePanel} ${menuOpen ? styles.mobilePanelOpen : ""}`}
        hidden={!menuOpen}
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={styles.mobileNavLink}
              href={sectionHref(link.href)}
              onClick={() => setMenuOpen(false)}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <div className={styles.mobileActions}>
          <a
            className={styles.mobileCta}
            href={sectionHref("#stories")}
            onClick={() => setMenuOpen(false)}
          >
            Read the journal <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className={styles.mobileSearch}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen(true);
            }}
          >
            <Search size={17} aria-hidden="true" />
            Search the journal
          </button>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
