import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useQuotes() {
  const [quotes, setQuotes] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const fetchQuotes = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`, {
        headers: { 'Authorization': token },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch quotes')
      }
      const res = await response.json();
      const data = res.data;
      if (Array.isArray(data) && data.length === 0) {
        setHasMore(false)
      } else if (Array.isArray(data)) {
        setQuotes(prevQuotes => [...prevQuotes, ...data])
        setOffset(prevOffset => prevOffset + 20)
      } else {
        throw new Error('Invalid data received from server')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return { quotes, hasMore, isLoading, error, fetchQuotes }
}