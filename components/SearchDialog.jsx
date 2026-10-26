"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Search, X } from "lucide-react";
import { stories } from "@/lib/stories";
import styles from "./SearchDialog.module.css";

const quickLinks = [
  { label: "Choose a path into the story", href: "/#explore" },
  { label: "Udaipur, beyond the postcard", href: "/#places" },
  { label: "About Anubhootee", href: "/#about" },
];

export default function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previousFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 40);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
      }
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return stories.filter((story) => {
      const haystack = [
        story.title,
        story.categoryLabel,
        story.description,
        story.meta,
        story.standfirst,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [query]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
      >
        <div className={styles.topline}>
          <span className={styles.kicker} id="search-title">
            Search Anubhootee
          </span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">
            <X size={19} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.inputWrap}>
          <Search size={21} strokeWidth={1.7} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search stories, places, ideas…"
            aria-label="Search stories, places, ideas"
            autoComplete="off"
          />
          <span className={styles.keyHint} aria-hidden="true">ESC</span>
        </div>

        <div className={styles.content}>
          {query.trim() ? (
            <>
              <div className={styles.resultMeta} aria-live="polite">
                <span>
                  {results.length} {results.length === 1 ? "story" : "stories"} found
                </span>
                <span className={styles.queryLabel}>“{query.trim()}”</span>
              </div>

              {results.length > 0 ? (
                <ul className={styles.results}>
                  {results.map((story) => (
                    <li key={story.slug}>
                      <a className={styles.result} href={`/stories/${story.slug}`} onClick={onClose}>
                        <span className={styles.thumb}>
                          <Image
                            src={story.image}
                            alt=""
                            width={64}
                            height={64}
                            sizes="64px"
                          />
                        </span>
                        <span className={styles.resultText}>
                          <span className={styles.resultCategory}>{story.categoryLabel}</span>
                          <span className={styles.resultTitle}>{story.title}</span>
                        </span>
                        <ArrowUpRight
                          className={styles.resultArrow}
                          size={17}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.empty}>
                  <p className={styles.emptyTitle}>No stories match that search.</p>
                  <p className={styles.emptyText}>
                    Try a broader word such as ritual, craft, food, monsoon, or temple.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={styles.sectionLabel}>Explore the journal</div>
              <ul className={styles.quickLinks}>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} onClick={onClose}>
                      <span>{link.label}</span>
                      <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <p className={styles.tip}>
                Tip: press <kbd>/</kbd> anywhere to search the journal.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
