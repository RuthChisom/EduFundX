'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, CheckCircle, GraduationCap, BookOpen, Save, Trash2 } from 'lucide-react'

// Define types for our form data
interface Publication {
  title: string
  journal: string
  year: string
  url: string
}

interface Education {
  degree: string
  institution: string
  year: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  institution: string
  department: string
  position: string
  researchAreas: string
  bio: string
  orcidId: string
  publications: Publication[]
  education: Education[]
  profileImage: File | null
}

export default function ResearcherProfile() {
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@university.edu',
    institution: 'University of Technology',
    department: 'Computer Science',
    position: 'Associate Professor',
    researchAreas: 'Artificial Intelligence, Machine Learning, Data Science',
    bio: 'I am a researcher focused on developing AI solutions for real-world problems. My work spans machine learning algorithms, neural networks, and data science applications in various domains.',
    orcidId: '0000-0002-1825-0097',
    publications: [
      {
        title: 'Neural Networks for Climate Prediction',
        journal: 'Journal of AI Research',
        year: '2023',
        url: 'https://doi.org/10.1234/jair.2023.123'
      },
      {
        title: 'Machine Learning Applications in Healthcare',
        journal: 'Medical AI Journal',
        year: '2022',
        url: 'https://doi.org/10.5678/maj.2022.456'
      }
    ],
    education: [
      {
        degree: 'Ph.D. in Computer Science',
        institution: 'Stanford University',
        year: '2018'
      },
      {
        degree: 'M.S. in Artificial Intelligence',
        institution: 'MIT',
        year: '2014'
      }
    ],
    profileImage: null
  })

  const searchParams = useSearchParams()
  const isNewUser = searchParams.get('new') === 'true'

  const [successMessage, setSuccessMessage] = useState('')
  const [showOnboardingLink, setShowOnboardingLink] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if this is a new user who hasn't completed onboarding
    // In a real app, you would check this from your backend
    if (isNewUser) {
      setShowOnboardingLink(true)
    }
  }, [isNewUser])

  // Check if wallet is connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { ethereum } = window as any
        if (ethereum && ethereum.isMetaMask) {
          const accounts = await ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          } else {
            // Redirect to login if no wallet is connected
            router.push('/researcher/login')
          }
        } else {
          // Redirect to login if MetaMask is not installed
          router.push('/researcher/login')
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
        router.push('/researcher/login')
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
  }, [router])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddPublication = () => {
    setFormData((prev) => ({
      ...prev,
      publications: [...prev.publications, { title: '', journal: '', year: '', url: '' }]
    }))
  }

  const handlePublicationChange = (index: number, field: keyof Publication, value: string) => {
    const updatedPublications = [...formData.publications]
    updatedPublications[index] = { ...updatedPublications[index], [field]: value }
    setFormData((prev) => ({ ...prev, publications: updatedPublications }))
  }

  const handleRemovePublication = (index: number) => {
    const updatedPublications = [...formData.publications]
    updatedPublications.splice(index, 1)
    setFormData((prev) => ({ ...prev, publications: updatedPublications }))
  }

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', year: '' }]
    }))
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...formData.education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setFormData((prev) => ({ ...prev, education: updatedEducation }))
  }

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...formData.education]
    updatedEducation.splice(index, 1)
    setFormData((prev) => ({ ...prev, education: updatedEducation }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the data to your backend
    console.log('Updating researcher profile:', formData)

    // Show success message
    setSuccessMessage('Profile updated successfully!')

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-700">
            EDUFUNDX
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/researcher/dashboard"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-700 px-6 py-4 text-white">
            <h1 className="text-xl font-bold">Edit Researcher Profile</h1>
            <p className="text-blue-100 text-sm mt-1">
              Update your profile information to maintain accurate credentials
            </p>
          </div>

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              </div>
            </div>
          )}

          {showOnboardingLink && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <GraduationCap className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    New to the platform? Complete our guided onboarding process to set up your
                    profile.
                  </p>
                  <div className="mt-2">
                    <Link
                      href="/researcher/onboarding"
                      className="text-sm font-medium text-blue-700 hover:text-blue-600"
                    >
                      Start Onboarding Process →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Academic Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Institution/University*
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Department/Faculty
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                  Position/Title*
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value="">Select your position</option>
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                  <option value="Postdoctoral Researcher">Postdoctoral Researcher</option>
                  <option value="PhD Candidate">PhD Candidate</option>
                  <option value="Research Fellow">Research Fellow</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Image
                </label>
                <div className="mt-1 flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {formData.profileImage ? (
                      <img
                        src={URL.createObjectURL(formData.profileImage) || '/placeholder.svg'}
                        alt="Profile preview"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <span>Change</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData((prev) => ({ ...prev, profileImage: e.target.files![0] }))
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Research Information</h2>

              <div>
                <label
                  htmlFor="researchAreas"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Research Areas/Interests*
                </label>
                <input
                  type="text"
                  id="researchAreas"
                  name="researchAreas"
                  value={formData.researchAreas}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="e.g., Machine Learning, Climate Science, Genomics"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Separate multiple research areas with commas.
                </p>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Research Bio*
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Briefly describe your research background, interests, and goals..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="orcidId" className="block text-sm font-medium text-gray-700 mb-1">
                  ORCID ID
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://orcid.org/
                  </span>
                  <input
                    type="text"
                    id="orcidId"
                    name="orcidId"
                    value={formData.orcidId}
                    onChange={handleInputChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0000-0000-0000-0000"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Your ORCID iD uniquely identifies you as a researcher.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Publications</h2>
                <button
                  type="button"
                  onClick={handleAddPublication}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <BookOpen className="h-4 w-4 mr-1" /> Add Publication
                </button>
              </div>

              {formData.publications.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No publications added</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add your research publications to increase your credibility.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleAddPublication}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <BookOpen className="h-4 w-4 mr-2" /> Add Publication
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.publications.map((pub, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-gray-900">
                          Publication #{index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleRemovePublication(index)}
                          className="text-red-600 hover:text-red-800 text-xs flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                      <div className="mt-3 space-y-3">
                        <div>
                          <label
                            htmlFor={`pub-title-${index}`}
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            Title*
                          </label>
                          <input
                            type="text"
                            id={`pub-title-${index}`}
                            value={pub.title}
                            onChange={(e) =>
                              handlePublicationChange(index, 'title', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`pub-journal-${index}`}
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            Journal/Conference*
                          </label>
                          <input
                            type="text"
                            id={`pub-journal-${index}`}
                            value={pub.journal}
                            onChange={(e) =>
                              handlePublicationChange(index, 'journal', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                          />
                        </div>
                        <div className="flex gap-4">
                          <div className="w-1/3">
                            <label
                              htmlFor={`pub-year-${index}`}
                              className="block text-xs font-medium text-gray-700 mb-1"
                            >
                              Year*
                            </label>
                            <input
                              type="text"
                              id={`pub-year-${index}`}
                              value={pub.year}
                              onChange={(e) =>
                                handlePublicationChange(index, 'year', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                            />
                          </div>
                          <div className="w-2/3">
                            <label
                              htmlFor={`pub-url-${index}`}
                              className="block text-xs font-medium text-gray-700 mb-1"
                            >
                              URL/DOI
                            </label>
                            <input
                              type="text"
                              id={`pub-url-${index}`}
                              value={pub.url}
                              onChange={(e) =>
                                handlePublicationChange(index, 'url', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Education</h2>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <GraduationCap className="h-4 w-4 mr-1" /> Add Education
                </button>
              </div>

              {formData.education.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                  <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No education added</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add your academic background to establish your credentials.
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleAddEducation}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <GraduationCap className="h-4 w-4 mr-2" /> Add Education
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-gray-900">
                          Education #{index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(index)}
                          className="text-red-600 hover:text-red-800 text-xs flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                      <div className="mt-3 space-y-3">
                        <div>
                          <label
                            htmlFor={`edu-degree-${index}`}
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            Degree*
                          </label>
                          <input
                            type="text"
                            id={`edu-degree-${index}`}
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                            placeholder="e.g., Ph.D. in Computer Science"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`edu-institution-${index}`}
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            Institution*
                          </label>
                          <input
                            type="text"
                            id={`edu-institution-${index}`}
                            value={edu.institution}
                            onChange={(e) =>
                              handleEducationChange(index, 'institution', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`edu-year-${index}`}
                            className="block text-xs font-medium text-gray-700 mb-1"
                          >
                            Year Completed*
                          </label>
                          <input
                            type="text"
                            id={`edu-year-${index}`}
                            value={edu.year}
                            onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6 flex justify-end">
              <div className="flex space-x-3">
                <Link
                  href="/researcher/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <Link href="/" className="text-xl font-bold text-blue-700">
                EDUFUNDX
              </Link>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-sm text-gray-500 md:text-right">
                &copy; {new Date().getFullYear()} EDUFUNDX. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
