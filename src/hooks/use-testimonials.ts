"use client"

import { useState, useEffect } from "react"
import type { Testimonial } from "@/types/portfolio"
import { privateApi, publicApi } from "@/lib/api"

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi("portfolio/testimonials/")
      const data = await response.json();
      setData(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch testimonials")
    } finally {
      setLoading(false)
    }
  }

  const createTestimonial = async (testimonialData: Omit<Testimonial, "id">) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi("portfolio/testimonials/", {
        method: "POST",
        body: testimonialData,
      })
      setData((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create testimonial"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const updateTestimonial = async (id: number, testimonialData: Partial<Testimonial>) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi(`portfolio/testimonials/${id}/`, {
        method: "PUT",
        body: testimonialData,
      })
      setData((prev) => prev.map((testimonial) => (testimonial.id === id ? response.data : testimonial)))
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update testimonial"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const deleteTestimonial = async (id: number) => {
    try {
      setSaving(true)
      setError(null)
      await privateApi(`portfolio/testimonials/${id}/`, {
        method: "DELETE",
      })
      setData((prev) => prev.filter((testimonial) => testimonial.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete testimonial"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  return {
    data,
    loading,
    error,
    saving,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    refetch: fetchTestimonials,
  }
}