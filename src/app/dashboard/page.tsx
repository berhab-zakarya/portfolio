/* eslint-disable */

"use client";

import { useState } from "react";
import {
  Home,
  FolderOpen,
  MessageSquare,
  Building,
  Briefcase,
  Share2,
  Grid3X3,
  Save,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { HeroEditor } from "@/components/dashboard/hero-editor";
import { ProjectsEditor } from "@/components/dashboard/projects-editor";
import { TestimonialsEditor } from "@/components/dashboard/testimonials-editor";
import { CompaniesEditor } from "@/components/dashboard/companies-editor";
import { WorkExperienceEditor } from "@/components/dashboard/work-experience-editor";
import { SocialMediaEditor } from "@/components/dashboard/social-media-editor";
import type { PortfolioData, EditingSection } from "@/types/portfolio";
import { GridItemsEditor } from "@/components/dashboard/grid-items-editor";
import { useHero } from "@/hooks/use-hero";
import { useProjects } from "@/hooks/use-projects";
import { useTestimonials } from "@/hooks/use-testimonials";
import { useCompanies } from "@/hooks/use-companies";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useGridItems } from "@/hooks/use-grid-items";
import { useSocialMedia } from "@/hooks/use-social-media";
import { useWorkExperience } from "@/hooks/use-work-experience";

// // Mock initial data (unchanged)
// const initialData: PortfolioData = {
//   hero: {
//     title: "Hi, I'm John Doe",
//     subtitle: "Full Stack Developer",
//     description: "I create amazing web experiences with modern technologies.",
//     profileImage: "",
//     backgroundImage: "",
//   },
//   gridItems: [
//     // ... your grid items
//   ],
//   projects: [
//     // ... your projects
//   ],
//   testimonials: [
//     // ... your testimonials
//   ],
//   companies: [
//     // ... your companies
//   ],
//   workExperience: [
//     // ... your work experience
//   ],
//   socialMedia: [
//     // ... your social media
//   ],
// };

const menuItems = [
  {
    title: "Portfolio Sections",
    items: [
      { title: "Hero Section", icon: Home, section: "hero" as EditingSection },
      {
        title: "Grid Items",
        icon: Grid3X3,
        section: "gridItems" as EditingSection,
      },
      {
        title: "Projects",
        icon: FolderOpen,
        section: "projects" as EditingSection,
      },
      {
        title: "Testimonials",
        icon: MessageSquare,
        section: "testimonials" as EditingSection,
      },
      {
        title: "Companies",
        icon: Building,
        section: "companies" as EditingSection,
      },
      {
        title: "Work Experience",
        icon: Briefcase,
        section: "workExperience" as EditingSection,
      },
      {
        title: "Social Media",
        icon: Share2,
        section: "socialMedia" as EditingSection,
      },
    ],
  },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<EditingSection>("hero");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Hooks
  const {
    updateHero,
    error: errorHero,
    loading: loadingHero,
    data: dataHero,

  } = useHero();

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,

  } = useProjects();

  const {
    uploading: fileUploading,
    error: fileUploadError,

  } = useFileUpload();

  const {
    data: testimonialsData,
    loading: testimonialsLoading,
    error: testimonialsError,

  } = useTestimonials();

  const {
    data: companiesData,
    loading: companiesLoading,
    error: companiesError,

  } = useCompanies();

  const {
    data: workExperienceData,
    loading: workExperienceLoading,
    error: workExperienceError,
  
  } = useWorkExperience();

  const {
    data: gridItemsData,
    loading: gridItemsLoading,
    error: gridItemsError,

  } = useGridItems();

  const {
    data: socialMediaData,
    loading: socialMediaLoading,
    error: socialMediaError,

  } = useSocialMedia();

  const handleSectionChange = (section: EditingSection) => {
    setActiveSection(section);
  };

  const handleDataUpdate = async (section: keyof PortfolioData, data: any) => {
    // setHasUnsavedChanges(true);
    if (section === "hero") await updateHero(data);
    // Add similar logic for other sections if needed
  };

  const handleSaveAll = async () => {
    try {
      // Save all data
      // await Promise.all([
      //   updateHero(dataHero),
      //   // Add other update calls for projects, testimonials, etc.
      // ]);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const isLoading =
    loadingHero ||
    projectsLoading ||
    testimonialsLoading ||
    companiesLoading ||
    workExperienceLoading ||
    gridItemsLoading ||
    socialMediaLoading ||
    fileUploading;

  const hasError =
    errorHero ||
    projectsError ||
    testimonialsError ||
    companiesError ||
    workExperienceError ||
    gridItemsError ||
    socialMediaError ||
    fileUploadError;

  const renderEditor = () => {
    if (isLoading) {
      return (
        <div className="bg-black flex justify-center items-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="text-red-500 text-center p-4">
          An error occurred while loading data. Please try again.
        </div>
      );
    }

    switch (activeSection) {
      case "hero":
        return (
          <HeroEditor
            data={dataHero!}
            onSave={(data) => handleDataUpdate("hero", data)}
            error={errorHero || ""}
          />
        );
      case "projects":
        return (
          <ProjectsEditor
            data={projectsData!}
            onSave={(data) => handleDataUpdate("projects", data)}
          />
        );
      case "testimonials":
        return (
          <TestimonialsEditor
            data={testimonialsData!}
            onSave={(data) => handleDataUpdate("testimonials", data)}
          />
        );
      case "companies":
        return (
          <CompaniesEditor
            data={companiesData!}
            onSave={(data) => handleDataUpdate("companies", data)}
          />
        );
      case "workExperience":
        return (
          <WorkExperienceEditor
            data={workExperienceData!}
            onSave={(data) => handleDataUpdate("workExperience", data)}
          />
        );
      case "socialMedia":
        return (
          <SocialMediaEditor
            data={socialMediaData!}
            onSave={(data) => handleDataUpdate("socialMedia", data)}
          />
        );
      case "gridItems":
        return (
          <GridItemsEditor
            data={gridItemsData!}
            onSave={(data) => handleDataUpdate("gridItems", data)}
          />
        );
      default:
        return <div>Select a section to edit</div>;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                P
              </span>
            </div>
            <div>
              <h2 className="font-semibold">Portfolio Dashboard</h2>
              <p className="text-xs text-muted-foreground">
                Manage your content
              </p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {menuItems.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.section}>
                      <SidebarMenuButton
                        onClick={() => handleSectionChange(item.section)}
                        isActive={activeSection === item.section}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges && (
                <Badge variant="secondary">Unsaved changes</Badge>
              )}
            </div>
            <Button onClick={handleSaveAll} disabled={!hasUnsavedChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">{renderEditor()}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}