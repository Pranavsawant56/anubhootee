"use client";

import { ArrowUpRight } from "lucide-react";
import { storyPaths } from "@/lib/content";
import styles from "./StoryPaths.module.css";

const toneClass = {
  forest: styles.forest,
  sage: styles.sage,
  yellow: styles.yellow,
  cream: styles.cream,
};

export default function StoryPaths() {
  const choosePath = (path) => {
    if (path.filter) {
      window.dispatchEvent(
        new CustomEvent("anubhootee:filter", { detail: path.filter })
      );
    }
  };

  return (
    <section id="explore" className={styles.section} aria-labelledby="paths-title">
      <div className="container">
        <div className={styles.intro}>
          <div className={styles.introLeft}>
            <p className={`eyebrow ${styles.kicker}`}>A journal of living culture</p>
            <h2 id="paths-title" className={styles.title}>
              Choose a path into the story
            </h2>
          </div>
          <p className={styles.introNote}>
            Start with an object, a ritual, a place—or a moment that stayed with you.
          </p>
        </div>

        <div className={styles.grid}>
          {storyPaths.map((path) => {
            const href = path.destination === "places" ? "#places" : "#stories";
            return (
              <a
                key={path.number}
                href={href}
                className={`${styles.card} ${toneClass[path.tone]}`}
                onClick={() => choosePath(path)}
              >
                {path.tone === "forest" && (
                  <svg
                    className={styles.cardLeaf}
                    viewBox="0 0 140 260"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M78 255C72 212 79 169 70 130C61 91 73 52 85 8"
                      stroke="#B6BF91"
                      strokeOpacity=".2"
                    />
                    <path
                      d="M75 184C48 174 34 151 41 127C66 133 78 155 75 184Z"
                      fill="#83915C"
                      fillOpacity=".24"
                    />
                    <path
                      d="M70 132C96 118 108 94 100 71C76 79 64 102 70 132Z"
                      fill="#83915C"
                      fillOpacity=".2"
                    />
                    <path
                      d="M73 86C49 75 40 53 48 34C70 42 79 62 73 86Z"
                      fill="#83915C"
                      fillOpacity=".17"
                    />
                  </svg>
                )}
                <div className={styles.cardTop}>
                  <span className={styles.cardKicker}>
                    {path.number} / {path.kicker}
                  </span>
                  <span className={styles.arrow}>
                    <ArrowUpRight size={21} strokeWidth={1.35} aria-hidden="true" />
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{path.title}</h3>
                  <p className={styles.cardDescription}>{path.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
