"use client"

import { useState, useEffect } from "react"
import { API_CONFIG, STORAGE_KEYS } from "@/lib/constants"
import { publicApi } from "@/lib/api"
import { useRouter } from "next/navigation"

interface User {
  user_id: number
  email: string
  first_name: string
  last_name: string
  access: string
  refresh: string
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in on mount
    console.log("GET TOKENS")
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
    console.log(storedUser)
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    console.log(accessToken)

    if (storedUser && accessToken) {
      setLoading(true)
      try {
        const refresh = fetch(API_CONFIG.BASE_URL + API_CONFIG.AUTH.REFRESH, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: refreshToken,
          }),
        })
        refresh.then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json()
            const errorMsg =
              errorData?.detail ||
              errorData?.message ||
              "Failed to refresh token"
            throw new Error(errorMsg)
          }
          const data = await response.json()
          // Update local storage with new tokens
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access)
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh)
        })
        
        setUser(JSON.parse(storedUser))
        router.push('/dashboard')
      } catch (err) {
        console.error("Failed to parse stored user:", err)
        localStorage.removeItem(STORAGE_KEYS.USER)
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      }finally{
        setLoading(false)
      }
    }

    setLoading(false)
  }, [router])



    const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await publicApi(`${API_CONFIG.AUTH.LOGIN}`, {
        method: "POST",
        body: { email, password },
      })
         const data = await response.json();
      if (!response.ok) {
        const errorMsg =
          data?.email ||
          data?.custom_error ||
          data?.detail ||
          data?.message ||
          "Login failed"
        throw new Error(errorMsg)
      }

   
      // const authData = await response.json()
      // const authData = response?.body;
      console.log("50 LINE:")
      console.log(response)
   

      // Store user data and tokens
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data))
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refresh)
      setUser(data)
      setError(null)

      return data
    } catch (err) {
      console.log(err)
      const errorMessage = err instanceof Error ? err.message : "Login failed"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }


  const logout = async () => {
    try {
      // Optionally call a logout endpoint if your backend requires it
      // await privateApi("auth/logout/", { method: "POST" })
      localStorage.removeItem(STORAGE_KEYS.USER)
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setUser(null)
    }
  }

  const isAuthenticated = !!user

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
  }
}