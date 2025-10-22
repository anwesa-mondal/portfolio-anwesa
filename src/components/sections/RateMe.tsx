"use client";
import { images } from "@/constants/images";
import Image from "next/image";
import { motion } from "framer-motion";
import GradientText from "../GradientText";
import ElasticSlider from "../ElasticSlider";

export default function RateMe() {
  return (
    <section
      id="rate-me"
      className="mx-40 mt-28 p-8 relative flex flex-col bg-violet-500/70 rounded-4xl items-center justify-center"
    >
      {/* <div className="mb-12 relative z-10">
        <GradientText
          colors={["#3b82f6", "#ffffff", "#8b5cf6", "#ffffff", "#3b82f6"]}
          animationSpeed={4}
          showBorder={false}
          className="text-6xl font-bold drop-shadow-xl"
        >
          RATE ME
        </GradientText>
      </div> */}
      <div className="w-full relative mb-12 text-center text-xl font-bold mt-10">
        If you liked what you saw, why not rate me on a scale of 1 to 10? :)
      </div>
      <ElasticSlider
        defaultValue={10}
        maxValue={10}
        startingValue={0}
        rightIcon={<span className="text-yellow-300 text-2xl">★★★★★</span>}
        leftIcon={<span className="text-gray-400 text-2xl">☆☆☆☆☆</span>}
        className="w-full mb-10"
      />
      <Image
        src={images.bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10"
      />
    </section>
  );
}
