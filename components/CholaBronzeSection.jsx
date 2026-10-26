import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { bronzeSteps, cholaCards } from "@/lib/content";
import styles from "./CholaBronzeSection.module.css";

export default function CholaBronzeSection() {
  return (
    <section id="chola" className={styles.section} aria-labelledby="chola-title">
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={`eyebrow ${styles.eyebrow}`}>
              Sacred art · A visual explainer
              <span className="marathiKicker" lang="mr">पवित्र कला</span>
            </p>
            <h2 id="chola-title" className={styles.title}>
              The Chola Bronze
            </h2>
          </div>
          <p className={styles.headerNote}>
            A figure in motion. A world of meaning held in bronze.
          </p>
        </div>

        <div className={styles.main}>
          <figure className={styles.figure}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/nataraja.jpg"
                alt="Chola-period bronze sculpture of Nataraja, Shiva as Lord of the Dance, within a ring of flames"
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.captionStrip}>
              <span className={styles.captionTitle}>Nataraja</span>
              <span className={styles.captionNote}>Shiva as Lord of the Dance</span>
            </figcaption>
          </figure>

          <div className={styles.copy}>
            <div className={styles.noteMarker}>
              <span className={styles.noteLabel}>Culture note</span>
              <span className={styles.noteNumber}>01</span>
            </div>
            <h3 className={styles.copyTitle}>The dance that holds a universe.</h3>
            <p className={styles.copyText}>
              In the Nataraja form, Shiva&apos;s dance is often read as a cycle of creation,
              protection, transformation, and release. Each gesture adds another part of
              the story.
            </p>
            <a className={styles.symbolLink} href="#chola-symbolism">
              Explore the symbolism
              <ArrowDown size={17} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div id="chola-symbolism" className={styles.symbolGrid}>
          {cholaCards.map((card) => (
            <article key={card.number} className={styles.symbolCard}>
              <span className={styles.symbolNumber}>{card.number}</span>
              <h4 className={styles.symbolTitle}>{card.title}</h4>
              <p className={styles.symbolText}>{card.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.process}>
          <div className={styles.processIntro}>
            <p className={styles.processKicker}>From wax to bronze</p>
            <h4 className={styles.processTitle}>The lost-wax casting technique</h4>
          </div>
          <ol className={styles.steps}>
            {bronzeSteps.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepLabel}>{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
