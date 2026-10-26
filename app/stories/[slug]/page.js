import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookmarkButton from "@/components/BookmarkButton";
import StoryCard from "@/components/StoryCard";
import ReadingProgress from "@/components/ReadingProgress";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { getRelatedStories, getStory, stories } from "@/lib/stories";
import styles from "./StoryDetail.module.css";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    return { title: "Story not found — Anubhootee" };
  }

  return {
    title: `${story.title} — Anubhootee`,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      images: [{ url: story.image }],
      type: "article",
    },
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  const related = getRelatedStories(slug, 3);

  return (
    <>
      <ReadingProgress />
      <Header />
      <main id="main">
        <article>
          <header className={styles.hero}>
            <div className="container">
              <Reveal as="nav" className={styles.breadcrumb} aria-label="Breadcrumb" y={12}>
                <a href="/#stories">Journal</a>
                <span aria-hidden="true">/</span>
                <span>{story.categoryLabel}</span>
              </Reveal>

              <RevealGroup className={styles.heroGrid} stagger={0.1}>
                <RevealItem>
                  <p className={`eyebrow ${styles.kicker}`}>{story.categoryLabel}</p>
                  <h1 className={styles.title}>{story.title}</h1>
                  <p className={styles.standfirst}>{story.standfirst}</p>
                  <div className={styles.meta}>
                    <span>{story.date}</span>
                    <span className={styles.metaDot} aria-hidden="true" />
                    <span>{story.readTime}</span>
                    <span className={styles.metaDot} aria-hidden="true" />
                    <span>{story.meta}</span>
                  </div>
                </RevealItem>

                <RevealItem className={styles.heroAside} delay={0.08}>
                  <BookmarkButton
                    slug={story.slug}
                    title={story.title}
                    className={styles.bookmark}
                    size={18}
                  />
                  <p>Anubhootee journal</p>
                  <p className={styles.storyNumber}>Story {story.number}</p>
                  <p className={styles.asideMarathi} lang="mr">अनुभूती · अनुभव</p>
                </RevealItem>
              </RevealGroup>
            </div>
          </header>

          <div className={styles.imageSection}>
            <div className="container">
              <Reveal as="figure" className={styles.figure} y={30} scale={0.99}>
                <div className={styles.imageWrap}>
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 900px) 100vw, 90vw"
                    className={styles.image}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span>{story.imageAlt}</span>
                  <span>{story.meta}</span>
                </figcaption>
              </Reveal>
            </div>
          </div>

          <div className={styles.bodySection}>
            <div className="container">
              <div className={styles.readingLayout}>
                <aside className={styles.sidebar} aria-label="Article information">
                  <p className={styles.sidebarLabel}>Filed under</p>
                  <p className={styles.sidebarValue}>{story.categoryLabel}</p>
                  <p className={styles.sidebarLabel}>Published</p>
                  <p className={styles.sidebarValue}>{story.date}</p>
                  <a className={styles.backLink} href="/#stories">
                    <ArrowLeft size={15} strokeWidth={1.7} aria-hidden="true" />
                    All stories
                  </a>
                </aside>

                <div className={styles.articleBody}>
                  {story.body.map((section, index) => (
                    <section key={section.heading} className={styles.bodySectionBlock}>
                      <h2 className={styles.sectionTitle}>{section.heading}</h2>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {index === 0 && (
                        <blockquote className={styles.pullQuote}>
                          <p>{story.pullQuote}</p>
                        </blockquote>
                      )}
                    </section>
                  ))}

                  <div className={styles.articleFooter}>
                    <p className={styles.filed}>
                      <span>Filed in</span> {story.categoryLabel}
                    </p>
                    <BookmarkButton
                      slug={story.slug}
                      title={story.title}
                      className={styles.footerBookmark}
                      size={16}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className={styles.related} aria-labelledby="related-title">
            <div className="container">
              <Reveal className={styles.relatedHeader}>
                <div>
                  <p className={`eyebrow ${styles.relatedKicker}`}>Keep reading</p>
                  <h2 id="related-title" className={styles.relatedTitle}>
                    More from the journal
                  </h2>
                </div>
                <a className={styles.allStories} href="/#stories">
                  All stories <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
                </a>
              </Reveal>

              <RevealGroup className={styles.relatedGrid} stagger={0.09}>
                {related.map((item) => (
                  <RevealItem key={item.slug} className={styles.relatedCell}>
                    <StoryCard story={item} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
