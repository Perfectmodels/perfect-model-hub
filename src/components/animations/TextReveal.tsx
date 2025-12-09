import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  wordMode?: boolean; // If true, animates word by word instead of character by character
}

export function TextReveal({ text, className = "", delay = 0, wordMode = false }: TextRevealProps) {
  const words = text.split(" ");
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  if (wordMode) {
    return (
      <motion.div
        className={`inline-flex flex-wrap ${className}`}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {words.map((word, index) => (
          <motion.span variants={child} key={index} className="mr-[0.25em]">
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
