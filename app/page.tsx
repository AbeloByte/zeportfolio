import Header from "@/components/layout/Header";
import About from "@/components/Section/About";
import Hero from "@/components/Section/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black ">
        <Header />
        <Hero/>
        <About/>
    </div>
  );
}
