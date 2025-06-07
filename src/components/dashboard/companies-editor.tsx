"use client"

import { useState } from "react"
import { Plus, Trash2, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageUpload } from "./image-upload"
import type { Company } from "@/types/portfolio"
import Image from "next/image"

interface CompaniesEditorProps {
  data: Company[]
  onSave: (data: Company[]) => void
}

export function CompaniesEditor({ data, onSave }: CompaniesEditorProps) {
  const [companies, setCompanies] = useState<Company[]>(data)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCompany = () => {
    const newCompany: Company = {
      id: Date.now(),
      name: "",
      img: "",
      name_img: "",
    }
    setEditingCompany(newCompany)
    setIsDialogOpen(true)
  }

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company)
    setIsDialogOpen(true)
  }

  const handleSaveCompany = () => {
    if (!editingCompany) return

    const updatedCompanies = companies.find((c) => c.id === editingCompany.id)
      ? companies.map((c) => (c.id === editingCompany.id ? editingCompany : c))
      : [...companies, editingCompany]

    setCompanies(updatedCompanies)
    onSave(updatedCompanies)
    setIsDialogOpen(false)
    setEditingCompany(null)
  }

  const handleDeleteCompany = (id: number) => {
    const updatedCompanies = companies.filter((c) => c.id !== id)
    setCompanies(updatedCompanies)
    onSave(updatedCompanies)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Companies</h2>
        <Button onClick={handleAddCompany}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      <div className="grid gap-4">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {company.img && (
                    <div className="w-12 h-12 relative">
                      <Image
                      src={company.img || "/placeholder.svg"}
                      alt={company.name}
                      fill
                      className="object-contain"
                      sizes="48px"
                      width={40} height={20}
                      style={{ objectFit: "contain" }}
                      unoptimized
                      />
                    </div>
                    )}
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditCompany(company)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteCompany(company.id)}>
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
              {editingCompany?.id && companies.find((c) => c.id === editingCompany.id) ? "Edit Company" : "Add Company"}
            </DialogTitle>
          </DialogHeader>

          {editingCompany && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={editingCompany.name}
                  onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  placeholder="Company name"
                />
              </div>

              <ImageUpload
                label="Company Logo"
                value={editingCompany.img}
                onChange={(url) => setEditingCompany({ ...editingCompany, img: url })}
                placeholder="Company logo URL"
              />

              <ImageUpload
                label="Company Name Image"
                value={editingCompany.name_img}
                onChange={(url) => setEditingCompany({ ...editingCompany, name_img: url })}
                placeholder="Company name image URL"
              />

              <Button onClick={handleSaveCompany} className="w-full">
                Save Company
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
