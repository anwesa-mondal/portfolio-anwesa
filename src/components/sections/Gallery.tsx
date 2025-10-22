"use client";

import { memo, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { images } from "@/constants/images";
import ShinyText from "../ShinyText";
import { motion } from "framer-motion";

// Dynamic import for performance - only load when needed
const InfiniteMovingCards = dynamic(
  () =>
    import("@/components/ui/infinite-moving-cards").then((mod) => ({
      default: mod.InfiniteMovingCards,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500">Loading gallery...</div>
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
      MOMENTS OF INNOVATION
    </motion.div>
  ),
});

// Memoized items to prevent recreation on every render
const items = [
  {
    image: images.moi1,
    text: "Moments of Innovation",
  },
  {
    image: images.moi2,
    text: "Creative Journey",
  },
  {
    image: images.moi3,
    text: "Tech Adventures",
  },
  {
    image: images.moi4,
    text: "Learning Experiences",
  },
  {
    image: images.moi5,
    text: "Discovery Moments",
  },
  {
    image: images.moi6,
    text: "Innovation Sparks",
  },
  {
    image: images.moi7,
    text: "Creative Process",
  },
  {
    image: images.moi8,
    text: "Tech Exploration",
  },
  {
    image: images.moi9,
    text: "Breakthrough Moments",
  },
  {
    image: images.moi10,
    text: "Inspiring Journey",
  },
  {
    image: images.moi11,
    text: "Future Vision",
  },
];

const Gallery = memo(() => {
  // Memoize the items array to prevent recreation
  const memoizedItems = useMemo(() => items, []);
  const containerRef = useRef(null);

  return (
    <section id="gallery" className="mx-20">
      <div ref={containerRef} className="mb-10 mt-32 mx-20 relative">
        <VariableProximity
          label={"MOMENTS OF INNOVATION"}
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
      <ShinyText
        text="Explore a curated showcase of my creative journey where ideas spark and technology thrives."
        disabled={false}
        speed={3}
        className="mb-10 text-2xl mx-20"
      />
      <InfiniteMovingCards
        items={memoizedItems}
        direction="right"
        speed="slow"
      />
      <InfiniteMovingCards
        items={memoizedItems}
        direction="left"
        speed="slow"
      />
    </section>
  );
});

Gallery.displayName = "Gallery";

export default Gallery;
