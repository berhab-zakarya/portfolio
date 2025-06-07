"use client"

import React from "react"
import { InfiniteMovingCards } from "../ui/infinite-moving-cards"
import type { Testimonial, Company } from "@/types/portfolio"
import Image from "next/image"
import { API_CONFIG } from "@/lib/constants"

interface ClientsProps {
  data: {
    testimonials: Testimonial[]
    companies: Company[]
  }
}

const Clients = ({ data }: ClientsProps) => {
  const { testimonials, companies } = data

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10">
          {companies.map((company) => (
            <React.Fragment key={company.id}>
              <div className="flex md:max-w-60 max-w-32 gap-2">
                <Image width={60} height={30} src={`${API_CONFIG.URL}${company.img}` || "/placeholder.svg"} alt={company.name} className="md:w-12 w-5" />
                <Image
                  src={`${API_CONFIG.URL}${company.name_img}` || "/placeholder.svg"}
                  alt={company.name}
                  width={company.id === 4 || company.id === 5 ? 100 : 150}
                  height={company.id === 4 || company.id === 5 ? 50 : 75}
                  className="md:w-24 w-20"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients
