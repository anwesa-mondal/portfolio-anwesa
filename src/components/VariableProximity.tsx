import {
  forwardRef,
  useRef,
  CSSProperties,
  HTMLAttributes,
  MutableRefObject,
  memo,
} from "react";
import { motion } from "motion/react";

interface VariableProximityProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: MutableRefObject<HTMLElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const VariableProximity = memo(
  forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
    const {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className = "",
      onClick,
      style,
      ...restProps
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const words = label.split(" ");
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        onClick={onClick}
        style={{
          display: "inline",
          fontFamily: "var(--font-roboto-flex), sans-serif",
          ...style,
        }}
        className={className}
        {...restProps}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++;
              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el) => {
                    letterRefs.current[currentLetterIndex] = el;
                  }}
                  style={{
                    display: "inline-block",
                    fontVariationSettings: fromFontVariationSettings,
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  })
);

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
