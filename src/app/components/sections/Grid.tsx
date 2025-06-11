import { BentoGrid, BentoGridItem } from "../ui/bento-grid"
import type { GridItem } from "@/types/portfolio"
import AnimatedSection from "@/components/animations/AnimatedSection"

// Static grid items configuration
const gridItems: Partial<GridItem>[] = [
  {
    id: 1,
    class_name: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    class_name: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    class_name: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    class_name: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    class_name: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    class_name: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
]

interface GridProps {
  data: GridItem[]
}

const Grid = ({ data }: GridProps) => {
  // Merge static gridItems with API data just before return
  const mergedData: GridItem[] = gridItems.map((staticItem) => {
    const apiItem = data.find((item) => item.id === staticItem.id)
    return {
      id: staticItem.id!,
      title: apiItem?.title || "Default Title",
      description: apiItem?.description || "Default Description",
      class_name: staticItem.class_name || "",
      imgClassName: staticItem.imgClassName || "",
      titleClassName: staticItem.titleClassName || "",
      img: staticItem.img || "",
      spareImg: staticItem.spareImg || "",
    }
  })

  return (
    <section id="about">
      <AnimatedSection animation="slideLeft" className="w-full pb-20 px-8">
        <BentoGrid className="w-full">
          {mergedData.map((item) => (
            <BentoGridItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              className={item.class_name}
              img={item.img}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </AnimatedSection>
    </section>
  )
}

export default Grid
