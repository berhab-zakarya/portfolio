/* eslint-disable */

"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Testimonial } from "@/types/portfolio"
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
  const [start, setStart] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)

  // eslint-disable-next-line react-hooks/e
  useEffect(() => {
    addAnimation()
  }, [ ])

  const addAnimation = () => {
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
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  const truncateText = (text: string, maxLength = 140) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const closeModal = () => {
    setSelectedTestimonial(null)
  }

  // Helper function to get the correct avatar URL
  const getAvatarUrl = (avatar: string | null | undefined) => {
    if (!avatar) return "/avatars.svg"
    // Check if avatar already includes the full URL
    if (avatar.startsWith('http')) return avatar
    // Construct the full URL
    return `${API_CONFIG.URL}${avatar.startsWith('/') ? avatar : `/${avatar}`}`
  }

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-[1600px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] --font-poppins",
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
            <motion.li
              key={idx}
              whileHover={{ 
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="w-[90vw] max-w-full relative rounded-3xl border border-slate-700/30 flex-shrink-0 px-8 py-8 md:w-[65vw] lg:w-[480px] group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 50%, rgba(15, 23, 42, 0.9) 100%)",
              }}
              onClick={() => setSelectedTestimonial(item)}
            >
              {/* Animated border gradient */}
               <div key={`review-${item.id}`} className="client-review">
            <div>
              <p onClick={() => setSelectedTestimonial(item)} className="text-white-800 font-light font-poppins">
                {truncateText(item.quote, 140)}
              </p>
                {item.quote.length > 140 && (
                  <div onClick={() => setSelectedTestimonial(item)} className="mt-4">
                    <span onClick={() => setSelectedTestimonial(item)} className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors duration-200 font-poppins flex items-center gap-1 ">
                      Read full testimonial
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                )}

              <div className="client-content mt-4">
                <div className="flex mt-4 gap-3">
                  <img onClick={() => setSelectedTestimonial(item)} src={getAvatarUrl(item.avatar)} alt="reviewer" className="w-12 h-12 rounded-full" />
                  <div className="flex flex-col">
                    <p className="font-semibold text-white-800">{item.name}</p>
                    <p className="text-white-500 md:text-base text-sm font-light">{item.title}</p>
                  </div>
                </div>

                {/* <div className="mt-4 flex self-end items-center gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img key={index} src="/star.png" alt="star" className="w-5 h-5" />
                  ))}
                </div> */}
              </div>
            </div>
          </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Enhanced Glassmorphism Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 font-['var(--font-poppins)']"
            onClick={closeModal}
          >
            {/* Enhanced backdrop with blur */}
            <motion.div 
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/60" 
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full max-w-3xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-slate-700/40 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Quote icon */}
                <div className="mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                    </svg>
                  </div>
                </div>

                {/* Full quote with enhanced typography */}
                <blockquote className="mb-10 relative z-10">
                  <p className="text-xl leading-relaxed text-gray-100 font-normal --font-poppins font-['var(--font-poppins)'] ">
                    {selectedTestimonial.quote}
                  </p>
                </blockquote>

                {/* Author info with enhanced design */}
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 p-[2px] flex-shrink-0">
                    <div className="w-full h-full rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden">
                       <img src={getAvatarUrl(selectedTestimonial.avatar)} alt="reviewer" className="w-12 h-12 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-xl mb-1">
                      {selectedTestimonial.name}
                    </h4>
                    <p className="text-gray-400 text-base --font-poppins font-['var(--font-poppins)']">
                      {selectedTestimonial.title}
                    </p>
                  </div>
                </div>

                {/* Enhanced border gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 p-[1px] opacity-60">
                  <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-slate-900/0 to-slate-800/0" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite var(--animation-direction);
        }
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 1rem));
          }
        }
      `}</style>
    </>
  )
}