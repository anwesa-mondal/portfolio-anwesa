"use client";

import React, { ReactNode } from "react";

interface BackgroundGradientProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  borderRadius?: string;
  padding?: string;
}

export default function BackgroundGradient({
  children,
  className = "",
  colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
  animationSpeed = 8,
  borderRadius = "1rem",
  padding = "2rem",
}: BackgroundGradientProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(-45deg, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(-45deg, ${colors.join(", ")})`,
        backgroundSize: "400% 400%",
        animation: `gradient-shift ${animationSpeed}s ease infinite`,
      }}
    >
      <div
        className="relative z-10"
        style={{
          padding: padding,
          borderRadius: borderRadius,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
