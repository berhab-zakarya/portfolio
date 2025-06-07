export interface GridItem {
  id: number
  title: string
  description: string
  class_name: string
  imgClassName: string
  titleClassName: string
  img: string
  spareImg: string
}

export interface Project {
  id: number
  title: string
  des: string
  img: string
  iconLists: string[]
  link: string
}

export interface Testimonial {
  id?: number
  quote: string
  name: string
  title: string
  avatar?:string;
}

export interface Company {
  id: number
  name: string
  img: string
  name_img: string
}

export interface WorkExperience {
  id: number
  title: string
  desc: string
  className: string
  thumbnail: string
}

export interface SocialMedia {
  id: number
  img: string
  link: string
}

export interface HeroContent {
  title: string
  subtitle: string
  description: string
  backgroundImage?: string
  profileImage?: string
}

export interface PortfolioData {
  hero: HeroContent
  gridItems: GridItem[]
  projects: Project[]
  testimonials: Testimonial[]
  companies: Company[]
  workExperience: WorkExperience[]
  socialMedia: SocialMedia[]
}

export type EditingSection =
  | "hero"
  | "projects"
  | "testimonials"
  | "companies"
  | "workExperience"
  | "socialMedia"
  | "gridItems"
