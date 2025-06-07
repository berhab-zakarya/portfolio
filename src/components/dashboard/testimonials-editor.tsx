"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Testimonial } from "@/types/portfolio"

interface TestimonialsEditorProps {
  data: Testimonial[]
  onSave: (data: Testimonial[]) => void
}

export function TestimonialsEditor({ data, onSave }: TestimonialsEditorProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(data)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now(),
      quote: "",
      name: "",
      title: "",
    }
    setEditingTestimonial(newTestimonial)
    setIsDialogOpen(true)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setIsDialogOpen(true)
  }

  const handleSaveTestimonial = () => {
    if (!editingTestimonial) return

    const updatedTestimonials = testimonials.find((t) => t.id === editingTestimonial.id)
      ? testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t))
      : [...testimonials, editingTestimonial]

    setTestimonials(updatedTestimonials)
    onSave(updatedTestimonials)
    setIsDialogOpen(false)
    setEditingTestimonial(null)
  }

  const handleDeleteTestimonial = (id: number) => {
    const updatedTestimonials = testimonials.filter((t) => t.id !== id)
    setTestimonials(updatedTestimonials)
    onSave(updatedTestimonials)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <Button onClick={handleAddTestimonial}>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm italic mb-2">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditTestimonial(testimonial)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteTestimonial(testimonial.id!)}>
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
              {editingTestimonial?.id && testimonials.find((t) => t.id === editingTestimonial.id)
                ? "Edit Testimonial"
                : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>

          {editingTestimonial && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="testimonial-quote">Quote</Label>
                <Textarea
                  id="testimonial-quote"
                  value={editingTestimonial.quote}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  placeholder="Testimonial quote"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="testimonial-name">Name</Label>
                <Input
                  id="testimonial-name"
                  value={editingTestimonial.name}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  placeholder="Client name"
                />
              </div>

              <div>
                <Label htmlFor="testimonial-title">Title</Label>
                <Input
                  id="testimonial-title"
                  value={editingTestimonial.title}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, title: e.target.value })}
                  placeholder="Client title/position"
                />
              </div>

              <Button onClick={handleSaveTestimonial} className="w-full">
                Save Testimonial
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
