"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./image-upload"
import type { WorkExperience } from "@/types/portfolio"
import Image from "next/image"

interface WorkExperienceEditorProps {
  data: WorkExperience[]
  onSave: (data: WorkExperience[]) => void
}

export function WorkExperienceEditor({ data, onSave }: WorkExperienceEditorProps) {
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(data)
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now(),
      title: "",
      desc: "",
      className: "md:col-span-2",
      thumbnail: "",
    }
    setEditingExperience(newExperience)
    setIsDialogOpen(true)
  }

  const handleEditExperience = (experience: WorkExperience) => {
    setEditingExperience(experience)
    setIsDialogOpen(true)
  }

  const handleSaveExperience = () => {
    if (!editingExperience) return

    const updatedExperience = workExperience.find((e) => e.id === editingExperience.id)
      ? workExperience.map((e) => (e.id === editingExperience.id ? editingExperience : e))
      : [...workExperience, editingExperience]

    setWorkExperience(updatedExperience)
    onSave(updatedExperience)
    setIsDialogOpen(false)
    setEditingExperience(null)
  }

  const handleDeleteExperience = (id: number) => {
    const updatedExperience = workExperience.filter((e) => e.id !== id)
    setWorkExperience(updatedExperience)
    onSave(updatedExperience)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <Button onClick={handleAddExperience}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="grid gap-4">
        {workExperience.map((experience) => (
          <Card key={experience.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                    {experience.thumbnail && (
                    <div className="w-16 h-16 relative">
                      <Image
                      src={experience.thumbnail || "/placeholder.svg"}
                      alt={experience.title}
                      width={40} height={20}
                      fill

                      className="object-cover rounded"
                      sizes="64px"
                      />
                      <span className="sr-only">{experience.title}</span>
                    </div>
                    )}
                  <div>
                    <h3 className="font-semibold">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{experience.desc}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditExperience(experience)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteExperience(experience.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingExperience?.id && workExperience.find((e) => e.id === editingExperience.id)
                ? "Edit Experience"
                : "Add Experience"}
            </DialogTitle>
          </DialogHeader>

          {editingExperience && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience-title">Job Title</Label>
                <Input
                  id="experience-title"
                  value={editingExperience.title}
                  onChange={(e) => setEditingExperience({ ...editingExperience, title: e.target.value })}
                  placeholder="Job title"
                />
              </div>

              <div>
                <Label htmlFor="experience-desc">Description</Label>
                <Textarea
                  id="experience-desc"
                  value={editingExperience.desc}
                  onChange={(e) => setEditingExperience({ ...editingExperience, desc: e.target.value })}
                  placeholder="Job description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="experience-className">Grid Class</Label>
                <Select
                  value={editingExperience.className}
                  onValueChange={(value) => setEditingExperience({ ...editingExperience, className: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grid size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="md:col-span-1">Small (1 column)</SelectItem>
                    <SelectItem value="md:col-span-2">Medium (2 columns)</SelectItem>
                    <SelectItem value="md:col-span-3">Large (3 columns)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ImageUpload
                label="Thumbnail"
                value={editingExperience.thumbnail}
                onChange={(url) => setEditingExperience({ ...editingExperience, thumbnail: url })}
                placeholder="Experience thumbnail URL"
              />

              <Button onClick={handleSaveExperience} className="w-full">
                Save Experience
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
