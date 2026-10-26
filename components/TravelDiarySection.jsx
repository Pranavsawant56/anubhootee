import Image from "next/image";
import { Flower2 } from "lucide-react";
import { travelCards } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import styles from "./TravelDiarySection.module.css";

export default function TravelDiarySection() {
  return (
    <section id="places" className={styles.section} aria-labelledby="travel-title">
      <div className="container">
        <Reveal className={styles.header}>
          <div>
            <p className={`eyebrow ${styles.kicker}`}>
              Travel diary · Rajasthan
              <span className="marathiKicker" lang="mr">प्रवास · राजस्थान</span>
            </p>
            <h2 id="travel-title" className={styles.title}>
              Udaipur, beyond the postcard.
            </h2>
          </div>
          <p className={styles.headerText}>
            The city of lakes is made of more than palace views: local stories, changing
            plans, crowded lanes, and the moments no itinerary can predict.
          </p>
        </Reveal>

        <div className={styles.layout}>
          <Reveal as="figure" className={styles.figure} y={32} scale={0.985}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/udaipur.jpg"
                alt="Lake Pichola at sunset with the City Palace, boats, and the old city of Udaipur"
                fill
                sizes="(max-width: 900px) 100vw, 52vw"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.captionStrip}>
              <span className={styles.captionTitle}>Udaipur</span>
              <span className={styles.captionNote}>Mewar · Rajasthan</span>
            </figcaption>
          </Reveal>

          <div className={styles.side}>
            <RevealGroup className={styles.cards} stagger={0.1}>
              {travelCards.map((card) => (
                <RevealItem as="article" key={card.number} className={styles.card}>
                  <p className={styles.cardKicker}>
                    {card.number} · {card.kicker}
                  </p>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className={`${styles.message} patternSurface`} delay={0.12}>
              <Flower2 size={19} strokeWidth={1.5} aria-hidden="true" />
              <p>Some journeys are measured not in miles, but in moments that stay.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
