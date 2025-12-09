import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  speed?: number; // Speed of parallax, default 0.5
}

export function ParallaxImage({ src, alt = "", className = "", speed = 0.5 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -top-[10%] relative">
         <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
