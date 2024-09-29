'use client'

import { useLogin } from "./hooks/useLogin"


export default function LoginPage() {
  const { username, setUsername, otp, setOtp, error, handleLogin } = useLogin()

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4" aria-live="polite">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
            color="black"
          />
        </div>
        <div>
          <label htmlFor="otp" className="block mb-1">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
            color="black"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Login
        </button>
      </form>
    </div>
  )
}