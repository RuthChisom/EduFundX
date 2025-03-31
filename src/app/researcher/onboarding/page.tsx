'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Briefcase
} from 'lucide-react'

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

export default function ResearcherOnboarding() {
  const [step, setStep] = useState(1)
  const [walletAddress, setWalletAddress] = useState('')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    department: '',
    position: '',
    researchAreas: '',
    bio: '',
    orcidId: '',
    publications: [],
    education: [],
    profileImage: null
  })
  const router = useRouter()

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

  const handleNext = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = () => {
    // In a real app, you would submit the data to your backend
    console.log('Submitting researcher profile:', formData)

    // Redirect to profile page after successful submission
    router.push('/researcher/profile')
  }

  if (!walletAddress) {
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Progress Header */}
          <div className="bg-blue-700 px-6 py-4 text-white">
            <h1 className="text-xl font-bold">Complete Your Researcher Profile</h1>
            <p className="text-blue-100 text-sm mt-1">
              Step {step} of 4:{' '}
              {step === 1
                ? 'Basic Information'
                : step === 2
                ? 'Research Background'
                : step === 3
                ? 'Publications & Education'
                : 'Review & Submit'}
            </p>
            <div className="w-full bg-blue-900 h-2 mt-4 rounded-full">
              <div
                className="bg-blue-300 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.name@university.edu"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    We'll verify your academic affiliation through this email.
                  </p>
                </div>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Position/Title*
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                        <GraduationCap className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <label
                      htmlFor="file-upload"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <span>Upload</span>
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
            )}

            {/* Step 2: Research Background */}
            {step === 2 && (
              <div className="space-y-6">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Verification Benefits</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>Providing complete and accurate research information helps:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Establish credibility with potential funders</li>
                          <li>Improve matching with relevant funding opportunities</li>
                          <li>Increase your visibility in the research community</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Publications & Education */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Publications</label>
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
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No publications added
                      </h3>
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
                              onClick={() => {
                                const updatedPublications = [...formData.publications]
                                updatedPublications.splice(index, 1)
                                setFormData((prev) => ({
                                  ...prev,
                                  publications: updatedPublications
                                }))
                              }}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Remove
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
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

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Education</label>
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
                              onClick={() => {
                                const updatedEducation = [...formData.education]
                                updatedEducation.splice(index, 1)
                                setFormData((prev) => ({ ...prev, education: updatedEducation }))
                              }}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Remove
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
                                onChange={(e) =>
                                  handleEducationChange(index, 'degree', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
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
                                onChange={(e) =>
                                  handleEducationChange(index, 'year', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Almost there!</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          Please review your information before submitting. You can go back to make
                          changes if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                      Basic Information
                    </h3>
                    <div className="mt-3 border-t border-gray-200 pt-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Name</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {formData.firstName} {formData.lastName}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Email</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.email}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Institution</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.institution}</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Department</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {formData.department || 'Not specified'}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">Position</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.position}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                      Research Background
                    </h3>
                    <div className="mt-3 border-t border-gray-200 pt-4">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Research Areas</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.researchAreas}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">Research Bio</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formData.bio}</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">ORCID ID</dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {formData.orcidId
                              ? `https://orcid.org/${formData.orcidId}`
                              : 'Not provided'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                      Publications & Education
                    </h3>
                    <div className="mt-3 border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Publications</h4>
                      {formData.publications.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No publications added</p>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {formData.publications.map((pub, index) => (
                            <li key={index} className="py-3">
                              <p className="text-sm font-medium text-gray-900">{pub.title}</p>
                              <p className="text-sm text-gray-500">
                                {pub.journal}, {pub.year}
                                {pub.url && (
                                  <span>
                                    {' '}
                                    •{' '}
                                    <a
                                      href={pub.url}
                                      className="text-blue-600 hover:text-blue-800"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Publication
                                    </a>
                                  </span>
                                )}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}

                      <h4 className="text-sm font-medium text-gray-500 mt-6 mb-2">Education</h4>
                      {formData.education.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No education added</p>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {formData.education.map((edu, index) => (
                            <li key={index} className="py-3">
                              <p className="text-sm font-medium text-gray-900">{edu.degree}</p>
                              <p className="text-sm text-gray-500">
                                {edu.institution}, {edu.year}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Complete Profile <CheckCircle className="h-4 w-4 ml-2" />
                </button>
              )}
            </div>
          </div>
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
