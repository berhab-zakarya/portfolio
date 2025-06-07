"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageUpload } from "./image-upload"
import type { SocialMedia } from "@/types/portfolio"
import Image from "next/image"

interface SocialMediaEditorProps {
  data: SocialMedia[]
  onSave: (data: SocialMedia[]) => void
}

export function SocialMediaEditor({ data, onSave }: SocialMediaEditorProps) {
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(data)
  const [editingSocial, setEditingSocial] = useState<SocialMedia | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddSocial = () => {
    const newSocial: SocialMedia = {
      id: Date.now(),
      img: "",
      link: "",
    }
    setEditingSocial(newSocial)
    setIsDialogOpen(true)
  }

  const handleEditSocial = (social: SocialMedia) => {
    setEditingSocial(social)
    setIsDialogOpen(true)
  }

  const handleSaveSocial = () => {
    if (!editingSocial) return

    const updatedSocial = socialMedia.find((s) => s.id === editingSocial.id)
      ? socialMedia.map((s) => (s.id === editingSocial.id ? editingSocial : s))
      : [...socialMedia, editingSocial]

    setSocialMedia(updatedSocial)
    onSave(updatedSocial)
    setIsDialogOpen(false)
    setEditingSocial(null)
  }

  const handleDeleteSocial = (id: number) => {
    const updatedSocial = socialMedia.filter((s) => s.id !== id)
    setSocialMedia(updatedSocial)
    onSave(updatedSocial)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Social Media</h2>
        <Button onClick={handleAddSocial}>
          <Plus className="h-4 w-4 mr-2" />
          Add Social Link
        </Button>
      </div>

      <div className="grid gap-4">
        {socialMedia.map((social) => (
          <Card key={social.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {social.img && (
                    <div className="w-8 h-8 relative">
                      <Image
                      src={social.img || "/placeholder.svg"}
                      alt="Social media icon"
                      width={40} height={20}
                      fill
                      className="object-contain"
                      sizes="32px"
                      style={{ objectFit: "contain" }}
                      unoptimized
                      />
                    </div>
                    )}
                  <div>
                    <p className="text-sm">{social.link || "No link provided"}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditSocial(social)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteSocial(social.id)}>
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
              {editingSocial?.id && socialMedia.find((s) => s.id === editingSocial.id)
                ? "Edit Social Media"
                : "Add Social Media"}
            </DialogTitle>
          </DialogHeader>

          {editingSocial && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="social-link">Link</Label>
                <Input
                  id="social-link"
                  value={editingSocial.link}
                  onChange={(e) => setEditingSocial({ ...editingSocial, link: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <ImageUpload
                label="Icon"
                value={editingSocial.img}
                onChange={(url) => setEditingSocial({ ...editingSocial, img: url })}
                placeholder="Social media icon URL"
              />

              <Button onClick={handleSaveSocial} className="w-full">
                Save Social Media
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
