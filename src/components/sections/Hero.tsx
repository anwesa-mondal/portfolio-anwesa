"use client";

import RotatingText from "@/components/RotatingText";
import { SiPython, SiPytorch, SiCplusplus, SiNumpy } from "react-icons/si";
import dynamic from "next/dynamic";
import GradientText from "../GradientText";

// Lazy load performance-heavy components
const Orb = dynamic(() => import("../Orb"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-full" />
});

const DarkVeil = dynamic(() => import("../DarkVeil"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/5" />
});

const TrueFocus = dynamic(() => import("../TrueFocus"), {
  ssr: false,
  loading: () => <div className="text-xl text-gray-400">Machine Learning • Data Structures and Algorithms</div>
});

const SplitText = dynamic(() => import("../SplitText"), {
  loading: () => (
    <div className="text-2xl font-semibold text-center opacity-0">
      Hello, there!
    </div>
  ),
  ssr: false, // Disable SSR for animation components
});

const techLogos = [
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org" },
  {
    node: <SiCplusplus />,
    title: "C++",
    href: "https://isocpp.org",
  },
  {
    node: <SiNumpy />,
    title: "NumPy",
    href: "https://numpy.org",
  },
];

const roles = [
  "AI/ML Engineer",
  "Researcher",
  "Data Scientist",
  "Competitive Programming (C++/DSA)",
];

export default function Hero() {
  return (
    <div id="hero" className="relative w-full h-[100vh]">
      <section className="absolute w-full h-[100vh] bg-transparent flex justify-center items-stretch gap-15 pt-20 pb-20">
        <div className="max-w-[50vw] w-full flex flex-col justify-center">
          <div className="space-y-6 flex flex-col justify-start items-start">
            {/* <SplitText
              text="Hello, there!"
              className="text-2xl font-semibold text-center"
              delay={70}
              duration={1}
              ease="elastic.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-30px"
              textAlign="center"
            /> */}
            <p
              className="text-2xl"
              style={{
                textShadow:
                  "0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 30px rgba(255, 255, 255, 0.2)",
              }}
            >
              Hello there!
            </p>
            <GradientText
              colors={["#5f3fe0", "#fff", "#b45eff", "#fff", "#5f3fe0"]}
              animationSpeed={3}
              showBorder={false}
              className="text-7xl text-start font-bold"
            >
              ANWESA MONDAL
            </GradientText>
            <TrueFocus
              sentence="Machine Learning  Data Structures and Algorithms"
              manualMode={false}
              blurAmount={6}
              borderColor="blue"
              animationDuration={3}
              pauseBetweenAnimations={2}
              fontSize="1.5rem"
            />
            {/* <RotatingText
              texts={roles}
              mainClassName="px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-start"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 text-3xl text-sky-500 font-medium"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={4000}
            /> */}

            {/* <LogoLoop
              logos={techLogos}
              speed={60}
              direction="right"
              logoHeight={48}
              gap={80}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="transparent"
              ariaLabel="Technology partners"
            /> */}
            <button
              onClick={() => window.open("/resume_anwesa.pdf", "_blank")}
              className="text-white text-xl mt-8 cursor-pointer py-2 px-15 rounded-full transition-all duration-100 border-[1px] border-neutral-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] hover:scale-105 hover:backdrop-blur-sm hover:bg-white/10"
            >
              My resume
            </button>
            <div className="flex gap-4 w-full"></div>
          </div>
        </div>
        <div className="max-w-[30vw] w-full relative flex items-center justify-center">
          <Orb
            hoverIntensity={0.3}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm bg-white/5 shadow-2xl">
              <img
                src="/dp.jpeg"
                alt="Anwesa Mondal"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>
      <DarkVeil
        speed={2.0}
        hueShift={15}
        warpAmount={2.5}
        scanlineFrequency={0}
        scanlineIntensity={0.8}
      />
    </div>
  );
}
