'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfileSetup() {
  const [profile, setProfile] = useState({ name: '', institution: '', bio: '' })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedProfile = localStorage.getItem('funderProfile')
    if (savedProfile) {
      console.log('profile exists;')
      router.push('/funder/dashboard')
    } else {
      console.log('profile exists;')
      setLoading(false)
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    localStorage.setItem('funderProfile', JSON.stringify(profile))
    router.push('/funder/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Set Up Your Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Institution</label>
          <input
            type="text"
            name="institution"
            value={profile.institution}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Short Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  )
}
