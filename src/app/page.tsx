"use client"
import Hero from "./components/sections/Hero"
import { FloatingNav } from "./components/ui/FloatingNav"
import { navItems } from "@/data"
import Grid from "./components/sections/Grid"
import RecentProject from "./components/sections/RecentProject"
import Clients from "./components/sections/Clients"
import Experience from "./components/sections/Experience"
import Process from "./components/sections/Process"
import Footer from "./components/sections/Footer"

// Import all the necessary hooks
import { useHero } from "@/hooks/use-hero"
import { useGridItems } from "@/hooks/use-grid-items"
import { useProjects } from "@/hooks/use-projects"
import { useTestimonials } from "@/hooks/use-testimonials"
import { useCompanies } from "@/hooks/use-companies"
import { useWorkExperience } from "@/hooks/use-work-experience"
import { useSocialMedia } from "@/hooks/use-social-media"
import LoadingComponent from "@/components/LoadingComponent"

const Home = () => {
  // Use all the data fetching hooks
  const { data: heroData, loading: heroLoading, error: heroError } = useHero()
  const { data: gridItemsData, loading: gridItemsLoading, error: gridItemsError } = useGridItems()
  const { data: projectsData, loading: projectsLoading, error: projectsError } = useProjects()
  const { data: testimonialsData, loading: testimonialsLoading, error: testimonialsError } = useTestimonials()
  const { data: companiesData, loading: companiesLoading, error: companiesError } = useCompanies()
  const { data: workExperienceData, loading: workExperienceLoading, error: workExperienceError } = useWorkExperience()
  const { data: socialMediaData, loading: socialMediaLoading, error: socialMediaError } = useSocialMedia()

  // Combine all loading states
  const isLoading =
    heroLoading ||
    gridItemsLoading ||
    projectsLoading ||
    testimonialsLoading ||
    companiesLoading ||
    workExperienceLoading ||
    socialMediaLoading

  // Combine all error states
  const hasError =
    heroError ||
    gridItemsError ||
    projectsError ||
    testimonialsError ||
    companiesError ||
    workExperienceError ||
    socialMediaError

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black-100">
        <div className="text-center justify-center items-center flex flex-col">
          <LoadingComponent />
          <p className="mt-4 text-white-200">Loading portfolio ...</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black-100">
        <div className="text-center text-red-500 p-8 max-w-md mx-auto bg-black-200 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Error Loading Data</h2>
          <p>There was a problem loading the portfolio data. Please try refreshing the page.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col  overflow-clip --font-alumni">
      <div className="w-full">
        <FloatingNav navItems={navItems} />
        <Hero data={heroData} />
        <Grid data={gridItemsData} />
        <RecentProject data={projectsData} />
        <Clients data={{ testimonials: testimonialsData, companies: companiesData }} />
        <Experience data={workExperienceData} />
        <Process />
        <Footer data={socialMediaData} />
      </div>
    </main>
  )
}

export default Home
