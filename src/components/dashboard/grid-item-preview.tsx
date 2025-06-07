"use client"

import type { GridItem } from "@/types/portfolio"
import Image from "next/image"

interface GridItemPreviewProps {
  item: GridItem
  fullSize?: boolean
}

export function GridItemPreview({ item, fullSize = false }: GridItemPreviewProps) {
  return (
    <div
      className={`
        relative rounded-lg border bg-card text-card-foreground overflow-hidden
        ${fullSize ? "min-h-[200px]" : "h-32"}
        ${item.class_name.includes("min-h-[60vh]") && fullSize ? "min-h-[300px]" : ""}
      `}
    >
      {/* Background Images */}
      {item.img && (
        <div className={item.imgClassName || "w-full h-full"}>
          <Image
            src={item.img}
            alt="Main"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {item.spareImg && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={item.spareImg}
            alt="Spare"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority={false}
          />
        </div>
      )}
      <div className={`absolute inset-0 p-4 flex flex-col ${item.titleClassName}`}>
        <div className="flex-1" />

        <div className="space-y-2">
          {item.title && (
            <h3 className={`font-semibold text-white drop-shadow-lg ${fullSize ? "text-lg" : "text-sm"}`}>
              {item.title}
            </h3>
          )}

          {item.description && (
            <p className={`text-white/90 drop-shadow ${fullSize ? "text-sm" : "text-xs"}`}>{item.description}</p>
          )}
        </div>
      </div>

      {/* Grid Info Badge */}
      <div className="absolute top-2 right-2">
        <div className="bg-black/50 text-white text-xs px-2 py-1 rounded">
          {item.class_name
            .split(" ")
            .find((cls) => cls.includes("col-span"))
            ?.replace("lg:", "")
            .replace("md:", "") || "Custom"}
        </div>
      </div>
    </div>
  )
}
