"use client";
import React, { useMemo, memo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { images } from "@/constants/images";
import Link from "next/link";
import GradientText from "../GradientText";
import ShinyText from "../ShinyText";
import { useRef } from "react";
import { motion } from "framer-motion";

// Dynamic import for performance - loads 3D component only when needed
const PinContainer = dynamic(
  () =>
    import("@/components/ui/3d-pin").then((mod) => ({
      default: mod.PinContainer,
    })),
  {
    ssr: false, // Disable server-side rendering for better performance
    loading: () => (
      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] border rounded-lg bg-gray-900 animate-pulse">
        <div className="h-4 bg-gray-700 rounded mb-2"></div>
        <div className="h-3 bg-gray-700 rounded mb-4"></div>
        <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg"></div>
      </div>
    ),
  }
);

const VariableProximity = dynamic(() => import("../VariableProximity"), {
  ssr: false,
  loading: () => (
    <motion.div
      className="text-6xl text-violet-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      FEATURED CREATIONS
    </motion.div>
  ),
});

// Memoized projects data to prevent recreation on every render
const projects = [
  {
    id: 1,
    title: "SafeDrive",
    description:
      "Drive smarter and safer with AI-powered accident prevention and instant insurance validation.",
    tech: ["React", "Express", "Mediapipe", "MongoDB"],
    href: "https://safedrive-1.onrender.com/",
    icon: images.safeDrive,
  },
  {
    id: 2,
    title: "CareBridge",
    description:
      "Never miss a dose—real-time health monitoring and a personalized medical chatbot at your fingertips.",
    tech: ["NextJs", "Supabase", "Groq", "Socket.io"],
    href: "https://care-bridge-lake.vercel.app/",
    icon: images.careBridge,
  },
  {
    id: 3,
    title: "GPT 2 from scratch",
    description:
      "Build and train a transformer-based language model from the ground up—no libraries, just pure code.",
    tech: ["Transformers", "Python", "PyTorch"],
    href: "https://github.com/anwesa-mondal/gpt2-from-scratch",
    icon: images.gpt2,
  },
  {
    id: 4,
    title: "SpeedLine",
    description:
      "Real-time train traffic monitoring, AI-driven optimization, and intelligent disruption management for modern railway operations.",
    tech: ["Python", "FastAPI","React","TypeScript", "Node.js"],
    href: "https://speed-line-frontend.vercel.app/",
    icon: images.SpeedLine,
  },
  {
    id: 5,
    title: "CodeSage",
    description:
      "Experience the future of interview experience with our real time AI-interviewer for technical and HR rounds.",
    tech: ["TypeScript", "Node.js", "Agentic workflows", "Groq","FastAPI"],
    href: "https://codesage-five.vercel.app/",
    icon: images.codeSage, // You can change this to a different image
  },
];

const Projects = memo(() => {
  const memoizedProjects = useMemo(() => projects, []);
  const containerRef = useRef(null);

  return (
    <section
      id="projects"
      className="lg:mx-40 md:mx-30 sm:mx-14 mx-8 relative z-10"
    >
      <div ref={containerRef} className="mb-28 mt-16 relative">
        <VariableProximity
          label={"FEATURED CREATIONS"}
          className={
            "text-6xl text-violet-300 hover:text-blue-300 transition-colors duration-100"
          }
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full place-items-center">
        {memoizedProjects.slice(0, 3).map((project) => (
          <div
            key={project.id}
            className="w-full flex items-center justify-center"
          >
            <PinContainer
              title={project.title}
              href={project.href}
              containerClassName="w-full h-full mx-auto"
              className="w-full"
            >
              <div className="flex basis-full flex-col p-5 tracking-tight text-slate-100/50 sm:basis-1/2 w-full h-full ">
                <Image
                  src={project.icon}
                  alt={`${project.title} logo`}
                  width={512}
                  height={512}
                  className="mb-4 rounded w-full h-40"
                />
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                  {project.title}
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">{project.description}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* Second row with remaining 2 projects - centered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto mt-16 place-items-center">
        {memoizedProjects.slice(3).map((project) => (
          <div
            key={project.id}
            className="w-full flex items-center justify-center"
          >
            <PinContainer
              title={project.title}
              href={project.href}
              containerClassName="w-full h-full mx-auto"
              className="w-full"
            >
              <div className="flex basis-full flex-col p-5 tracking-tight text-slate-100/50 sm:basis-1/2 w-full h-full ">
                <Image
                  src={project.icon}
                  alt={`${project.title} logo`}
                  width={512}
                  height={512}
                  className="mb-4 rounded w-full h-40"
                />
                <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                  {project.title}
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">{project.description}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      <div className="mt-16 text-2xl text-slate-500 space-x-2 flex justify-start font-bold">
        <ShinyText
          text="You can find more of my projects on "
          disabled={false}
          speed={3}
        />
        <Link
          href="https://github.com/anwesa-mondal"
          target="_blank"
          className="font-semibold text-sky-500"
        >
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
          >
            GitHub
          </GradientText>
        </Link>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
