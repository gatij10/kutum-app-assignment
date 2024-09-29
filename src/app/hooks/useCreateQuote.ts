import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useCreateQuote() {
  const [text, setText] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }
    try {
      const response = await fetch('https://assignment.stage.crafto.app/postQuote', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, mediaUrl }),
      })
      if (!response.ok) {
        throw new Error('Failed to create quote')
      }
      router.push('/quotes')
    } catch (error) {
      console.error('Failed to create quote:', error)
      setError('Failed to create quote. Please try again.')
    }
  }

  return { text, setText, mediaUrl, setMediaUrl, error, handleSubmit }
}