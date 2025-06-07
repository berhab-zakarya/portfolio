"use client"

import { FaLocationArrow } from "react-icons/fa6"
import { PinContainer } from "../ui/3d-pin"
import type { Project } from "@/types/portfolio"
import Image from "next/image"
import { API_CONFIG } from "@/lib/constants"

interface RecentProjectProps {
  data: Project[]
}

const RecentProjects = ({ data }: RecentProjectProps) => {
  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of <span className="text-blue-300">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {data.map((item) => (
          <div className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]" key={item.id}>
            <PinContainer title="/berhab-zakarya" href={item.link || "https://github.com/berhab-zakarya"}>
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image
                  src="/bg.png"
                  alt="bgimg"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  />
                </div>
                <Image
                  src={`${API_CONFIG.URL}${item.img}` || "/placeholder.svg"}
                  alt="cover"
                  
                  width={380}
                  height={180}
                  className="z-10 absolute top-0 left-0 w-full h-full lg:rounded-3xl"
                  style={{ objectFit: "contain" }}
                  priority
                />
                </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">{item.title}</h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: "#BEC1DD",
                  margin: "1vh 0",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {/* {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon || "/placeholder.svg"} alt="icon5" className="p-2" />
                    </div>
                  ))} */}
                </div>

              { item.link && (
                  <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">Check Live Site</p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>)}
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentProjects
