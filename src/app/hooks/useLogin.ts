import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const [username, setUsername] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch('https://assignment.stage.crafto.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp }),
      })
      const data = await response.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        router.push('/quotes')
      } else {
        throw new Error('Login failed')
      }
    } catch {
      setError('Login failed. Please try again.')
    }
  }

  return { username, setUsername, otp, setOtp, error, handleLogin }
}