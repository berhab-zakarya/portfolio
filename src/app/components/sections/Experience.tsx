import Image from "next/image"
import { Button } from "../ui/moving-border"
import type { WorkExperience } from "@/types/portfolio"

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
 
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
  
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
 
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

const Experience = ({ data }: ExperienceProps) => {
  const mergedData = data.map((item) => {
  const mockItem = workExperience.find((mock) => mock.id === item.id);
  return {
    ...item,
    thumbnail: mockItem ? mockItem.thumbnail : "/placeholder.svg",
    className: mockItem ? mockItem.className : "md:col-span-2",
  };
});
  return (
    <div className="py-20 w-full px-8">
      <div className="text-center mb-16">
          <h1 className="heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            My Work 
            <span className="block text-purple-400 mt-2">Experience</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {mergedData.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image width={128} height={64} src={card.thumbnail}
              alt={card.thumbnail} className="lg:w-32 md:w-20 w-16" />
              <div className="lg:ms-5">
                <h1 className="text-start text-xl md:text-2xl font-bold">{card.title}</h1>
                <p className="text-start text-white-100 mt-3 font-semibold">{card.desc}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Experience
