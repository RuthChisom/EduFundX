'use client'

import type React from 'react'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Upload,
  DollarSign,
  Calendar,
  Clock,
  Save
} from 'lucide-react'

// Define types for our form data
interface Milestone {
  title: string
  description: string
  date: string
  deliverables: string
}

interface PersonnelBudgetItem {
  role: string
  time: string
  cost: string
}

interface BudgetItem {
  description: string
  cost: string
}

interface Budget {
  totalRequested: string
  breakdown: {
    personnel: PersonnelBudgetItem[]
    equipment: BudgetItem[]
    travel: BudgetItem[]
    other: string
  }
  justification: string
}

interface Timeline {
  startDate: string
  duration: string
  milestones: Milestone[]
}

interface FormData {
  title: string
  category: string
  abstract: string
  background: string
  objectives: string
  methodology: string
  expectedOutcomes: string
  timeline: Timeline
  budget: Budget
  attachments: File[]
}

export default function NewProposal() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    abstract: '',
    background: '',
    objectives: '',
    methodology: '',
    expectedOutcomes: '',
    timeline: {
      startDate: '',
      duration: '',
      milestones: []
    },
    budget: {
      totalRequested: '',
      breakdown: {
        personnel: [],
        equipment: [],
        travel: [],
        other: ''
      },
      justification: ''
    },
    attachments: []
  })
  const router = useRouter()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes('.')) {
      const parts = name.split('.')
      if (parts.length === 2) {
        const [parent, child] = parts
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [child]: value
          }
        }))
      } else if (parts.length === 3) {
        const [parent, middle, child] = parts
        setFormData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev],
            [middle]: {
              ...(prev[parent as keyof typeof prev] as any)[middle],
              [child]: value
            }
          }
        }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleAddMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: [
          ...prev.timeline.milestones,
          { title: '', description: '', date: '', deliverables: '' }
        ]
      }
    }))
  }

  const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
    const updatedMilestones = [...formData.timeline.milestones]
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value }

    setFormData((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        milestones: updatedMilestones
      }
    }))
  }

  const handleAddBudgetItem = (category: 'personnel' | 'equipment' | 'travel') => {
    if (category === 'personnel') {
      setFormData((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          breakdown: {
            ...prev.budget.breakdown,
            personnel: [...prev.budget.breakdown.personnel, { role: '', time: '', cost: '' }]
          }
        }
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          breakdown: {
            ...prev.budget.breakdown,
            [category]: [...prev.budget.breakdown[category], { description: '', cost: '' }]
          }
        }
      }))
    }
  }

  const handleBudgetItemChange = (
    category: 'personnel' | 'equipment' | 'travel',
    index: number,
    field: string,
    value: string
  ) => {
    if (category === 'personnel') {
      const updatedItems = [...formData.budget.breakdown.personnel]
      updatedItems[index] = { ...updatedItems[index], [field]: value } as PersonnelBudgetItem

      setFormData((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          breakdown: {
            ...prev.budget.breakdown,
            personnel: updatedItems
          }
        }
      }))
    } else {
      const updatedItems = [...formData.budget.breakdown[category]]
      updatedItems[index] = { ...updatedItems[index], [field]: value } as BudgetItem

      setFormData((prev) => ({
        ...prev,
        budget: {
          ...prev.budget,
          breakdown: {
            ...prev.budget.breakdown,
            [category]: updatedItems
          }
        }
      }))
    }
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSaveDraft = () => {
    // In a real app, you would save the draft to your backend
    console.log('Saving draft:', formData)
    alert('Draft saved successfully!')
  }

  const handleSubmit = () => {
    // In a real app, you would submit the proposal to your backend
    console.log('Submitting proposal:', formData)

    // Redirect to dashboard after successful submission
    router.push('/researcher/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-700">
            EDUFUNDX
          </Link>
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
          {/* Progress Header */}
          <div className="bg-blue-700 px-6 py-4 text-white">
            <h1 className="text-xl font-bold">Create New Research Proposal</h1>
            <p className="text-blue-100 text-sm mt-1">
              Step {step} of 4:{' '}
              {step === 1
                ? 'Project Details'
                : step === 2
                ? 'Methodology & Outcomes'
                : step === 3
                ? 'Timeline & Milestones'
                : 'Budget & Submission'}
            </p>
            <div className="w-full bg-blue-900 h-2 mt-4 rounded-full">
              <div
                className="bg-blue-300 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Project Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Enter a concise title for your research project"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Research Category*
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">Select a category</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Climate Science">Climate Science</option>
                    <option value="Medical Research">Medical Research</option>
                    <option value="Quantum Computing">Quantum Computing</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="abstract"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Abstract*
                  </label>
                  <textarea
                    id="abstract"
                    name="abstract"
                    rows={4}
                    value={formData.abstract}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500  text-gray-900"
                    placeholder="Provide a brief summary of your research project (250-300 words)"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    A concise summary of your research project, including objectives, methodology,
                    and expected outcomes.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="background"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Background & Significance*
                  </label>
                  <textarea
                    id="background"
                    name="background"
                    rows={6}
                    value={formData.background}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Explain the background and significance of your research"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Describe the context of your research, including relevant literature and why
                    this research is important.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="objectives"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Research Objectives*
                  </label>
                  <textarea
                    id="objectives"
                    name="objectives"
                    rows={4}
                    value={formData.objectives}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="List the specific objectives of your research project"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Clearly state the specific aims and objectives of your research project.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Methodology & Outcomes */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="methodology"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Research Methodology*
                  </label>
                  <textarea
                    id="methodology"
                    name="methodology"
                    rows={6}
                    value={formData.methodology}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Describe your research approach, methods, and techniques"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Detail the methods, techniques, and approaches you will use to achieve your
                    research objectives.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="expectedOutcomes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expected Outcomes & Impact*
                  </label>
                  <textarea
                    id="expectedOutcomes"
                    name="expectedOutcomes"
                    rows={6}
                    value={formData.expectedOutcomes}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Describe the expected outcomes and potential impact of your research"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Explain what you expect to achieve and how your research will contribute to the
                    field or society.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="attachments"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Supporting Documents (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={(e) => {
                              if (e.target.files) {
                                const filesArray = Array.from(e.target.files)
                                setFormData((prev) => ({
                                  ...prev,
                                  attachments: [...prev.attachments, ...filesArray]
                                }))
                              }
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, PPT, PPTX up to 10MB each
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Methodology Tips</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>A strong methodology section should:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Be detailed enough for others to replicate your work</li>
                          <li>Explain why you chose specific methods</li>
                          <li>Address potential limitations and how you&apos;ll mitigate them</li>
                          <li>Include data analysis approaches</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Timeline & Milestones */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="timeline.startDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Proposed Start Date*
                    </label>
                    <input
                      type="date"
                      id="timeline.startDate"
                      name="timeline.startDate"
                      value={formData.timeline.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="timeline.duration"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Duration*
                    </label>
                    <select
                      id="timeline.duration"
                      name="timeline.duration"
                      value={formData.timeline.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    >
                      <option value="">Select duration</option>
                      <option value="6 months">6 months</option>
                      <option value="1 year">1 year</option>
                      <option value="18 months">18 months</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="5 years">5 years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Milestones*
                    </label>
                    <button
                      type="button"
                      onClick={handleAddMilestone}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Clock className="h-4 w-4 mr-1" /> Add Milestone
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Define key milestones that will help track progress and trigger funding
                    releases.
                  </p>

                  {formData.timeline.milestones.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                      <Clock className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No milestones added
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add project milestones to create a clear timeline for your research.
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={handleAddMilestone}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Clock className="h-4 w-4 mr-2" /> Add First Milestone
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.timeline.milestones.map((milestone, index) => (
                        <div key={index} className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-medium text-gray-900">
                              Milestone #{index + 1}
                            </h4>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedMilestones = [...formData.timeline.milestones]
                                updatedMilestones.splice(index, 1)
                                setFormData((prev) => ({
                                  ...prev,
                                  timeline: {
                                    ...prev.timeline,
                                    milestones: updatedMilestones
                                  }
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
                                htmlFor={`milestone-title-${index}`}
                                className="block text-xs font-medium text-gray-700 mb-1"
                              >
                                Milestone Title*
                              </label>
                              <input
                                type="text"
                                id={`milestone-title-${index}`}
                                value={milestone.title}
                                onChange={(e) =>
                                  handleMilestoneChange(index, 'title', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                                placeholder="e.g., Data Collection Phase 1"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label
                                  htmlFor={`milestone-date-${index}`}
                                  className="block text-xs font-medium text-gray-700 mb-1"
                                >
                                  Expected Completion Date*
                                </label>
                                <input
                                  type="date"
                                  id={`milestone-date-${index}`}
                                  value={milestone.date}
                                  onChange={(e) =>
                                    handleMilestoneChange(index, 'date', e.target.value)
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor={`milestone-description-${index}`}
                                className="block text-xs font-medium text-gray-700 mb-1"
                              >
                                Description*
                              </label>
                              <textarea
                                id={`milestone-description-${index}`}
                                value={milestone.description}
                                onChange={(e) =>
                                  handleMilestoneChange(index, 'description', e.target.value)
                                }
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                                placeholder="Describe what will be accomplished in this milestone"
                              ></textarea>
                            </div>
                            <div>
                              <label
                                htmlFor={`milestone-deliverables-${index}`}
                                className="block text-xs font-medium text-gray-700 mb-1"
                              >
                                Deliverables*
                              </label>
                              <textarea
                                id={`milestone-deliverables-${index}`}
                                value={milestone.deliverables}
                                onChange={(e) =>
                                  handleMilestoneChange(index, 'deliverables', e.target.value)
                                }
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                                placeholder="List the specific deliverables for this milestone"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Calendar className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Timeline Importance</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>A well-structured timeline with clear milestones:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Helps funders understand your project progression</li>
                          <li>Creates accountability checkpoints</li>
                          <li>Facilitates milestone-based funding releases</li>
                          <li>Demonstrates your project management capabilities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Budget & Submission */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="budget.totalRequested"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Total Funding Requested*
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      id="budget.totalRequested"
                      name="budget.totalRequested"
                      value={formData.budget.totalRequested}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Personnel Costs
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddBudgetItem('personnel')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Personnel
                    </button>
                  </div>

                  {formData.budget.breakdown.personnel.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <p className="text-sm text-gray-500">No personnel costs added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.budget.breakdown.personnel.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-3">
                          <div>
                            <input
                              type="text"
                              value={item.role}
                              onChange={(e) =>
                                handleBudgetItemChange('personnel', index, 'role', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                              placeholder="Role (e.g., Research Assistant)"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={item.time}
                              onChange={(e) =>
                                handleBudgetItemChange('personnel', index, 'time', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                              placeholder="Time Commitment (e.g., 50%)"
                            />
                          </div>
                          <div className="flex items-center">
                            <div className="relative flex-grow rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="text"
                                value={item.cost}
                                onChange={(e) =>
                                  handleBudgetItemChange('personnel', index, 'cost', e.target.value)
                                }
                                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                                placeholder="Cost"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedItems = [...formData.budget.breakdown.personnel]
                                updatedItems.splice(index, 1)
                                setFormData((prev) => ({
                                  ...prev,
                                  budget: {
                                    ...prev.budget,
                                    breakdown: {
                                      ...prev.budget.breakdown,
                                      personnel: updatedItems
                                    }
                                  }
                                }))
                              }}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Equipment & Materials
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddBudgetItem('equipment')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Item
                    </button>
                  </div>

                  {formData.budget.breakdown.equipment.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <p className="text-sm text-gray-500">No equipment costs added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.budget.breakdown.equipment.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                handleBudgetItemChange(
                                  'equipment',
                                  index,
                                  'description',
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                              placeholder="Item Description"
                            />
                          </div>
                          <div className="flex items-center">
                            <div className="relative flex-grow rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="text"
                                value={item.cost}
                                onChange={(e) =>
                                  handleBudgetItemChange('equipment', index, 'cost', e.target.value)
                                }
                                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                                placeholder="Cost"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedItems = [...formData.budget.breakdown.equipment]
                                updatedItems.splice(index, 1)
                                setFormData((prev) => ({
                                  ...prev,
                                  budget: {
                                    ...prev.budget,
                                    breakdown: {
                                      ...prev.budget.breakdown,
                                      equipment: updatedItems
                                    }
                                  }
                                }))
                              }}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Travel & Conferences
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddBudgetItem('travel')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Travel Expense
                    </button>
                  </div>

                  {formData.budget.breakdown.travel.length === 0 ? (
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <p className="text-sm text-gray-500">No travel costs added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.budget.breakdown.travel.map((item, index) => (
                        <div key={index} className="grid grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                handleBudgetItemChange(
                                  'travel',
                                  index,
                                  'description',
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                              placeholder="Description (e.g., Conference attendance)"
                            />
                          </div>
                          <div className="flex items-center">
                            <div className="relative flex-grow rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="text"
                                value={item.cost}
                                onChange={(e) =>
                                  handleBudgetItemChange('travel', index, 'cost', e.target.value)
                                }
                                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
                                placeholder="Cost"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedItems = [...formData.budget.breakdown.travel]
                                updatedItems.splice(index, 1)
                                setFormData((prev) => ({
                                  ...prev,
                                  budget: {
                                    ...prev.budget,
                                    breakdown: {
                                      ...prev.budget.breakdown,
                                      travel: updatedItems
                                    }
                                  }
                                }))
                              }}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="budget.breakdown.other"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Other Costs
                  </label>
                  <textarea
                    id="budget.breakdown.other"
                    name="budget.breakdown.other"
                    value={formData.budget.breakdown.other}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Describe any other costs not covered above"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="budget.justification"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Budget Justification*
                  </label>
                  <textarea
                    id="budget.justification"
                    name="budget.justification"
                    value={formData.budget.justification}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Provide justification for your budget items"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Explain why each budget item is necessary for the successful completion of your
                    research project.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Budget Tips</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>A well-justified budget increases your chances of funding:</p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Be specific and realistic about costs</li>
                          <li>Clearly link budget items to research activities</li>
                          <li>Explain why each expense is necessary</li>
                          <li>Consider including cost-sharing if applicable</li>
                        </ul>
                      </div>
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

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save className="h-4 w-4 mr-2" /> Save Draft
                </button>

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
                    Submit Proposal <CheckCircle className="h-4 w-4 ml-2" />
                  </button>
                )}
              </div>
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
