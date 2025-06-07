"use client"

import { useState } from "react"
import { privateApi } from "@/lib/api"

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = async (file: File): Promise<string> => {
    try {
      setUploading(true)
      setError(null)

      const formData = new FormData()
      formData.append("file", file)

      const response = await privateApi("upload-image/", {
        method: "POST",
       
        body: formData,
      })

      return response.data.url
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    return uploadFile(file)
  }

  return {
    uploading,
    error,
    uploadFile,
    uploadImage,
  }
}