"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Fades + lifts its children into view once.
 *
 * <Reveal as="section" delay={0.1}>...</Reveal>
 *
 * Reduced motion is handled globally by <MotionProvider> (MotionConfig),
 * which skips transforms while preserving the gentle fade.
 */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  y = 26,
  scale = 1,
  duration = 0.7,
  amount = 0.2,
  once = true,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Container for staggered children. Pair with <RevealItem>.
 *
 * <RevealGroup as="ul" stagger={0.09}>
 *   {items.map(...) => <RevealItem as="li" key={...} />)}
 * </RevealGroup>
 */
export function RevealGroup({
  as = "div",
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
  amount = 0.15,
  once = true,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * A single child of <RevealGroup>.
 */
export function RevealItem({
  as = "div",
  children,
  className,
  y = 22,
  delay = 0,
  duration = 0.6,
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
