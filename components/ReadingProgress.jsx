"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./ReadingProgress.module.css";

/**
 * Thin, fixed reading-progress bar for story pages.
 * Hidden via CSS when the visitor prefers reduced motion.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
