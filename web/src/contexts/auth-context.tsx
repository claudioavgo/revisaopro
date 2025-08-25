'use client'

import { useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { externalApiService, type Account, type Document } from '@/services/external-api.service'

interface AuthContextValue {
  account: Account | null
  isLoading: boolean
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => Promise<void>
  refreshAccount: () => Promise<void>
  documents: Document[]
  refreshDocuments: () => Promise<void>
  getDocument: (id: string) => Promise<Document | null>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [account, setAccount] = useState<Account | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [documents, setDocuments] = useState<Document[]>([])
  const router = useRouter()

  const refreshAccount = useCallback(async () => {
    try {
      const accountData = await externalApiService.getAccount()
      setAccount(accountData)
    } catch {
      setAccount(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async () => {
    try {
      const { url } = await externalApiService.getGoogleAuthLink()
      window.location.href = url
    } catch (error) {
      console.error('Erro ao iniciar login:', error)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await externalApiService.logout()
      setAccount(null)
      router.push('/')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }, [router])

  const refreshDocuments = useCallback(async () => {
    try {
      const documentsData = await externalApiService.getDocuments()
      setDocuments(documentsData)
    } catch (error) {
      console.error('Erro ao buscar documentos:', error)
    }
  }, [])

  const getDocument = useCallback(async (id: string) => {
    try {
      const documentData = await externalApiService.getDocument(id)
      return documentData
    } catch (error) {
      console.error('Erro ao buscar documento:', error)
      return null
    }
  }, [])

  useEffect(() => {
    refreshAccount()
    refreshDocuments()
  }, [refreshAccount, refreshDocuments])

  const value = useMemo(
    () => ({
      account,
      isLoading,
      isAuthenticated: !!account,
      login,
      logout,
      refreshAccount,
      documents,
      refreshDocuments,
      getDocument,
    }),
    [account, isLoading, login, logout, refreshAccount, documents, refreshDocuments, getDocument]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}