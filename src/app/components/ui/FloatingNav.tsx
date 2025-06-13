/* eslint-disable */

"use client";
import React, { JSX, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";


export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // Always set visible to true to make it always visible
  const [visible, setVisible] = useState(true);

  // Remove or comment out the scroll event listener since we want it always visible
  // useMotionValueEvent(scrollYProgress, "change", (current) => {
  //   // Check if current is not undefined and is a number
  //   if (typeof current === "number") {
  //     let direction = current! - scrollYProgress.getPrevious()!;

  //     if (scrollYProgress.get() < 0.05) {
  //       setVisible(false);
  //     } else {
  //       if (direction < 0) {
  //         setVisible(true);
  //       } else {
  //         setVisible(false);
  //       }
  //     }
  //   }
  // });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0, // Start at position 0 instead of -100
        }}
        animate={{
          y: 0, // Always at position 0
          opacity: 1, // Always fully visible
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: NavItem, idx: number) => (
          <a
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="text-sm !cursor-pointer">{navItem.name}</span>
          </a>
        ))}
        
        {/* Animated About Button */}
        <motion.a
          href="/about"
          className="relative overflow-hidden border text-sm font-medium border-green-400 dark:border-green-400 text-white px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-green-500/25 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Who ??</span>
          
          {/* Animated wave effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
          />
          
          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
          
          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700 ease-out" />
        </motion.a>

        <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};