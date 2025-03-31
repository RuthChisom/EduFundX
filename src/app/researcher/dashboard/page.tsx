'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  FileText,
  DollarSign,
  PlusCircle,
  Search,
  Bell,
  ChevronDown,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react'

export default function ResearcherDashboard() {
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('projects')
  const router = useRouter()

  // Mock researcher profile data
  const [researcherProfile] = useState({
    name: 'Dr. Alex Johnson',
    institution: 'University of Technology',
    department: 'Computer Science',
    position: 'Associate Professor',
    researchAreas: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    profileImage: '/placeholder.svg?height=100&width=100',
    stats: {
      totalFunding: 285000,
      activeProjects: 3,
      completedProjects: 2,
      publications: 24
    }
  })

  // Mock research projects data
  const [projects] = useState([
    {
      id: 1,
      title: 'AI-Driven Climate Change Prediction Models',
      status: 'Active',
      fundingReceived: 120000,
      fundingGoal: 150000,
      fundingProgress: 80,
      startDate: '2024-01-15',
      endDate: '2025-07-15',
      nextMilestone: 'Data Integration Phase',
      nextMilestoneDate: '2024-06-30',
      description:
        'Developing advanced AI models to predict climate change patterns with higher accuracy using multi-source data integration.'
    },
    {
      id: 2,
      title: 'Quantum Computing Applications in Cryptography',
      status: 'Active',
      fundingReceived: 95000,
      fundingGoal: 200000,
      fundingProgress: 47.5,
      startDate: '2023-11-01',
      endDate: '2025-10-31',
      nextMilestone: 'Algorithm Development',
      nextMilestoneDate: '2024-07-15',
      description:
        'Exploring quantum-resistant cryptographic algorithms and their implementation in existing security systems.'
    },
    {
      id: 3,
      title: 'Neural Networks for Medical Imaging Analysis',
      status: 'Active',
      fundingReceived: 70000,
      fundingGoal: 120000,
      fundingProgress: 58.3,
      startDate: '2023-09-01',
      endDate: '2024-12-31',
      nextMilestone: 'Model Training',
      nextMilestoneDate: '2024-06-15',
      description:
        'Developing neural network models to improve the accuracy of medical image analysis for early disease detection.'
    },
    {
      id: 4,
      title: 'Blockchain for Academic Credential Verification',
      status: 'Completed',
      fundingReceived: 85000,
      fundingGoal: 85000,
      fundingProgress: 100,
      startDate: '2022-05-01',
      endDate: '2023-06-30',
      description:
        'Implemented a blockchain-based system for verifying academic credentials, reducing fraud and improving verification efficiency.'
    },
    {
      id: 5,
      title: 'Sustainable Energy Storage Solutions',
      status: 'Completed',
      fundingReceived: 110000,
      fundingGoal: 110000,
      fundingProgress: 100,
      startDate: '2021-10-01',
      endDate: '2023-03-31',
      description:
        'Researched and developed novel energy storage solutions using sustainable materials with improved efficiency and reduced environmental impact.'
    }
  ])

  // Mock proposals data
  const [proposals] = useState([
    {
      id: 1,
      title: 'Explainable AI for Healthcare Decision Support',
      status: 'Under Review',
      submissionDate: '2024-04-10',
      fundingRequested: 175000,
      reviewStage: 'Technical Evaluation',
      category: 'Healthcare AI',
      description:
        'Developing explainable AI models that can assist healthcare professionals in making diagnostic and treatment decisions while providing clear explanations for their recommendations.'
    },
    {
      id: 2,
      title: 'Federated Learning for Privacy-Preserving Data Analysis',
      status: 'Draft',
      lastEdited: '2024-04-05',
      fundingRequested: 150000,
      completionStatus: 75,
      category: 'Privacy & Security',
      description:
        'Implementing federated learning techniques to enable collaborative machine learning across organizations without sharing sensitive data, preserving privacy while improving model performance.'
    }
  ])

  // Mock funding opportunities data
  const [fundingOpportunities] = useState([
    {
      id: 1,
      title: 'Advanced Computing Research Initiative',
      funder: 'National Science Foundation',
      deadline: '2024-07-15',
      fundingAmount: '100,000 - 250,000',
      category: 'Computer Science',
      match: 'High Match (92%)'
    },
    {
      id: 2,
      title: 'AI for Social Good Grant',
      funder: 'Tech for Humanity Foundation',
      deadline: '2024-06-30',
      fundingAmount: '50,000 - 150,000',
      category: 'Artificial Intelligence',
      match: 'Medium Match (78%)'
    },
    {
      id: 3,
      title: 'Climate Technology Innovation Fund',
      funder: 'Global Climate Initiative',
      deadline: '2024-08-20',
      fundingAmount: '75,000 - 200,000',
      category: 'Climate Science',
      match: 'Medium Match (65%)'
    }
  ])

  // Mock notifications data
  const [notifications] = useState([
    {
      id: 1,
      type: 'funding',
      message:
        'Your project "AI-Driven Climate Change Prediction Models" received a new funding contribution of $25,000',
      date: '2024-04-15',
      read: false
    },
    {
      id: 2,
      type: 'milestone',
      message: 'Upcoming milestone "Data Integration Phase" due in 15 days',
      date: '2024-04-12',
      read: true
    },
    {
      id: 3,
      type: 'proposal',
      message:
        'Your proposal "Explainable AI for Healthcare Decision Support" has moved to technical evaluation stage',
      date: '2024-04-08',
      read: true
    }
  ])

  // Check if wallet is connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { ethereum } = window as any
        if (ethereum && ethereum.isMetaMask) {
          const accounts = await ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
  }, [])

  // Handle disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress('')
    router.push('/auth/researcher-login')
  }

  // Helper function to safely format dates
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!walletAddress) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h1>
        <p className="text-gray-600 mb-6">
          Please connect your wallet to access the researcher dashboard.
        </p>
        <Link
          href="/researcher/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Connect Wallet
        </Link>
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
            <div className="relative">
              <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
            <div className="flex items-center">
              <img
                src={researcherProfile.profileImage || '/placeholder.svg'}
                alt={researcherProfile.name}
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-sm text-gray-700">{researcherProfile.name}</span>
              <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-gray-100 py-2 px-4 rounded-md text-sm text-gray-700 hover:bg-gray-200"
            >
              Disconnect
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center">
                <img
                  src={researcherProfile.profileImage || '/placeholder.svg'}
                  alt={researcherProfile.name}
                  className="h-16 w-16 rounded-full border-2 border-white"
                />
                <div className="ml-4 text-white">
                  <h1 className="text-xl font-bold">{researcherProfile.name}</h1>
                  <p className="text-blue-100">
                    {researcherProfile.position} • {researcherProfile.institution}
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Link
                  href="/researcher/profile"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50"
                >
                  Edit Profile
                </Link>
                <Link
                  href="/researcher/proposals/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> New Proposal
                </Link>
              </div>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-3/4">
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/3 mb-4 md:mb-0 md:pr-4">
                    <h3 className="text-sm font-medium text-gray-500">Research Areas</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {researcherProfile.researchAreas.map((area, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 mb-4 md:mb-0 md:px-2">
                    <h3 className="text-sm font-medium text-gray-500">Wallet Address</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {walletAddress.substring(0, 6)}...
                      {walletAddress.substring(walletAddress.length - 4)}
                    </p>
                  </div>
                  <div className="w-full md:w-1/3 md:pl-4">
                    <h3 className="text-sm font-medium text-gray-500">ORCID ID</h3>
                    <p className="mt-1 text-sm text-gray-900">
                      <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                        0000-0002-1825-0097 <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/4 mt-4 md:mt-0">
                <div className="flex justify-end">
                  <Link
                    href="/researcher/publications"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <BookOpen className="h-4 w-4 mr-1" /> {researcherProfile.stats.publications}{' '}
                    Publications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">Total Funding</h3>
                <p className="text-2xl font-bold text-gray-900">
                  ${researcherProfile.stats.totalFunding.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {researcherProfile.stats.activeProjects}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {researcherProfile.stats.completedProjects}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">Publications</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {researcherProfile.stats.publications}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'projects'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Research Projects
              </button>
              <button
                onClick={() => setActiveTab('proposals')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'proposals'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Proposals
              </button>
              <button
                onClick={() => setActiveTab('funding')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'funding'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Funding Opportunities
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Your Research Projects</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option value="all">All Projects</option>
                      <option value="active">Active Only</option>
                      <option value="completed">Completed Only</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                              <span
                                className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  project.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                          </div>
                          <Link
                            href={`/researcher/projects/${project.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                          >
                            View Details
                          </Link>
                        </div>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-500 mb-1">
                            <span>Funding Progress</span>
                            <span>
                              ${project.fundingReceived.toLocaleString()} of $
                              {project.fundingGoal.toLocaleString()} ({project.fundingProgress}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${project.fundingProgress}%` }}
                            ></div>
                          </div>
                        </div>

                        {project.status === 'Active' && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-500">
                                PROJECT TIMELINE
                              </h4>
                              <p className="mt-1 text-sm text-gray-900">
                                {formatDate(project.startDate)} - {formatDate(project.endDate)}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-500">NEXT MILESTONE</h4>
                              <p className="mt-1 text-sm text-gray-900">{project.nextMilestone}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-500">DUE DATE</h4>
                              <p className="mt-1 text-sm text-gray-900">
                                {formatDate(project.nextMilestoneDate)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Proposals Tab */}
            {activeTab === 'proposals' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Your Research Proposals</h2>
                  <Link
                    href="/researcher/proposals/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> New Proposal
                  </Link>
                </div>

                <div className="space-y-6">
                  {proposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="text-lg font-medium text-gray-900">
                                {proposal.title}
                              </h3>
                              <span
                                className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  proposal.status === 'Under Review'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {proposal.status}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{proposal.description}</p>
                          </div>
                          <Link
                            href={`/researcher/proposals/${proposal.id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                          >
                            View Details
                          </Link>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-xs font-medium text-gray-500">CATEGORY</h4>
                            <p className="mt-1 text-sm text-gray-900">{proposal.category}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-gray-500">FUNDING REQUESTED</h4>
                            <p className="mt-1 text-sm text-gray-900">
                              ${proposal.fundingRequested.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-medium text-gray-500">
                              {proposal.status === 'Under Review' ? 'REVIEW STAGE' : 'LAST EDITED'}
                            </h4>
                            <p className="mt-1 text-sm text-gray-900">
                              {proposal.status === 'Under Review'
                                ? proposal.reviewStage
                                : proposal.lastEdited}
                            </p>
                          </div>
                        </div>

                        {proposal.status === 'Draft' && (
                          <div className="mt-4">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                              <span>Completion Status</span>
                              <span>{proposal.completionStatus}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${proposal.completionStatus}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Funding Opportunities Tab */}
            {activeTab === 'funding' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Funding Opportunities</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search opportunities..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    </div>
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                      <option value="all">All Categories</option>
                      <option value="cs">Computer Science</option>
                      <option value="ai">Artificial Intelligence</option>
                      <option value="climate">Climate Science</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Opportunity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Funder
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Funding Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Deadline
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Match
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fundingOpportunities.map((opportunity) => (
                        <tr key={opportunity.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {opportunity.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{opportunity.funder}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {opportunity.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${opportunity.fundingAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{opportunity.deadline}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-600">{opportunity.match}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              href={`/researcher/funding/${opportunity.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Notifications</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-6 ${notification.read ? '' : 'bg-blue-50'}`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {notification.type === 'funding' ? (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    ) : notification.type === 'milestone' ? (
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="mt-1 text-sm text-gray-500">{notification.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 text-right">
            <Link
              href="/researcher/notifications"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all notifications
            </Link>
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
