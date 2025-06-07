"use client"

import { useState } from "react"
import { Plus, Trash2, Edit, GripVertical, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "./image-upload"
import { GridItemPreview } from "./grid-item-preview"
import type { GridItem } from "@/types/portfolio"
import Image from "next/image"

interface GridItemsEditorProps {
  data: GridItem[]
  onSave: (data: GridItem[]) => void
}

// Predefined grid layout options
const GRID_LAYOUTS = [
  {
    value: "lg:col-span-1 md:col-span-1 md:row-span-1",
    label: "Small (1x1)",
    description: "1 column, 1 row",
  },
  {
    value: "lg:col-span-2 md:col-span-2 md:row-span-1",
    label: "Wide (2x1)",
    description: "2 columns, 1 row",
  },
  {
    value: "lg:col-span-1 md:col-span-1 md:row-span-2",
    label: "Tall (1x2)",
    description: "1 column, 2 rows",
  },
  {
    value: "lg:col-span-2 md:col-span-2 md:row-span-2",
    label: "Medium (2x2)",
    description: "2 columns, 2 rows",
  },
  {
    value: "lg:col-span-3 md:col-span-3 md:row-span-2",
    label: "Large (3x2)",
    description: "3 columns, 2 rows",
  },
  {
    value: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    label: "Hero (3x4)",
    description: "3 columns, 4 rows, min height",
  },
  {
    value: "md:col-span-3 md:row-span-2",
    label: "Half Width (3x2)",
    description: "3 columns, 2 rows",
  },
]

const TITLE_POSITIONS = [
  { value: "justify-start", label: "Left" },
  { value: "justify-center", label: "Center" },
  { value: "justify-end", label: "Right" },
  { value: "justify-center md:justify-start lg:justify-center", label: "Responsive Center/Left" },
  { value: "justify-center md:max-w-full max-w-60 text-center", label: "Center with Max Width" },
]

const IMAGE_STYLES = [
  { value: "Default", label: "Default" },
  { value: "w-full h-full", label: "Full Size" },
  { value: "absolute right-0 bottom-0 md:w-96 w-60", label: "Bottom Right" },
  { value: "absolute left-0 top-0 w-32 h-32", label: "Top Left Small" },
  { value: "absolute right-0 top-0 w-32 h-32", label: "Top Right Small" },
]

export function GridItemsEditor({ data, onSave }: GridItemsEditorProps) {
  const [gridItems, setGridItems] = useState<GridItem[]>(data)
  const [editingItem, setEditingItem] = useState<GridItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [previewItem, setPreviewItem] = useState<GridItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleAddItem = () => {
    const newItem: GridItem = {
      id: Date.now(),
      title: "",
      description: "",
      class_name: "lg:col-span-2 md:col-span-2 md:row-span-1",
      imgClassName: "",
      titleClassName: "justify-start",
      img: "",
      spareImg: "",
    }
    setEditingItem(newItem)
    setIsDialogOpen(true)
  }

  const handleEditItem = (item: GridItem) => {
    setEditingItem(item)
    setIsDialogOpen(true)
  }

  const handleSaveItem = () => {
    if (!editingItem) return

    const updatedItems = gridItems.find((item) => item.id === editingItem.id)
      ? gridItems.map((item) => (item.id === editingItem.id ? editingItem : item))
      : [...gridItems, editingItem]

    setGridItems(updatedItems)
    onSave(updatedItems)
    setIsDialogOpen(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (id: number) => {
    const updatedItems = gridItems.filter((item) => item.id !== id)
    setGridItems(updatedItems)
    onSave(updatedItems)
  }

  const handlePreview = (item: GridItem) => {
    setPreviewItem(item)
    setIsPreviewOpen(true)
  }

  // const moveItem = (fromIndex: number, toIndex: number) => {
  //   const updatedItems = [...gridItems]
  //   const [movedItem] = updatedItems.splice(fromIndex, 1)
  //   updatedItems.splice(toIndex, 0, movedItem)
  //   setGridItems(updatedItems)
  //   onSave(updatedItems)
  // }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Grid Items</h2>
          <p className="text-muted-foreground">Manage your portfolio grid layout and content</p>
        </div>
        <Button onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Grid Item
        </Button>
      </div>

      <div className="grid gap-4">
        {gridItems.map((item) => (
          <Card key={item.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-grab p-1 h-auto"
                      onMouseDown={(e) => {
                        // Add drag functionality here if needed
                        e.preventDefault()
                      }}
                    >
                      <GripVertical className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline" className="text-xs">
                      #{item.id}
                    </Badge>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold truncate">{item.title || "Untitled"}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {GRID_LAYOUTS.find((layout) => layout.value === item.class_name)?.label || "Custom"}
                      </Badge>
                    </div>

                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      {item.img && (
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-blue-100 rounded border flex items-center justify-center">
                            <span className="text-blue-600 text-xs">1</span>
                          </div>
                          <span>Main Image</span>
                        </div>
                      )}
                      {item.spareImg && (
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-4 bg-green-100 rounded border flex items-center justify-center">
                            <span className="text-green-600 text-xs">2</span>
                          </div>
                          <span>Spare Image</span>
                        </div>
                      )}
                    </div>
                  </div>

                    {(item.img || item.spareImg) && (
                    <div className="flex space-x-2">
                      {item.img && (
                      <div className="w-16 h-16 relative">
                        <Image
                        src={item.img || "/placeholder.svg"}
                        alt="Main"
                        fill
                        width={40} height={20}
                        className="object-cover rounded border"
                        sizes="64px"
                        />
                      </div>
                      )}
                      {item.spareImg && (
                      <div className="w-16 h-16 relative">
                        <Image
                        src={item.spareImg || "/placeholder.svg"}
                        alt="Spare"
                        fill
                        className="object-cover rounded border opacity-75"
                        sizes="64px"
                        />
                      </div>
                      )}
                    </div>
                    )}
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handlePreview(item)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleEditItem(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {gridItems.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                <p className="text-lg mb-2">No grid items yet</p>
                <p className="text-sm">Add your first grid item to get started</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id && gridItems.find((item) => item.id === editingItem.id)
                ? "Edit Grid Item"
                : "Add Grid Item"}
            </DialogTitle>
          </DialogHeader>

          {editingItem && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="item-title">Title</Label>
                  <Input
                    id="item-title"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    placeholder="Grid item title"
                  />
                </div>

                <div>
                  <Label htmlFor="item-description">Description</Label>
                  <Textarea
                    id="item-description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Grid Layout</Label>
                  <Select
                    value={editingItem.class_name}
                    onValueChange={(value) => setEditingItem({ ...editingItem, class_name: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grid layout" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRID_LAYOUTS.map((layout) => (
                        <SelectItem key={layout.value} value={layout.value}>
                          <div>
                            <div className="font-medium">{layout.label}</div>
                            <div className="text-xs text-muted-foreground">{layout.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Title Position</Label>
                  <Select
                    value={editingItem.titleClassName}
                    onValueChange={(value) => setEditingItem({ ...editingItem, titleClassName: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select title position" />
                    </SelectTrigger>
                    <SelectContent>
                      {TITLE_POSITIONS.map((position) => (
                        <SelectItem key={position.value} value={position.value}>
                          {position.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Image Style</Label>
                  <Select
                    value={editingItem.imgClassName}
                    onValueChange={(value) => setEditingItem({ ...editingItem, imgClassName: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select image style" />
                    </SelectTrigger>
                    <SelectContent>
                      {IMAGE_STYLES.map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="custom-className">Custom Grid Class (Advanced)</Label>
                  <Input
                    id="custom-className"
                    value={editingItem.class_name}
                    onChange={(e) => setEditingItem({ ...editingItem, class_name: e.target.value })}
                    placeholder="e.g., lg:col-span-2 md:col-span-3 md:row-span-1"
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              {/* Right Column - Images */}
              <div className="space-y-4">
                <ImageUpload
                  label="Main Image"
                  value={editingItem.img}
                  onChange={(url) => setEditingItem({ ...editingItem, img: url })}
                  placeholder="Main image URL"
                />

                <ImageUpload
                  label="Spare Image (Optional)"
                  value={editingItem.spareImg}
                  onChange={(url) => setEditingItem({ ...editingItem, spareImg: url })}
                  placeholder="Secondary image URL"
                />

                {/* Preview */}
                <div>
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <GridItemPreview item={editingItem} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveItem}>Save Grid Item</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Grid Item Preview</DialogTitle>
          </DialogHeader>
          {previewItem && (
            <div className="p-4">
              <GridItemPreview item={previewItem} fullSize />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
