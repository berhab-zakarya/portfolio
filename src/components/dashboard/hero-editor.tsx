"use client"

import {  useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "./image-upload"
import type { HeroContent } from "@/types/portfolio"

interface HeroEditorProps {
  data: HeroContent
  onSave: (data: HeroContent) => void
  error?:string;
}

export function HeroEditor({ data, onSave }: HeroEditorProps) {
  const [heroData, setHeroData] = useState<HeroContent>(data)

  const handleSave = () => {
    onSave(heroData)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              placeholder="Your main title"
            />
          </div>

          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
              placeholder="Your subtitle"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={heroData.description}
              onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
              placeholder="Brief description about yourself"
              rows={4}
            />
          </div>

          <ImageUpload
            label="Profile Image"
            value={heroData.profileImage}
            onChange={(url) => setHeroData({ ...heroData, profileImage: url })}
            placeholder="Profile image URL"
          />

          <ImageUpload
            label="Background Image"
            value={heroData.backgroundImage}
            onChange={(url) => setHeroData({ ...heroData, backgroundImage: url })}
            placeholder="Background image URL"
          />

          <Button onClick={handleSave} className="w-full">
            Save Hero Content
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
