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
        containerRef.current.style.setProperty("--animation-duration", "15s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "30s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "60s")
      }
    }
  }
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden",
        // Enhanced blur mask - stronger blur from left and right edges
        "[mask-image:linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.3)_5%,white_15%,white_85%,rgba(255,255,255,0.3)_95%,transparent_100%)]",
        // Stronger side gradients for better blur effect
        "before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-black before:via-black/80 before:to-transparent",
        "after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-black after:via-black/80 after:to-transparent",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-6 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "w-[85vw] max-w-full relative rounded-2xl flex-shrink-0 md:w-[55vw] lg:w-[40vw]",
              "bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95",
              "border border-slate-700/60 backdrop-blur-lg",
              "p-6 md:p-8",
              "shadow-2xl shadow-black/40",
              "hover:shadow-3xl hover:shadow-purple-500/20 hover:border-purple-500/40",
              "transition-all duration-700 ease-out",
              "hover:scale-[1.03] hover:-translate-y-2",
              "group relative overflow-hidden"
            )}
            key={idx}
          >
            {/* Enhanced animated background gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/10 via-blue-600/8 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Stronger border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md -z-10" />
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
            
            <blockquote className="relative z-10">
              {/* Enhanced quote icon */}
              <div className="absolute -top-1 -left-1 text-5xl text-purple-400/40 font-serif leading-none select-none transition-colors duration-500 group-hover:text-purple-300/50">
                "
              </div>
              
              {/* Quote text with better typography */}
              <div className="relative pt-4">
                <span className={cn(
                  "relative z-20 block text-base md:text-lg leading-relaxed",
                  "text-slate-200 font-medium tracking-wide",
                  "group-hover:text-white transition-colors duration-500",
                  "selection:bg-purple-500/30"
                )}>
                  {item.quote}
                </span>
              </div>
              
              {/* Enhanced author section */}
              <div className="relative z-20 mt-6 flex flex-row items-center gap-4">
                {/* Simplified HD avatar */}
                <div className="relative flex-shrink-0">
                  <div className={cn(
                    "relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden",
                    "ring-2 ring-slate-600/50 group-hover:ring-purple-400/60",
                    "shadow-lg shadow-black/50",
                    "transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30"
                  )}>
                    <Image
                      src={item.avatar ? `${API_CONFIG.URL}${item.avatar}` : "/api/placeholder/56/56"}
                      alt={`${item.name}'s profile`}
                      width={56}
                      height={56}
                      className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                      priority={idx < 3}
                    />
                    
                    {/* Simple overlay for better contrast */}
                    <div className="absolute inset-0 ring-1 ring-black/20 rounded-full" />
                  </div>
                  
                  {/* Subtle pulse on hover */}
                  <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Enhanced author info */}
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span className={cn(
                    "text-lg md:text-xl font-bold leading-tight truncate",
                    "bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent",
                    "group-hover:from-purple-200 group-hover:via-white group-hover:to-cyan-200",
                    "transition-all duration-500"
                  )}>
                    {item.name}
                  </span>
                  
                  <span className={cn(
                    "text-sm md:text-base leading-tight font-medium truncate",
                    "text-slate-400 group-hover:text-slate-300",
                    "transition-colors duration-500"
                  )}>
                    {item.title}
                  </span>
                </div>
              </div>
              
              {/* Minimalist decorative elements */}
              <div className="absolute bottom-3 right-3 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 blur-sm" />
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
      
      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 12px));
          }
        }
        
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
        }
      `}</style>
    </div>
  )
}