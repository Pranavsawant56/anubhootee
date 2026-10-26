import { ArrowUp } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.patternBand} aria-hidden="true" />
      <div className="container">
        <RevealGroup className={styles.top} stagger={0.1}>
          <RevealItem className={styles.brandBlock}>
            <div className={styles.brandRow}>
              <img
                className={styles.emblem}
                src="/images/footer-emblem.png"
                alt=""
                width="80"
                height="80"
              />
              <div>
                <p className={styles.wordmark}>Anubhootee</p>
                <p className={styles.tagline}>Culture, belief &amp; place</p>
                <p className={styles.marathiTagline} lang="mr">संस्कृती · श्रद्धा · स्थळ</p>
              </div>
            </div>
            <p className={styles.description}>
              A modern journal of Indian culture, sacred art, and lived experience.
            </p>
          </RevealItem>

          <RevealItem className={styles.linkGroups} delay={0.08}>
            <div className={styles.linkGroup}>
              <p className={styles.linkLabel}>Explore</p>
              <a href="/#explore">By theme</a>
              <a href="/#stories">Journal stories</a>
              <a href="/#places">Travel diary</a>
            </div>
            <div className={styles.linkGroup}>
              <p className={styles.linkLabel}>Anubhootee</p>
              <a href="/#about">About the journal</a>
              <a href="#top">Back to top ↑</a>
            </div>
          </RevealItem>
        </RevealGroup>

        <Reveal className={styles.bottom} delay={0.1}>
          <p>© Anubhootee. All rights reserved.</p>
          <p>Concept imagery is used for this design preview.</p>
          <a className={styles.backTop} href="#top" aria-label="Back to top">
            <ArrowUp size={17} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </footer>
  );
}
