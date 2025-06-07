"use client"

import { useState, useEffect } from "react"
import type { Company } from "@/types/portfolio"
import { privateApi, publicApi } from "@/lib/api"

export function useCompanies() {
  const [data, setData] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi("portfolio/companies/")
      const data = await response.json();
      console.log("Fetched companies:", data) 
      setData(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch companies")
    } finally {
      setLoading(false)
    }
  }

  const createCompany = async (companyData: Omit<Company, "id">) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi("portfolio/companies/", {
        method: "POST",
        body: companyData,
      })
      setData((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create company"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const updateCompany = async (id: number, companyData: Partial<Company>) => {
    try {
      setSaving(true)
      setError(null)
      const response = await privateApi(`portfolio/companies/${id}/`, {
        method: "PUT",
        body: companyData,
      })
      setData((prev) => prev.map((company) => (company.id === id ? response.data : company)))
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update company"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const deleteCompany = async (id: number) => {
    try {
      setSaving(true)
      setError(null)
      await privateApi(`portfolio/companies/${id}/`, {
        method: "DELETE",
      })
      setData((prev) => prev.filter((company) => company.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete company"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  return {
    data,
    loading,
    error,
    saving,
    createCompany,
    updateCompany,
    deleteCompany,
    refetch: fetchCompanies,
  }
}