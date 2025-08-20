"use client"
import { motion } from "framer-motion";

export default function StaggeredList({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = {
    hidden: { opacity: 1, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  };
  return (
    <>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-4"
      >
        {children}
      </motion.ul>
    </>
  );
}
