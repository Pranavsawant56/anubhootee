import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <svg className={styles.leaf} viewBox="0 0 260 620" fill="none" aria-hidden="true">
        <path
          d="M166 610C154 518 166 425 154 344C142 263 157 174 178 58"
          stroke="#B8C096"
          strokeOpacity=".2"
          strokeWidth="1.2"
        />
        <path
          d="M160 464C103 445 74 398 87 352C138 363 164 405 160 464Z"
          fill="#7F8E5D"
          fillOpacity=".2"
        />
        <path
          d="M152 354C207 327 232 280 218 235C169 252 145 294 152 354Z"
          fill="#7F8E5D"
          fillOpacity=".17"
        />
        <path
          d="M157 255C107 233 89 192 104 156C148 172 166 211 157 255Z"
          fill="#7F8E5D"
          fillOpacity=".14"
        />
        <path
          d="M169 169C214 147 232 108 217 78C180 93 162 127 169 169Z"
          fill="#7F8E5D"
          fillOpacity=".12"
        />
      </svg>

      <div className="container">
        <div className={styles.layout}>
          <RevealGroup className={styles.copy} stagger={0.09}>
            <RevealItem as="p" className={`eyebrow ${styles.kicker}`}>
              About Anubhootee
              <span className="marathiKicker" lang="mr">अनुभूतीविषयी</span>
            </RevealItem>
            <RevealItem as="h2" id="about-title" className={styles.title}>
              A journal for culture,
              <br />
              belief, and place.
            </RevealItem>
            <RevealItem className={styles.paragraphs}>
              <p>
                Anubhootee brings history and lived experience together. We look closely
                at what symbols mean, how traditions are practiced, and what makes a place
                stay with us.
              </p>
              <p>
                Every story begins with curiosity—and leaves room for context, many
                perspectives, and the people who keep culture alive.
              </p>
            </RevealItem>
            <RevealItem as="a" className={styles.cta} href="#stories">
              <span>Explore the journal</span>
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </RevealItem>
          </RevealGroup>

          <Reveal
            as="aside"
            className={styles.panel}
            aria-label="Anubhootee editorial statement"
            delay={0.14}
            scale={0.985}
          >
            <span className={styles.panelWatermark} lang="mr" aria-hidden="true">
              अनुभूती
            </span>
            <p className={styles.panelLabel}>Anubhootee / Experiences in context</p>
            <p className={styles.panelQuote}>
              Look closer.
              <br />
              Listen longer.
              <br />
              <em>Understand more.</em>
            </p>
            <div className={styles.rule} aria-hidden="true" />
            <p className={styles.panelCaption}>
              <span className={styles.devanagari} lang="mr">अनुभूती</span> · An experience, understood.
            </p>
            <p className={styles.panelMarathi} lang="mr">अनुभव · स्मृती · संस्कृती</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
