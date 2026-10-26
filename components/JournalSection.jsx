"use client";

import { useEffect, useState } from "react";
import { journalFilters } from "@/lib/content";
import { stories } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";
import styles from "./JournalSection.module.css";

export default function JournalSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const onFilter = (event) => {
      const next = event.detail;
      if (journalFilters.some((filter) => filter.key === next)) {
        setActiveFilter(next);
      }
    };

    window.addEventListener("anubhootee:filter", onFilter);
    return () => window.removeEventListener("anubhootee:filter", onFilter);
  }, []);

  const visibleStories =
    activeFilter === "all"
      ? stories
      : stories.filter((story) => story.category === activeFilter);

  return (
    <section id="stories" className={styles.section} aria-labelledby="journal-title">
      <div className="container">
        <div className={styles.header}>
          <p className={`eyebrow ${styles.kicker}`}>
            More from the journal
            <span className="marathiKicker" lang="mr">अधिक वाचा</span>
          </p>
          <h2 id="journal-title" className={styles.title}>
            Keep exploring
          </h2>
          <p className={styles.headerText}>
            Short reads on belief, food, place, and the knowledge people keep alive.
          </p>
        </div>

        <div className={styles.filterRow} role="group" aria-label="Filter journal stories">
          {journalFilters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              className={`${styles.filter} ${activeFilter === filter.key ? styles.filterActive : ""}`}
              aria-pressed={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="srOnly" aria-live="polite">
          Showing {visibleStories.length} {visibleStories.length === 1 ? "story" : "stories"}
          {activeFilter === "all" ? "." : ` in ${journalFilters.find((item) => item.key === activeFilter)?.label}.`}
        </p>

        <div className={styles.grid}>
          {visibleStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
