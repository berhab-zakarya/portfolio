"use client"

import { useState, useEffect } from "react"
import type { Project } from "@/types/portfolio"
import { privateApi, publicApi } from "@/lib/api"

export function useProjects() {
  const [data, setData] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi("portfolio/projects/")
       const data = await response.json();
      setData(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects")
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (projectData: Omit<Project, "id">) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi("portfolio/projects/", {
        method: "POST",
        body: projectData,
      })
      setData((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create project"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const updateProject = async (id: number, projectData: Partial<Project>) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi(`portfolio/projects/${id}/`, {
        method: "PUT",
        body: projectData,
      })
      setData((prev) => prev.map((project) => (project.id === id ? response.data : project)))
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update project"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const deleteProject = async (id: number) => {
    try {
      setSaving(true)
      setError(null)
      await privateApi(`portfolio/projects/${id}/`, {
        method: "DELETE",
      })
      setData((prev) => prev.filter((project) => project.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete project"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    data,
    loading,
    error,
    saving,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}