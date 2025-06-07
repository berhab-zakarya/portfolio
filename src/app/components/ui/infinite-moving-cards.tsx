/* eslint-disable */

"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import type { Testimonial } from "@/types/portfolio"
import Image from "next/image"
import { API_CONFIG } from "@/lib/constants"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Testimonial[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])
  
  const [start, setStart] = useState(false)
  
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }
  
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "25s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "45s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "90s")
      }
    }
  }
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        "before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-black/20 before:to-transparent",
        "after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-black/20 after:to-transparent",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-6 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "w-[85vw] max-w-full relative rounded-3xl flex-shrink-0 md:w-[55vw] lg:w-[45vw]",
              "bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90",
              "border border-slate-700/50 backdrop-blur-sm",
              "p-6 md:p-8 lg:p-10",
              "shadow-2xl shadow-black/25",
              "hover:shadow-3xl hover:shadow-purple-500/10 hover:border-purple-500/30",
              "transition-all duration-500 ease-out",
              "hover:scale-[1.02] hover:-translate-y-1",
              "group"
            )}
            key={idx}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
            
            <blockquote className="relative z-10">
              {/* Quote icon */}
              <div className="absolute -top-2 -left-2 text-4xl text-purple-400/30 font-serif leading-none select-none">
                "
              </div>
              
              {/* Quote text */}
              <div className="relative">
                <span className={cn(
                  "relative z-20 block text-base md:text-lg lg:text-xl leading-relaxed",
                  "text-slate-100 font-medium tracking-wide",
                  "group-hover:text-white transition-colors duration-300"
                )}>
                  {item.quote}
                </span>
              </div>
              
              {/* Author section */}
              <div className="relative z-20 mt-8 flex flex-row items-center gap-4">
                {/* Enhanced profile image */}
                <div className="relative">
                  <div className={cn(
                    "flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full",
                    "bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 p-0.5",
                    "shadow-lg shadow-purple-500/25",
                    "group-hover:shadow-xl group-hover:shadow-purple-500/40",
                    "transition-all duration-300 group-hover:scale-110"
                  )}>
                    <div className="flex h-full w-full items-center justify-center rounded-full overflow-hidden bg-slate-800 ring-2 ring-slate-700/50">
                      <Image
                        src={item.avatar ? `${API_CONFIG.URL}${item.avatar}` : "/profile.svg"}
                        alt={`${item.name}'s profile`}
                        width={56}
                        height={56}
                        className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  {/* Pulse animation on hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/50 to-cyan-500/50 animate-pulse opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                
                {/* Author info */}
                <div className="flex flex-col gap-1">
                  <span className={cn(
                    "text-lg md:text-xl font-bold leading-tight",
                    "bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent",
                    "group-hover:from-purple-200 group-hover:via-white group-hover:to-cyan-200",
                    "transition-all duration-300"
                  )}>
                    {item.name}
                  </span>
                  
                  <span className={cn(
                    "text-sm md:text-base leading-tight font-medium",
                    "text-slate-400 group-hover:text-slate-300",
                    "transition-colors duration-300"
                  )}>
                    {item.title}
                  </span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 blur-sm" />
              </div>
              
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-15 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-md" />
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}