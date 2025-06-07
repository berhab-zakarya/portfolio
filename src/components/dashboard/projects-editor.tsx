"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageUpload } from "./image-upload"
import type { Project } from "@/types/portfolio"
import Image from "next/image"

interface ProjectsEditorProps {
  data: Project[]
  onSave: (data: Project[]) => void
}

export function ProjectsEditor({ data, onSave }: ProjectsEditorProps) {
  const [projects, setProjects] = useState<Project[]>(data)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now(),
      title: "",
      des: "",
      img: "",
      iconLists: [],
      link: "",
    }
    setEditingProject(newProject)
    setIsDialogOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsDialogOpen(true)
  }

  const handleSaveProject = () => {
    if (!editingProject) return

    const updatedProjects = projects.find((p) => p.id === editingProject.id)
      ? projects.map((p) => (p.id === editingProject.id ? editingProject : p))
      : [...projects, editingProject]

    setProjects(updatedProjects)
    onSave(updatedProjects)
    setIsDialogOpen(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: number) => {
    const updatedProjects = projects.filter((p) => p.id !== id)
    setProjects(updatedProjects)
    onSave(updatedProjects)
  }

  const handleIconChange = (index: number, value: string) => {
    if (!editingProject) return
    const newIcons = [...editingProject.iconLists]
    newIcons[index] = value
    setEditingProject({ ...editingProject, iconLists: newIcons })
  }

  const addIcon = () => {
    if (!editingProject) return
    setEditingProject({
      ...editingProject,
      iconLists: [...editingProject.iconLists, ""],
    })
  }

  const removeIcon = (index: number) => {
    if (!editingProject) return
    const newIcons = editingProject.iconLists.filter((_, i) => i !== index)
    setEditingProject({ ...editingProject, iconLists: newIcons })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={handleAddProject}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.des}</p>
                    {project.img && (
                    <div className="w-20 h-20 mt-2 relative">
                      <Image
                      src={project.img || "/placeholder.svg"}
                      alt={project.title}
                      width={40} height={20}
                      fill
                      className="object-cover rounded"
                      sizes="80px"
                      style={{ objectFit: "cover", borderRadius: "0.375rem" }}
                      unoptimized
                      />
                    </div>
                    )}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject?.id && projects.find((p) => p.id === editingProject.id) ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-title">Title</Label>
                <Input
                  id="project-title"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>

              <div>
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={editingProject.des}
                  onChange={(e) => setEditingProject({ ...editingProject, des: e.target.value })}
                  placeholder="Project description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="project-link">Link</Label>
                <Input
                  id="project-link"
                  value={editingProject.link}
                  onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                  placeholder="Project URL"
                />
              </div>

              <ImageUpload
                label="Project Image"
                value={editingProject.img}
                onChange={(url) => setEditingProject({ ...editingProject, img: url })}
                placeholder="Project image URL"
              />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Technology Icons</Label>
                  <Button size="sm" onClick={addIcon}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Icon
                  </Button>
                </div>
                <div className="space-y-2">
                  {editingProject.iconLists.map((icon, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={icon}
                        onChange={(e) => handleIconChange(index, e.target.value)}
                        placeholder="Icon URL"
                      />
                      <Button size="sm" variant="destructive" onClick={() => removeIcon(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleSaveProject} className="w-full">
                Save Project
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
