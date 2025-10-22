"use client";
import React, { ReactNode, useMemo, memo, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { images } from "@/constants/images";
import Link from "next/link";

// Pre-load critical modal components for faster opening
const Modal = dynamic(
  () =>
    import("@/components/ui/animated-modal").then((mod) => ({
      default: mod.Modal,
    })),
  {
    ssr: false,
  }
);

const ModalTrigger = dynamic(
  () =>
    import("@/components/ui/animated-modal").then((mod) => ({
      default: mod.ModalTrigger,
    })),
  {
    ssr: false,
  }
);

// Lazy load non-critical components with better loading control
const Timeline = dynamic(
  () =>
    import("@/components/ui/timeline").then((mod) => ({
      default: mod.Timeline,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-gray-400">Loading timeline...</div>
      </div>
    ),
  }
);

const GlareHover = dynamic(() => import("@/components/GlareHover"), {
  ssr: false,
});

const BackgroundGradient = dynamic(
  () =>
    import("@/components/ui/background-gradient").then((mod) => ({
      default: mod.BackgroundGradient,
    })),
  {
    ssr: false,
  }
);

// Optimized modal components with pre-loading
const ModalBody = dynamic(
  () =>
    import("@/components/ui/animated-modal").then((mod) => ({
      default: mod.ModalBody,
    })),
  {
    ssr: false,
  }
);

const ModalContent = dynamic(
  () =>
    import("@/components/ui/animated-modal").then((mod) => ({
      default: mod.ModalContent,
    })),
  {
    ssr: false,
  }
);

const ModalFooter = dynamic(
  () => import("@/components/ui/animated-modal").then((mod) => mod.ModalFooter),
  {
    ssr: false,
  }
);

// Optimized Task Card Component with memoization
const TaskCard = memo(
  ({
    task,
    index,
  }: {
    task: { title: string; description: string; color: string };
    index: number;
  }) => (
    <div key={index} className="bg-zinc-800 p-4 rounded-lg min-w-md max-w-lg">
      <h4 className={`text-lg font-semibold mb-2 text-${task.color}-400`}>
        {task.title}
      </h4>
      <p className="text-[rgb(var(--secondary))]">{task.description}</p>
    </div>
  )
);

TaskCard.displayName = "TaskCard";

// Optimized Technology Badge Component
const TechBadge = memo(
  ({ tech }: { tech: { name: string; color: string } }) => (
    <span
      className={`px-3 py-1 bg-${tech.color}/20 text-${tech.color} rounded-full text-sm font-medium`}
    >
      {tech.name}
    </span>
  )
);

TechBadge.displayName = "TechBadge";

// Optimized Modal Content Component with lazy rendering
const ModalContentComponent = memo(
  ({
    description,
    tasks,
    outcomes,
    technologies,
    githubLink,
    linkLabel = "GitHub",
  }: {
    description: string;
    tasks: Array<{ title: string; description: string; color: string }>;
    outcomes: string;
    technologies: Array<{ name: string; color: string }>;
    githubLink: string;
    linkLabel?: string;
  }) => {
    // Memoize expensive computations
    const memoizedTasks = useMemo(() => tasks, [tasks]);
    const memoizedTechnologies = useMemo(() => technologies, [technologies]);

    return (
      <ModalBody className="max-w-7xl">
        <ModalContent className="space-y-6 w-full max-w-7xl">
          <div className="text-center mb-6">
            <p className="text-[rgb(var(--secondary))] text-xl font-bold">
              {description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Key Tasks & Achievements
            </h3>

            <div className="w-full h-[40%] overflow-auto">
              <div className="flex gap-4 flex-row h-full">
                {memoizedTasks.map((task, index) => (
                  <TaskCard key={task.title} task={task} index={index} />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 p-6 rounded-lg border border-green-500/20">
              <h4 className="text-xl font-semibold text-white mb-3">
                Conference Publication :
              </h4>
              <p className="text-[rgb(var(--secondary))]">{outcomes}</p>
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="gap-4 pt-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-wrap gap-2">
              {memoizedTechnologies.map((tech) => (
                <TechBadge key={tech.name} tech={tech} />
              ))}
            </div>
            <Link
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              {linkLabel}
            </Link>
          </div>
        </ModalFooter>
      </ModalBody>
    );
  }
);

ModalContentComponent.displayName = "ModalContentComponent";

// Optimized Experience Card Component
const ExperienceCard = memo(
  ({
    title,
    subtitle,
    imageSrc,
    imageAlt,
    modalContent,
  }: {
    title: string;
    subtitle: string;
    imageSrc: string;
    imageAlt: string;
    modalContent: ReactNode;
  }) => (
    <Modal>
      <ModalTrigger className="flex -translate-y-10 justify-center group/modal-btn">
        <BackgroundGradient
          className="rounded-[22px] bg-black/80"
          containerClassName="w-full"
        >
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="px-6"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 w-3/4 pr-4 space-y-3">
                <h2 className="text-xl text-start font-bold text-neutral-300">
                  {title}
                </h2>
                <p className="text-lg text-start font-bold text-neutral-500 w-[80%]">
                  {subtitle}
                </p>
              </div>
              <div className="flex-shrink-0 w-1/4">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </div>
          </GlareHover>
        </BackgroundGradient>
      </ModalTrigger>
      <Suspense
        fallback={
          <ModalBody className="max-w-7xl">
            <div className="flex items-center justify-center p-8">
              <div className="animate-pulse text-gray-400">
                Loading content...
              </div>
            </div>
          </ModalBody>
        }
      >
        {modalContent}
      </Suspense>
    </Modal>
  )
);

ExperienceCard.displayName = "ExperienceCard";

// Main Experience Component with optimized data structure
const Experience = memo(() => {
  // Pre-computed data structure for faster access
  const data = useMemo(
    () => [
      {
        title: "May '25 - Present",
        content: (
          <ExperienceCard
            title="Research Intern at Carnegie Mellon University, Pittsburgh"
            subtitle="Discover detailed insights and outcomes—click to view the full research experience."
            imageSrc={images.cmu}
            imageAlt="Carnegie Mellon University"
            modalContent={
              <ModalContentComponent
                description="Working on cutting-edge research in Artificial Intelligence and Machine Learning"
                tasks={[
                  {
                    title: "Anatomy-Constrained Framework",
                    description:
                      "Developed an unsupervised deep learning framework for brain MRI template registration using a dual-output 3D U-Net with adaptive voxel-wise regularization.",
                    color: "blue",
                  },
                  {
                    title: "Adaptive λ-Map Design",
                    description:
                      "Implemented a λ-map–based local smoothness control that dynamically regulates deformation strength across brain regions, preserving fine cortical details and topology.",
                    color: "green",
                  },
                  {
                    title: "Scalable Neuroimaging Pipeline",
                    description:
                      "Replaced iterative optimization with direct deformation prediction, enabling faster, anatomically consistent alignments for large-scale atlas construction.",
                    color: "purple",
                  }
                ]}
                outcomes="Ongoing project under my lead, aimed for publication in Imaging Neuroscience (MIT Press).
Proposes a structurally aware, efficient, and adaptive brain registration paradigm, advancing the field of unsupervised neuroimaging and atlas alignment."
                technologies={[
                  { name: "Python", color: "blue" },
                  { name: "TensorFlow", color: "orange" },
                  { name: "PyTorch", color: "red" },
                  { name: "Jupyter", color: "purple" },
                  { name: "Git", color: "gray" },
                ]}
                githubLink="https://github.com/username/cmu-research"
              />
            }
          />
        ),
      },
      {
        title: "Jun '25 - Jul '25",
        content: (
          <ExperienceCard
            title="Research Intern at National Institute of Technology, Rourkela"
            subtitle="Explore the research journey and outcomes—click to view detailed internship contributions."
            imageSrc={images.nitr}
            imageAlt="National Institute of Technology"
            modalContent={
              <ModalContentComponent
                description="Summer research internship focusing on Machine Learning and Deep Learning"
                tasks={[
                  {
                    title: "Hybrid Imputation Research",
                    description:
                      "Developed a grid-tuned LSSVM + ensemble model for missing data imputation in industrial time series, achieving > 94% accuracy even with 80% data loss.",
                    color: "green",
                  },
                  {
                    title: "Algorithm Optimization",
                    description:
                      "Optimized kernel parameters via automated grid search and 3-fold cross-validation, cutting computation time by 40% while preserving temporal fidelity.",
                    color: "blue",
                  },
                  {
                    title: "Research Outcomes",
                    description:
                      "Delivered a scalable hybrid AI framework for restoring incomplete industrial sensor data—enhancing reliability in predictive maintenance, automation, and real-time analytics.",
                    color: "purple",
                  }
                ]}
                outcomes="Research paper accepted for presentation and publication at the 5th Indian IEOM Conference 2025, VIT Vellore, India (Nov 6–8, 2025)."
                technologies={[
                  { name: "Python", color: "blue" },
                  { name: "Scikit-learn", color: "orange" },
                  { name: "Pandas", color: "red" },
                  { name: "Matplotlib", color: "purple" },
                  { name: "NumPy", color: "gray" },
                ]}
                githubLink="https://drive.google.com/file/d/YOUR_DRIVE_FILE_ID/view?usp=sharing"
                linkLabel="View Certificate"
              />
            }
          />
        ),
      },
    ],
    []
  );

  return (
    <section id="experience" className=" bg-black mt-10">
      <Timeline data={data} />
    </section>
  );
});

Experience.displayName = "Experience";

export default Experience;
