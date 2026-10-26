"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { journalFilters } from "@/lib/content";
import { stories } from "@/lib/stories";
import StoryCard from "@/components/StoryCard";
import { Reveal } from "@/components/Reveal";
import styles from "./JournalSection.module.css";

const EASE = [0.22, 1, 0.36, 1];

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
        <Reveal className={styles.header}>
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
        </Reveal>

        <Reveal
          className={styles.filterRow}
          role="group"
          aria-label="Filter journal stories"
          delay={0.08}
        >
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
        </Reveal>

        <p className="srOnly" aria-live="polite">
          Showing {visibleStories.length} {visibleStories.length === 1 ? "story" : "stories"}
          {activeFilter === "all" ? "." : ` in ${journalFilters.find((item) => item.key === activeFilter)?.label}.`}
        </p>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {visibleStories.map((story, index) => (
              <motion.div
                key={story.slug}
                layout
                className={styles.cell}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.22 } }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(index, 3) * 0.05,
                  ease: EASE,
                }}
              >
                <StoryCard story={story} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
