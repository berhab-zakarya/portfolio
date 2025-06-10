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
    <section id="testimonials" className="py-20 px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      {/* Floating orbs for ambiance */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Enhanced heading */}
        <AnimatedSection animation="slideLeft">
          <div className="text-center mb-16">
            <h1 className="heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
              Kind words from
              <span className="block text-purple-400 mt-2">satisfied clients</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        <div className="flex flex-col items-center w-full">
          {/* Enhanced testimonials section */}
          <AnimatedSection animation="fadeIn" delay={0.3} className="w-full mb-20">
            <div className="h-[50vh] md:h-[30rem] flex flex-col antialiased items-center w-full justify-center relative overflow-hidden">
              <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
            </div>
          </AnimatedSection>

          {/* Enhanced companies section */}
          <div className="w-full">
            <AnimatedSection animation="slideRight">
              <div className="text-center mb-16">
                <h1 className="heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                  Partnering with innovative
                  <span className="block text-purple-400 mt-2">Companies</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
              </div>
            </AnimatedSection>

            {/* Companies grid with enhanced styling */}
            <AnimatedSection
              animation="stagger"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center justify-items-center"
            >
              {companies.map((company, index) => (
                <StaggeredItem
                  key={company.id}
                  className="group relative p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col items-center justify-center space-y-3 min-h-[80px]">
                    {/* Company logo */}
                    <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                      <Image
                        width={48}
                        height={48}
                        src={`${API_CONFIG.URL}${company.img}` || "/placeholder.svg"}
                        alt={company.name}
                        className="w-8 h-8 md:w-10 md:h-10 object-contain filter group-hover:brightness-110 transition-all duration-300"
                      />
                    </div>

                    {/* Company name */}
                    <div className="flex items-center justify-center h-8 md:h-10">
                      <Image
                        src={`${API_CONFIG.URL}${company.name_img}` || "/placeholder.svg"}
                        alt={company.name}
                        width={120}
                        height={40}
                        className="max-w-[100px] md:max-w-[120px] h-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
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
              <div className="mt-16 text-center">
                <div className="inline-flex items-center space-x-8 text-sm text-gray-400">
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
