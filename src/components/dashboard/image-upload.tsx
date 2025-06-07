"use client"

import { useState } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
}

export function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [urlInput, setUrlInput] = useState(value || "")

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    try {
      // Simulate upload - replace with your actual upload logic
      const formData = new FormData()
      formData.append("file", file)

      // Mock upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock URL - replace with actual upload response
      const mockUrl = `/uploads/${file.name}`
      onChange(mockUrl)
      setUrlInput(mockUrl)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = () => {
    onChange(urlInput)
  }

  const clearImage = () => {
    onChange("")
    setUrlInput("")
  }

  return (
    <div className="space-y-4">
      {label && <Label>{label}</Label>}

      {value ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Image
              src={value || "/placeholder.svg"}
              alt="Preview"
              width={400}
              height={128}
              
              className="w-full h-32 object-cover rounded-md"
              style={{ objectFit: "cover" }}
              />
              <Button size="sm" variant="destructive" className="absolute top-2 right-2" onClick={clearImage}>
              <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="border-dashed">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Upload an image or enter URL</p>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                  disabled={isUploading}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button disabled={isUploading} asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </span>
                  </Button>
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-2">
            <Input
              placeholder={placeholder || "Or enter image URL"}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Button onClick={handleUrlSubmit} disabled={!urlInput}>
              Add URL
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
