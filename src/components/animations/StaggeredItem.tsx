"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggeredItemProps {
  children: ReactNode
  className?: string
}

const StaggeredItem = ({ children, className = "" }: StaggeredItemProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}

export default StaggeredItem
