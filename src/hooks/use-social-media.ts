"use client"

import { useState, useEffect } from "react"
import type { SocialMedia } from "@/types/portfolio"
import { privateApi, publicApi } from "@/lib/api"

export function useSocialMedia() {
  const [data, setData] = useState<SocialMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchSocialMedia = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi("portfolio/social-media/")
       const data = await response.json();
      setData(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch social media")
    } finally {
      setLoading(false)
    }
  }

  const createSocialMedia = async (socialData: Omit<SocialMedia, "id">) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi("portfolio/social-media/", {
        method: "POST",
        body: socialData,
      })
      setData((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create social media"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const updateSocialMedia = async (id: number, socialData: Partial<SocialMedia>) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi(`portfolio/social-media/${id}/`, {
        method: "PUT",
        body: socialData,
      })
      setData((prev) => prev.map((social) => (social.id === id ? response.data : social)))
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update social media"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const deleteSocialMedia = async (id: number) => {
    try {
      setSaving(true)
      setError(null)
      await privateApi(`portfolio/social-media/${id}/`, {
        method: "DELETE",
      })
      setData((prev) => prev.filter((social) => social.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete social media"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchSocialMedia()
  }, [])

  return {
    data,
    loading,
    error,
    saving,
    createSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    refetch: fetchSocialMedia,
  }
}