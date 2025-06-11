import Image from "next/image"
import { Button } from "../ui/moving-border"
import type { WorkExperience } from "@/types/portfolio"
import AnimatedSection from "@/components/animations/AnimatedSection"
import StaggeredItem from "@/components/animations/StaggeredItem"

interface ExperienceProps {
  data: WorkExperience[]
}

export const workExperience = [
  {
    id: 1,
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
]

const Experience = ({ data }: ExperienceProps) => {
  const mergedData = data.map((item) => {
    const mockItem = workExperience.find((mock) => mock.id === item.id)
    return {
      ...item,
      thumbnail: mockItem ? mockItem.thumbnail : "/placeholder.svg",
      className: mockItem ? mockItem.className : "md:col-span-2",
    }
  })

  return (
    <div className="py-10 sm:py-16 lg:py-20 w-full px-4 sm:px-6 lg:px-8">
      <AnimatedSection animation="slideLeft">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            My Work
            <span className="block text-purple-400 mt-2">Experience</span>
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>
      </AnimatedSection>

      <AnimatedSection
        animation="stagger"
        className="w-full mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
      >
        {mergedData.map((card) => (
          <StaggeredItem key={card.id} className="w-full">
            <Button
              duration={Math.floor(Math.random() * 10000) + 10000}
              borderRadius="1.75rem"
              style={{
                background: "rgb(4,7,29)",
                backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                borderRadius: `calc(1.75rem* 0.96)`,
              }}
              className="w-full h-full text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <div className="flex flex-col sm:flex-col lg:flex-row lg:items-center p-4 sm:p-5 lg:p-6 xl:p-10 gap-3 sm:gap-4 lg:gap-2 min-h-[200px] sm:min-h-[220px] lg:min-h-[180px]">
                <div className="flex justify-center lg:justify-start flex-shrink-0">
                  <Image
                    width={128}
                    height={64}
                    src={card.thumbnail || "/placeholder.svg"}
                    alt={card.title}
                    className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto object-contain"
                  />
                </div>
                <div className="text-center lg:text-left lg:ms-3 xl:ms-5 flex-1">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-tight">{card.title}</h1>
                  <p className="text-white-100 text-sm sm:text-base font-semibold leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </Button>
          </StaggeredItem>
        ))}
      </AnimatedSection>
    </div>
  )
}

export default Experience
