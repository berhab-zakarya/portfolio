"use client"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeIn" | "slideLeft" | "slideRight" | "scaleIn" | "stagger"
  delay?: number
  threshold?: number
}

const AnimatedSection = ({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const { ref, controls } = useScrollAnimation(threshold)

  const getVariants = () => {
    switch (animation) {
      case "slideLeft":
        return {
          hidden: { opacity: 0, x: -100 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay,
            },
          },
        }
      case "slideRight":
        return {
          hidden: { opacity: 0, x: 100 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay,
            },
          },
        }
      case "scaleIn":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay,
            },
          },
        }
      case "stagger":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1 + delay,
            },
          },
        }
      default: // fadeIn
        return {
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay,
            },
          },
        }
    }
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={getVariants()} className={className}>
      {children}
    </motion.div>
  )
}

export default AnimatedSection
