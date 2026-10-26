import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StoryPaths from "@/components/StoryPaths";
import CholaBronzeSection from "@/components/CholaBronzeSection";
import TravelDiarySection from "@/components/TravelDiarySection";
import JournalSection from "@/components/JournalSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <StoryPaths />
        <CholaBronzeSection />
        <TravelDiarySection />
        <JournalSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
