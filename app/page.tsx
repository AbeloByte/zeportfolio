import Header from "@/components/layout/Header";
import About from "@/components/Section/About";
import FeaturedProjects from "@/components/Section/FeaturedProjects";
import Hero from "@/components/Section/Hero";


export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black selection:bg-[#DFFF00]/80">
        <Header />
        <Hero/>
        <About/>
        <FeaturedProjects />
    </div>
  );
}
