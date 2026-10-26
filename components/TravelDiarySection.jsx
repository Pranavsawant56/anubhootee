import Image from "next/image";
import { Flower2 } from "lucide-react";
import { travelCards } from "@/lib/content";
import styles from "./TravelDiarySection.module.css";

export default function TravelDiarySection() {
  return (
    <section id="places" className={styles.section} aria-labelledby="travel-title">
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={`eyebrow ${styles.kicker}`}>Travel diary · Rajasthan</p>
            <h2 id="travel-title" className={styles.title}>
              Udaipur, beyond the postcard.
            </h2>
          </div>
          <p className={styles.headerText}>
            The city of lakes is made of more than palace views: local stories, changing
            plans, crowded lanes, and the moments no itinerary can predict.
          </p>
        </div>

        <div className={styles.layout}>
          <figure className={styles.figure}>
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
          </figure>

          <div className={styles.side}>
            <div className={styles.cards}>
              {travelCards.map((card) => (
                <article key={card.number} className={styles.card}>
                  <p className={styles.cardKicker}>
                    {card.number} · {card.kicker}
                  </p>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.description}</p>
                </article>
              ))}
            </div>

            <div className={`${styles.message} patternSurface`}>
              <Flower2 size={19} strokeWidth={1.5} aria-hidden="true" />
              <p>Some journeys are measured not in miles, but in moments that stay.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
