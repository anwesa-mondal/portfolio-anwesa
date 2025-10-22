"use client";
import { images } from "@/constants/images";
import Image from "next/image";
import { useRef, Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { BackgroundGradient } from "../ui/background-gradient";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { SiCplusplus, SiNumpy, SiPython, SiPytorch } from "react-icons/si";

const VariableProximity = dynamic(() => import("../VariableProximity"), {
  ssr: false,
  loading: () => (
    <motion.div
      className="text-6xl text-violet-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      EDUCATION
    </motion.div>
  ),
});

const techLogos = [
  {
    id: 1,
    name: "Python",
    designation: "Programming Language",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
  },
  {
    id: 2,
    name: "PyTorch",
    designation: "Deep Learning Framework",
    image: "https://pytorch.org/assets/images/pytorch-logo.png",
  },
  {
    id: 3,
    name: "TensorFlow",
    designation: "Machine Learning Framework",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png",
  },
  {
    id: 4,
    name: "NumPy",
    designation: "Scientific Computing",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/NumPy_logo_2020.svg/1200px-NumPy_logo_2020.svg.png",
  },
  {
    id: 5,
    name: "Pandas",
    designation: "Data Analysis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Pandas_logo.svg/1200px-Pandas_logo.svg.png",
  },
  {
    id: 6,
    name: "C++",
    designation: "Programming Language",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png",
  },
  {
    id: 8,
    name: "PostgreSQL",
    designation: "Database",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png",
  }
];

export default function Education() {
  const containerRef = useRef(null);
  const memoTech = useMemo(() => techLogos, []);
  return (
    <section id="education">
      <div ref={containerRef} className="mb-20 mx-40 mt-10 relative">
        <VariableProximity
          label={"EDUCATION & SKILLS"}
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

      {/* Education Card */}
      <Suspense
        fallback={
          <div className="w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8">
            <div className="animate-pulse bg-gray-700 h-32 rounded"></div>
          </div>
        }
      >
        <div className="mx-40 hover:scale-105 transition-all duration-300 rounded-2xl">
          <BackgroundGradient
            className="rounded-[22px] bg-black/80"
            containerClassName="w-full"
          >
            <div className="w-full bg-gray-900 backdrop-blur-sm rounded-[22px] border border-gray-800 p-8 group relative">
              {/* Faint University Logo Background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity duration-300">
                <Image
                  src={images.college}
                  alt="INDIRA GANDHI DELHI TECHNICAL UNIVERSITY"
                  layout="fill"
                  objectFit="contain"
                  className="object-cover"
                />
              </div>

              <div className="relative z-10">
                {/* Left side - Education details */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors duration-300">
                    INDIRA GANDHI DELHI TECHNICAL UNIVERSITY
                  </h2>
                  <h3 className="text-xl text-slate-300 mb-4">
                    Bachelor of Technology in Computer Science with
                    specialization in Artificial Intelligence
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm text-slate-400">CGPA:</span>
                    <span className="text-2xl font-bold text-purple-500">
                      8.72/10
                    </span>
                  </div>

                  {/* Course Names - Unique Tag Design */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-200 mb-3">
                      Relevant Coursework
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Data Structures & Algorithms",
                        "Programming with R",
                        "Computer Networks",
                        "Object Oriented Programming",
                        "Database Management Systems",
                        "Proggramming with Python",
                        "Discrete Mathematics"
                      ].map((course, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-3 py-1 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200"
                        >
                          <span className="text-sm font-medium">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-slate-200 mb-3 text-start">
                      Frameworks and Technologies
                    </h4>
                    <div className="flex flex-row items-center justify-start mt-7 w-full">
                      <AnimatedTooltip items={techLogos} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </Suspense>
    </section>
  );
}
