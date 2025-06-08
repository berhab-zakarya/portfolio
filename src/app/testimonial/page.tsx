"use client"

import { useState } from "react"
import { Testimonial } from "@/types/portfolio"
import { Upload,  X } from "lucide-react"
import Image from "next/image"
import { useTestimonials } from "@/hooks/use-testimonials"

export default function AddTestimonialPage() {
  const { createTestimonial, saving, error } = useTestimonials()
  const [formData, setFormData] = useState<Omit<Testimonial, "id">>({
    quote: "",
    name: "",
    title: "",
    avatar: "/avataaars.svg",
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Client-side validation
  if (!formData.quote.trim() || !formData.name.trim() || !formData.title.trim()) {
    alert("Please fill in all required fields: Quote, Name, and Title.");
    return;
  }

  try {
    const testimonialData = new FormData();
    testimonialData.append("quote", formData.quote);
    testimonialData.append("name", formData.name);
    testimonialData.append("title", formData.title);
    if (file) {
      testimonialData.append("avatar", file);
    } else {
      const response = await fetch("/avataaars.svg");
      const blob = await response.blob();
      const defaultFile = new File([blob], "avataaars.svg", { type: blob.type });
      testimonialData.append("avatar", defaultFile);
    }

    // Debug FormData contents
    for (const [key, value] of testimonialData.entries()) {
      console.log(`${key}:`, value);
    }

    await createTestimonial(testimonialData);
    setFormData({
      quote: "",
      name: "",
      title: "",
      avatar: "/avataaars.svg",
    });
    setPreviewImage(null);
    setFile(null);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Testimonial</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="quote">
              Quote
            </label>
            <textarea
              id="quote"
              name="quote"
              value={formData.quote}
              onChange={handleInputChange}
              placeholder="What can you tell about Berhab Zakarya?"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 outline-none transition"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Student, Client, or Company Role"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 outline-none transition"
              required
            />
          </div>

        
         

          <div>
            <label className="block text-sm font-medium mb-2">
              Avatar
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-700">
                <Image
                  src={previewImage ?? formData.avatar ?? "/avataaars.svg"}
                  alt="Avatar preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <label className="cursor-pointer flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition">
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {previewImage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null)
                    setFile(null)
                    setFormData((prev) => ({ ...prev, avatar: "/public/avataaars.svg" }))
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded text-white font-medium transition flex items-center justify-center"
          >
            {saving ? (
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : null}
            {saving ? "Saving..." : "Add Testimonial"}
          </button>
        </form>
      </div>
    </div>
  )
}