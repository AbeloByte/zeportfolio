import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import About from "@/components/Section/About";
// import Skills from "@/components/Section/Skills";
import ContactSection from "@/components/Section/ContactSection";
import ExperienceSection from "@/components/Section/ExperienceSection";
import FeaturedProjects from "@/components/Section/FeaturedProjects";
import Hero from "@/components/Section/Hero";

export default function Home() {
  return (
    <div className="bg-bgColor font-sans selection:bg-[#DFFF00]/80">
      <Header />
      <Hero />
      <About />
      {/* <Skills /> */}
      <FeaturedProjects />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
