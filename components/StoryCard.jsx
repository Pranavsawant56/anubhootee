import Image from "next/image";
import BookmarkButton from "@/components/BookmarkButton";
import styles from "./StoryCard.module.css";

export default function StoryCard({ story }) {
  return (
    <article className={styles.card}>
      <a className={styles.link} href={`/stories/${story.slug}`} aria-label={`Read ${story.title}`}>
        <div className={styles.imageWrap}>
          <Image
            src={story.image}
            alt={story.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw"
            className={styles.image}
          />
        </div>
        <div className={styles.body}>
          <p className={styles.category}>{story.categoryLabel}</p>
          <h3 className={styles.title}>{story.title}</h3>
          <p className={styles.description}>{story.description}</p>
          <div className={styles.footer}>
            <span>{story.meta}</span>
            <span>{story.number}</span>
          </div>
        </div>
      </a>
      <BookmarkButton slug={story.slug} title={story.title} className={styles.bookmark} />
    </article>
  );
}
