"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import type { Project } from "@/types/portfolio"
import { API_CONFIG } from "@/lib/constants"

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const [imageError, setImageError] = useState(false)

  // Reset image error state when project changes
  useEffect(() => {
    setImageError(false)
  }, [project])

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>

              {/* Project image */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
                {!imageError ? (
                  <Image
                    src={`${API_CONFIG.URL}${project.img}`}
                    alt={project.title}
                    fill
                    className="object-contain"
                    priority
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800/80 flex items-center justify-center">
                        <FaGithub className="text-gray-400" size={32} />
                      </div>
                      <p className="text-gray-300 font-medium">{project.title}</p>
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h2>

                  <div className="flex items-center gap-4">
                    <a
                      href={`https://github.com/berhab-zakarya/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 transition-colors"
                    >
                      <FaGithub size={16} className="text-gray-300" />
                      <span className="text-sm font-medium text-gray-300">GitHub</span>
                    </a>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/40 hover:to-blue-600/40 border border-purple-500/30 transition-colors"
                      >
                        <span className="text-sm font-medium text-purple-300">Live Demo</span>
                        <FaExternalLinkAlt size={12} className="text-purple-300" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mb-6">
                  <h3 className="text-sm uppercase text-gray-400 mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.iconLists && project.iconLists.length > 0 ? (
                      project.iconLists.map((icon, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/80 border border-gray-700/50"
                        >
                          <div className="relative w-4 h-4">
                            <Image
                              src={icon || "/placeholder.svg"}
                              alt={`tech-${index}`}
                              fill
                              className="object-contain"
                              sizes="1rem"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg"
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-300">Tech {index + 1}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-1.5 rounded-full bg-gray-800/80 border border-gray-700/50">
                        <span className="text-xs text-gray-400">No tech stack specified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm uppercase text-gray-400 mb-3">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.des || "No description available for this project."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
