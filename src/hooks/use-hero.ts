"use client"

import { useState, useEffect } from "react"
import type { HeroContent } from "@/types/portfolio"
import { privateApi,  publicApi } from "@/lib/api"

export function useHero() {
  const [data, setData] = useState<HeroContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchHero = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi("portfolio/hero/")
      const data = await response.json();
      console.log("19 LINE USE HERO")
      console.log(data)
      setData(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch hero content")
    } finally {
      setLoading(false)
    }
  }

  const updateHero = async (heroData: HeroContent) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi("portfolio/hero/", {
        method: "POST",
        body: heroData,
      })
      setData(response.data)
      return response.data
    } catch (err) {
      console.log(err)
      const errorMessage = err instanceof Error ? err.message : "Failed to update hero content"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchHero()
  }, [])

  return {
    data,
    loading,
    error,
    saving,
    updateHero,
    refetch: fetchHero,
  }
}