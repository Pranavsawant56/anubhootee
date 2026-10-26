"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global motion defaults.
 * `reducedMotion="user"` makes every animation respect the visitor's
 * prefers-reduced-motion setting: transforms are skipped, opacity still fades.
 */
export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
