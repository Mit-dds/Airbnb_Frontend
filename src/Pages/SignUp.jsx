import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const validate = () => {
    if (!name.trim()) return 'Full name is required'
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email'
    if (password.length < 6) return 'Password must be at least 6 characters'
    // if (password !== confirm) return 'Passwords do not match'
    return ''
  }

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const v = validate()
    if (v) {
      setError(v)
      return
    }

    setLoading(true)
    try {
      // TODO: replace with real sign-up API
      // await new Promise((res) => setTimeout(res, 800))
      await axios.post(`${BASE_URL}/register`, { name, email, password });
      navigate('/')
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full flex justify-center px-4 py-12">
        <div className="w-lg max-w-md border border-gray-200 rounded-lg bg-white p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Create your account</h2>
          <p className="mb-4 text-gray-600">Join now - enter your details below.</p>

          {error && <div className="mb-3 text-red-600 text-sm font-medium">{error}</div>}

          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              <span className="text-sm font-medium mb-1 block">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </label>

            <label className="block mb-2 mt-4">
              <span className="text-sm font-medium mb-1 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </label>

            <label className="block mb-2 mt-4">
              <span className="text-sm font-medium mb-1 block">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </label>

            {/* <label className="block mb-2 mt-4">
              <span className="text-sm font-medium mb-1 block">Confirm password</span>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </label> */}

            <button
              type="submit"
              disabled={loading}
              className={`mt-6 w-full py-2 px-4 bg-pink-500 text-white cursor-pointer font-semibold rounded-md transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-pink-600'}`}
            >
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-center">Already have an account? <Link to="/auth/signin" className="text-pink-600 hover:underline">Sign in</Link></p>
        </div>
      </main>
    </div>
  )
}

export default SignUp
