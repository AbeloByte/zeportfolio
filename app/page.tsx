import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import About from "@/components/Section/About";
// import Skills from "@/components/Section/Skills";
import ContactSection from "@/components/Section/ContactSection";
import ExperienceSection from "@/components/Section/ExperienceSection";
import FeaturedProjects from "@/components/Section/FeaturedProjects";
import Hero from "@/components/Section/Hero";
import RobotGuide from "@/components/shared/RobotGuide";

export default function Home() {
  return (
    <div className="bg-page font-sans">
      <Header />
      <Hero />
      <About />
      {/* <Skills /> */}
      <FeaturedProjects />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <RobotGuide />
    </div>
  );
}
