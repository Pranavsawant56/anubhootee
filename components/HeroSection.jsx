"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import styles from "./HeroSection.module.css";

const chips = ["Art & heritage", "Belief & ritual", "Places & memory"];

const EASE = [0.22, 1, 0.36, 1];

const copyVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

export default function HeroSection() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 52]);

  return (
    <section id="home" className={styles.section} aria-labelledby="hero-title">
      <div className="container">
        <div ref={heroRef} className={styles.hero}>
          <motion.div
            variants={copyVariants}
            initial="hidden"
            animate="show"
            className={`${styles.copy} patternSurface`}
          >
            <svg
              className={styles.leaf}
              viewBox="0 0 190 390"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M104 385C96 315 103 245 93 190C83 134 95 76 108 12"
                stroke="#B6BF91"
                strokeOpacity=".18"
                strokeWidth="1"
              />
              <path
                d="M101 270C62 257 43 225 52 194C87 201 104 231 101 270Z"
                fill="#798B58"
                fillOpacity=".2"
              />
              <path
                d="M94 199C129 180 145 148 135 119C103 130 87 159 94 199Z"
                fill="#798B58"
                fillOpacity=".17"
              />
              <path
                d="M97 146C64 131 53 102 63 77C92 88 104 114 97 146Z"
                fill="#798B58"
                fillOpacity=".14"
              />
              <path
                d="M103 94C133 80 143 54 133 34C108 44 96 68 103 94Z"
                fill="#798B58"
                fillOpacity=".12"
              />
            </svg>

            <motion.p variants={itemVariants} className={styles.eyebrow}>
              <span className={styles.eyebrowMark} aria-hidden="true">✳</span>
              Culture · Religion · Travel
              <span className={styles.eyebrowMarathi} lang="mr">अनुभूती</span>
            </motion.p>

            <motion.h1
              variants={itemVariants}
              id="hero-title"
              className={styles.title}
            >
              India, in <span className={styles.accent}>stories</span>
              <br />&amp; symbols.
            </motion.h1>

            <motion.p variants={itemVariants} className={styles.support}>
              Explore the art, beliefs, traditions, and everyday experiences that give
              places their meaning.
            </motion.p>

            <motion.div variants={itemVariants} className={styles.actions}>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, scale: 0.985 }}
                transition={{ duration: 0.2 }}
                className={styles.primary}
                href="#stories"
              >
                <span>Explore stories</span>
                <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </motion.a>
              <motion.a
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className={styles.secondary}
                href="#explore"
              >
                <span>Find your way in</span>
                <ArrowDown size={17} strokeWidth={1.8} aria-hidden="true" />
              </motion.a>
            </motion.div>

            <motion.ul
              variants={itemVariants}
              className={styles.chips}
              aria-label="Journal themes"
            >
              {chips.map((chip) => (
                <li key={chip}>
                  <a href="#explore">{chip}</a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.figure
            className={styles.imagePanel}
            initial={{ opacity: 0, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.05, ease: EASE, delay: 0.12 }}
          >
            <motion.div
              className={styles.imageParallax}
              style={{ y: imageY }}
            >
              <Image
                src="/images/hero-temple.jpg"
                alt="Worshippers walking through the stone courtyard of a South Indian temple in warm morning light"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 54vw"
                className={styles.image}
              />
            </motion.div>
            <div className={styles.mobileBadge} aria-hidden="true">
              <span lang="mr">अनुभूती</span>
            </div>
            <figcaption className={styles.mobileCaption}>
              <span>01</span>
              <span>A morning of shared worship</span>
            </figcaption>
            <figcaption className="srOnly">
              01 | A morning of shared worship
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
