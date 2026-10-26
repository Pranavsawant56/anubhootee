import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { bronzeSteps, cholaCards } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import styles from "./CholaBronzeSection.module.css";

export default function CholaBronzeSection() {
  return (
    <section id="chola" className={styles.section} aria-labelledby="chola-title">
      <div className="container">
        <Reveal className={styles.header}>
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
        </Reveal>

        <div className={styles.main}>
          <Reveal as="figure" className={styles.figure} y={34} scale={0.985}>
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
          </Reveal>

          <Reveal className={styles.copy} delay={0.12}>
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
          </Reveal>
        </div>

        <RevealGroup
          id="chola-symbolism"
          className={styles.symbolGrid}
          stagger={0.09}
        >
          {cholaCards.map((card) => (
            <RevealItem as="article" key={card.number} className={styles.symbolCard}>
              <span className={styles.symbolNumber}>{card.number}</span>
              <h4 className={styles.symbolTitle}>{card.title}</h4>
              <p className={styles.symbolText}>{card.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className={styles.process}>
          <div className={styles.processIntro}>
            <p className={styles.processKicker}>From wax to bronze</p>
            <h4 className={styles.processTitle}>The lost-wax casting technique</h4>
          </div>
          <RevealGroup as="ol" className={styles.steps} stagger={0.09} delayChildren={0.12}>
            {bronzeSteps.map((step) => (
              <RevealItem as="li" key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepLabel}>{step.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </section>
  );
}
