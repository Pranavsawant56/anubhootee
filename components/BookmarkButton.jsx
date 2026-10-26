"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import styles from "./BookmarkButton.module.css";

const STORAGE_KEY = "anubhootee:saved-stories";

function readSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function BookmarkButton({ slug, title, className = "", size = 17 }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readSaved().includes(slug));
    sync();

    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) sync();
    };
    const onCustom = (event) => {
      if (!event.detail || event.detail.slug === slug) sync();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("anubhootee:bookmarks", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("anubhootee:bookmarks", onCustom);
    };
  }, [slug]);

  const toggle = () => {
    const current = readSaved();
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Browsers can disable storage in private modes; the button still toggles visually.
    }

    setSaved(next.includes(slug));
    window.dispatchEvent(
      new CustomEvent("anubhootee:bookmarks", { detail: { slug, saved: next.includes(slug) } })
    );
  };

  return (
    <button
      type="button"
      className={`${styles.bookmark} ${saved ? styles.saved : ""} ${className}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved stories` : `Save ${title}`}
      title={saved ? "Remove from saved stories" : "Save story"}
      onClick={toggle}
    >
      <Bookmark
        size={size}
        strokeWidth={1.7}
        fill={saved ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
