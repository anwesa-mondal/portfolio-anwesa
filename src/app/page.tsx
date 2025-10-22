import Navigation from "@/components/Navigation";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import RateMe from "@/components/sections/RateMe";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Gallery />
      <RateMe />
      <Contact />
      <Footer />
    </main>
  );
}
