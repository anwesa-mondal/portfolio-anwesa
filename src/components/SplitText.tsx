"use client";

import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = memo(
  ({
    text,
    className = "",
    delay = 100,
    duration = 0.6,
    ease = "power3.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    tag = "p",
    textAlign = "center",
    onLetterAnimationComplete,
  }) => {
    const ref = useRef<HTMLParagraphElement>(null);
    const animationCompletedRef = useRef(false);
    const splitInstanceRef = useRef<GSAPSplitText | null>(null);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(true); // Start as true for better performance

    // Optimized font loading check
    useEffect(() => {
      if (document.fonts.status === "loaded") {
        setFontsLoaded(true);
      } else {
        const timeout = setTimeout(() => setFontsLoaded(true), 100); // Fallback after 100ms
        document.fonts.ready.then(() => {
          clearTimeout(timeout);
          setFontsLoaded(true);
        });
        return () => clearTimeout(timeout);
      }
    }, []);

    useGSAP(
      () => {
        if (!ref.current || !text || !fontsLoaded) return;

        const el = ref.current as HTMLElement & {
          _rbsplitInstance?: GSAPSplitText;
        };

        // Improved cleanup
        if (splitInstanceRef.current) {
          try {
            splitInstanceRef.current.revert();
          } catch (_) {}
          splitInstanceRef.current = null;
        }

        // Clean up existing ScrollTriggers
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });

        const startPct = (1 - threshold) * 100;
        const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(
          rootMargin
        );
        const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
        const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
        const sign =
          marginValue === 0
            ? ""
            : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
        const start = `top ${startPct}%${sign}`;

        const splitInstance = new GSAPSplitText(el, {
          type: splitType,
          smartWrap: true,
          autoSplit: splitType === "lines",
          linesClass: "split-line",
          wordsClass: "split-word",
          charsClass: "split-char",
          reduceWhiteSpace: false,
        });

        let targets: Element[] = [];
        if (splitType.includes("chars") && splitInstance.chars?.length) {
          targets = splitInstance.chars;
        } else if (splitType.includes("words") && splitInstance.words.length) {
          targets = splitInstance.words;
        } else if (splitType.includes("lines") && splitInstance.lines.length) {
          targets = splitInstance.lines;
        } else {
          targets =
            splitInstance.chars || splitInstance.words || splitInstance.lines;
        }

        // Optimized animation with better performance settings
        gsap.fromTo(
          targets,
          { ...from },
          {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start,
              once: true,
              fastScrollEnd: true,
              anticipatePin: 0.4,
              preventOverlaps: true,
            },
            onComplete: () => {
              animationCompletedRef.current = true;
              onLetterAnimationComplete?.();
            },
            force3D: true,
            transformOrigin: "center center",
          }
        );

        splitInstanceRef.current = splitInstance;
        el._rbsplitInstance = splitInstance;

        return () => {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === el) st.kill();
          });
          try {
            splitInstance.revert();
          } catch (_) {}
          splitInstanceRef.current = null;
          el._rbsplitInstance = undefined;
        };
      },
      {
        dependencies: [text, fontsLoaded, onLetterAnimationComplete],
        scope: ref,
      }
    );

    const renderTag = useCallback(() => {
      const style: React.CSSProperties = {
        textAlign,
        wordWrap: "break-word",
      };
      const classes = `split-parent overflow-hidden inline-block whitespace-normal ${className}`;

      const element = (() => {
        switch (tag) {
          case "h1":
            return (
              <h1 ref={ref} style={style} className={classes}>
                {text}
              </h1>
            );
          case "h2":
            return (
              <h2 ref={ref} style={style} className={classes}>
                {text}
              </h2>
            );
          case "h3":
            return (
              <h3 ref={ref} style={style} className={classes}>
                {text}
              </h3>
            );
          case "h4":
            return (
              <h4 ref={ref} style={style} className={classes}>
                {text}
              </h4>
            );
          case "h5":
            return (
              <h5 ref={ref} style={style} className={classes}>
                {text}
              </h5>
            );
          case "h6":
            return (
              <h6 ref={ref} style={style} className={classes}>
                {text}
              </h6>
            );
          default:
            return (
              <p ref={ref} style={style} className={classes}>
                {text}
              </p>
            );
        }
      })();

      return element;
    }, [text, className, tag, textAlign]);

    return renderTag();
  }
);

SplitText.displayName = "SplitText";

export default SplitText;
