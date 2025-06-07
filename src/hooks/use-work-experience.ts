"use client"

import { useState, useEffect } from "react"
import type { WorkExperience } from "@/types/portfolio"
import { privateApi, publicApi } from "@/lib/api"

export function useWorkExperience() {
  const [data, setData] = useState<WorkExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchWorkExperience = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi("portfolio/work-experience/")
       const data = await response.json();
      setData(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch work experience")
    } finally {
      setLoading(false)
    }
  }

  const createWorkExperience = async (experienceData: Omit<WorkExperience, "id">) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi("portfolio/work-experience/", {
        method: "POST",
        body: experienceData,
      })
      setData((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create work experience"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const updateWorkExperience = async (id: number, experienceData: Partial<WorkExperience>) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi(`portfolio/work-experience/${id}/`, {
        method: "PUT",
        body: experienceData,
      })
      setData((prev) => prev.map((experience) => (experience.id === id ? response.data : experience)))
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update work experience"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const deleteWorkExperience = async (id: number) => {
    try {
      setSaving(true)
      setError(null)
      await privateApi(`portfolio/work-experience/${id}/`, {
        method: "DELETE",
      })
      setData((prev) => prev.filter((experience) => experience.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete work experience"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchWorkExperience()
  }, [])

  return {
    data,
    loading,
    error,
    saving,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
    refetch: fetchWorkExperience,
  }
}