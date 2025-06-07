"use client"

import { useState, useEffect } from "react"
import type { GridItem } from "@/types/portfolio"
import { privateApi, publicApi } from "@/lib/api"

export function useGridItems() {
  const [data, setData] = useState<GridItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchGridItems = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi("portfolio/grid-items/")
       const data = await response.json();
       console.log("GRI DITEMS")
       console.log(data)
      setData(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch grid items")
    } finally {
      setLoading(false)
    }
  }

  const createGridItem = async (gridItemData: Omit<GridItem, "id">) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi("portfolio/grid-items/", {
        method: "POST",
        body: gridItemData,
      })
      setData((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create grid item"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const updateGridItem = async (id: number, gridItemData: Partial<GridItem>) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi(`portfolio/grid-items/${id}/`, {
        method: "PUT",
        body: gridItemData,
      })
      setData((prev) => prev.map((item) => (item.id === id ? response.data : item)))
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update grid item"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const deleteGridItem = async (id: number) => {
    try {
      setSaving(true)
      setError(null)
      await privateApi(`portfolio/grid-items/${id}/`, {
        method: "DELETE",
      })
      setData((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete grid item"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const reorderGridItems = async (reorderedItems: GridItem[]) => {
    try {
      setSaving(true)
      setError(null)
      setData(reorderedItems)
      // Assuming backend endpoint for reordering
      await privateApi("portfolio/grid-items/reorder/", {
        method: "POST",
        body: { order: reorderedItems.map((item) => item.id) },
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reorder grid items"
      setError(errorMessage)
      fetchGridItems()
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchGridItems()
  }, [])

  return {
    data,
    loading,
    error,
    saving,
    createGridItem,
    updateGridItem,
    deleteGridItem,
    reorderGridItems,
    refetch: fetchGridItems,
  }
}