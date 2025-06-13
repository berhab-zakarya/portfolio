"use client"
import { InfiniteMovingCards } from "../ui/infinite-moving-cards"
import type { Testimonial, Company } from "@/types/portfolio"
import Image from "next/image"
import { API_CONFIG } from "@/lib/constants"
import AnimatedSection from "@/components/animations/AnimatedSection"
import StaggeredItem from "@/components/animations/StaggeredItem"

interface ClientsProps {
  data: {
    testimonials: Testimonial[]
    companies: Company[]
  }
}

const Clients = ({ data }: ClientsProps) => {
  const { testimonials, companies } = data

  return (
    <section id="testimonials" className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      {/* Floating orbs for ambiance - responsive */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10">
        {/* Enhanced heading */}
        <AnimatedSection animation="slideLeft">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
              Kind words from
              <span className="block text-purple-400 mt-2">satisfied clients</span>
            </h1>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="flex flex-col items-center w-full">
          {/* Enhanced testimonials section */}
          <AnimatedSection animation="fadeIn" delay={0.3} className="w-full mb-12 sm:mb-16 lg:mb-20">
            <div className=" h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[30rem] flex flex-col antialiased items-center w-full justify-center relative overflow-hidden">
              <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
            </div>
          </AnimatedSection>

          {/* Enhanced companies section */}
          <div className="w-full">
            <AnimatedSection animation="slideRight">
              <div className="text-center mb-12 sm:mb-16">
                <h1 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                  Partnering with innovative
                  <span className="block text-purple-400 mt-2">Companies</span>
                </h1>
                <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
              </div>
            </AnimatedSection>

            {/* Companies grid with enhanced styling - responsive */}
            <AnimatedSection
              animation="stagger"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center justify-items-center"
            >
              {companies.map((company) => (
                <StaggeredItem
                  key={company.id}
                  className="group relative p-3 sm:p-4 lg:p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 w-full"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col items-center justify-center space-y-2 sm:space-y-3 min-h-[60px] sm:min-h-[70px] lg:min-h-[80px]">
                    {/* Company logo */}
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                      <Image
                        width={48}
                        height={48}
                        src={`${API_CONFIG.URL}${company.img}` || "/placeholder.svg"}
                        alt={company.name}
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>

                    {/* Company name */}
                    <div className="flex items-center justify-center h-6 sm:h-8 md:h-10">
                      <Image
                        src={`${API_CONFIG.URL}${company.name_img}` || "/placeholder.svg"}
                        alt={company.name}
                        width={120}
                        height={40}
                        className="max-w-[60px] sm:max-w-[80px] md:max-w-[100px] lg:max-w-[120px] h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>

                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
                </StaggeredItem>
              ))}
            </AnimatedSection>

            {/* Stats or additional info */}
            <AnimatedSection animation="fadeIn" delay={0.6}>
              <div className="mt-12 sm:mt-16 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>{companies.length}+ Partners</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300" />
                    <span>{testimonials.length}+ Reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700" />
                    <span>Global Reach</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients
