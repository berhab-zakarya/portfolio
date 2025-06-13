"use client"

import { useState } from "react"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"
import { PinContainer } from "../ui/3d-pin"
import type { Project } from "@/types/portfolio"
import Image from "next/image"
import { API_CONFIG } from "@/lib/constants"
import AnimatedSection from "@/components/animations/AnimatedSection"
import StaggeredItem from "@/components/animations/StaggeredItem"
import ProjectModal from "./project-modal"

interface RecentProjectProps {
  data: Project[]
}

const RecentProjects = ({ data }: RecentProjectProps) => {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleImageError = (projectId: string) => {
    setImageErrors((prev) => new Set([...prev, projectId]))
  }

  const openProjectModal = (project: Project) => {
    console.log("Opening modal with project:", project) // Add this for debugging
    setSelectedProject(project)
    setIsModalOpen(true)
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeProjectModal = () => {
    console.log("Closing modal") // Add this for debugging
    setSelectedProject(null)
    setIsModalOpen(false)
    // Restore body scroll when modal is closed
    document.body.style.overflow = "auto"
  }

  const renderTechStack = (iconLists: string[], maxVisible = 4) => {
    if (!iconLists || iconLists.length === 0) {
      return (
        <div className="flex items-center">
          <div className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50">
            <span className="text-xs text-gray-400">No tech stack specified</span>
          </div>
        </div>
      )
    }

    const visibleIcons = iconLists.slice(0, maxVisible)
    const remainingCount = iconLists.length - maxVisible

    return (
      <div className="flex items-center">
        {visibleIcons.map((icon, index) => (
          <div
            key={index}
            className="border border-white/[.15] rounded-full bg-black/80 backdrop-blur-sm lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center transition-all duration-300 hover:border-purple-400/50 hover:scale-110 hover:bg-purple-900/20"
            style={{
              transform: `translateX(-${5 * index + 2}px)`,
              zIndex: visibleIcons.length - index,
            }}
            title={`Technology ${index + 1}`}
          >
            <Image
              src={icon || "/placeholder.svg"}
              alt={`tech-${index}`}
              fill
              className="p-2 object-contain"
              sizes="(max-width: 640px) 2rem, 2.5rem"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg"
              }}
            />
          </div>
        ))}

        {remainingCount > 0 && (
          <div
            className="border border-white/[.15] rounded-full bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center ml-2"
            title={`+${remainingCount} more technologies`}
          >
            <span className="text-xs font-medium text-purple-300">+{remainingCount}</span>
          </div>
        )}
      </div>
    )
  }

  const renderProjectActions = (item: Project) => {
    const hasLink = item.link && item.link.trim() !== ""

    if (!hasLink) {
      return (
        <div className="flex justify-center items-center group cursor-pointer transition-all duration-300 hover:scale-105">
          <FaGithub className="mr-2 text-gray-400 group-hover:text-white transition-colors" size={16} />
          <p className="flex lg:text-sm md:text-xs text-xs text-gray-400 group-hover:text-white transition-colors">
            View on GitHub
          </p>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center group cursor-pointer transition-all duration-300 hover:scale-105">
          <FaGithub className="mr-2 text-gray-400 group-hover:text-white transition-colors" size={14} />
          <p className="text-xs text-gray-400 group-hover:text-white transition-colors">Code</p>
        </div>

        <div className="w-px h-4 bg-gray-600"></div>

        <div className="flex justify-center items-center group cursor-pointer transition-all duration-300 hover:scale-105">
          <p className="flex lg:text-sm md:text-xs text-xs text-purple-300 group-hover:text-purple-200 transition-colors font-medium">
            Live Demo
          </p>
          <FaExternalLinkAlt className="ml-2 text-purple-400 group-hover:text-purple-300 transition-colors" size={12} />
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-20" id="projects">
        <AnimatedSection animation="fadeIn">
          <div className="text-center mb-16">
            <h1 className="heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
              A small selection of <span className="block text-purple-400 mt-2">My Projects</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>
        <AnimatedSection animation="scaleIn" delay={0.3}>
          <div className="flex items-center justify-center mt-16">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-gray-700/50 flex items-center justify-center">
                <FaGithub className="text-gray-500" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No Projects Yet</h3>
              <p className="text-gray-500 max-w-md">
                Projects will appear here once they&apos;re added to the portfolio. Check back soon!
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    )
  }

  return (
    <div className="py-20" id="projects">
      <AnimatedSection animation="slideRight">
        <div className="text-center mb-16">
          <h1 className="heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            A small selection of <span className="block text-purple-400 mt-2">My Projects</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>
      </AnimatedSection>

      <AnimatedSection
        animation="stagger"
        className="flex flex-wrap items-center justify-center p-4 gap-8 lg:gap-16 mt-10"
      >
        {data.map((item) => (
          <StaggeredItem
            key={item.id}
            className="lg:min-h-[40rem] h-[35rem] flex items-center justify-center sm:w-[28rem] w-[90vw]"
          >
            <div className="cursor-pointer">
              <PinContainer
                onClick={() => {
                  console.log("Opening modal for:", item.title) // Add this for debugging
                  openProjectModal(item)
                }}
                title={item.link ? "View Project Details" : "View Project Details"}
                className="transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Enhanced Image Container */}
                <div
                  className="relative flex items-center justify-center sm:w-[28rem] w-[90vw] overflow-hidden h-[25vh] lg:h-[35vh] group"
                  onClick={() => openProjectModal(item)}
                >
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl rounded-2xl shadow-2xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <Image
                      src="/bg.png"
                      alt="background"
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:rounded-3xl rounded-2xl" />
                  </div>

                  {!imageErrors.has(String(item.id)) ? (
                    <Image
                      src={`${API_CONFIG.URL}${item.img}`}
                      alt={item.title}
                      width={450}
                      height={180}
                      className="z-10 absolute top-0 left-0 w-full h-full lg:rounded-3xl rounded-2xl transition-all duration-700 group-hover:scale-105 mb-8"
                      style={{ objectFit: "contain" }}
                      priority
                      onError={() => handleImageError(String(item.id))}
                    />
                  ) : (
                    <div className="z-10 absolute top-0 left-0 w-full h-full lg:rounded-3xl rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-700/50 flex items-center justify-center">
                          <FaGithub className="text-gray-400" size={24} />
                        </div>
                        <p className="text-gray-400 text-sm font-medium">{item.title}</p>
                      </div>
                    </div>
                  )}

                  {/* Project Status Badge */}
                  {item.link && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                        <span className="text-xs font-medium text-green-300">Live</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Content */}
                <div className="space-y-4">
                  <h1 className="font-bold lg:text-2xl md:text-xl text-lg line-clamp-1 text-white group-hover:text-blue-300 transition-colors duration-300">
                    {item.title}
                  </h1>

                  <p className="lg:text-base md:text-sm text-sm line-clamp-3 leading-relaxed text-gray-300">
                    {item.des || "No description available for this project."}
                  </p>

                  {/* Enhanced Tech Stack & Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    {renderTechStack(item.iconLists)}
                    {renderProjectActions(item)}
                  </div>
                </div>
              </PinContainer>
            </div>
          </StaggeredItem>
        ))}
      </AnimatedSection>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />

      {/* Footer CTA */}
      <AnimatedSection animation="fadeIn" delay={0.5}>
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Want to see more of my work?</p>
          <a
            href="https://github.com/berhab-zakarya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group"
          >
            <FaGithub className="mr-2 group-hover:text-white transition-colors" />
            <span className="text-purple-300 group-hover:text-white transition-colors font-medium">
              View All Projects
            </span>
          </a>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default RecentProjects
