'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FunderDashboard() {
  // const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState<{
    id: number;
    title: string;
    researcher: string;
    institution: string;
    funded: number;
    goal: number;
    category: string;
    status: string;
    plagiarism: number;
  } | null>(null);
  
  const [fundingAmount, setFundingAmount] = useState('')
  const router = useRouter()

  // Mock data for funded projects
  const [fundedProjects, setFundedProjects] = useState([
    {
      id: 1,
      title: 'Climate Change Mitigation Strategies',
      researcher: 'Dr. Sarah Johnson',
      institution: 'Green University',
      funded: 75000,
      goal: 100000,
      category: 'Environmental Science',
      status: 'In Progress',
      plagiarism: 15
    },
    {
      id: 2,
      title: 'Quantum Computing Applications in Medicine',
      researcher: 'Prof. David Chen',
      institution: 'Tech Institute',
      funded: 120000,
      goal: 120000,
      category: 'Computer Science',
      status: 'Funded',
      plagiarism: 50
    },
    {
      id: 3,
      title: 'Neural Networks for Early Disease Detection',
      researcher: 'Dr. Maya Patel',
      institution: 'Medical Research Center',
      funded: 45000,
      goal: 200000,
      category: 'Healthcare',
      status: 'Seeking Funding',
      plagiarism: 75
    }
  ])
  
  const getFundingColor = (percent: number) => {
    if (percent <= 30) return 'bg-red-500'  // Low funding (Red)
    if (percent <= 70) return 'bg-orange-500'  // Medium funding (Orange)
    return 'bg-green-600'  // High funding (Green)
  }
  

  // Mock data for funding stats
  const [fundingStats] = useState({
    totalFunded: 240000,
    projectsFunded: 5,
    activeProjects: 3,
    completedProjects: 2
  })

  const getPlagiarismColor = (percent: number) => {
    if (percent <= 30) return 'bg-green-600' // Low plagiarism (Green)
    if (percent <= 60) return 'bg-orange-500' // Moderate plagiarism (Orange)
    return 'bg-red-600' // High plagiarism (Red)
  }
  

  useEffect(() => {
    // Check if user has connected wallet
    const checkConnection = async () => {
      try {
        const { ethereum } = window as any
        if (ethereum && ethereum.isMetaMask) {
          const accounts = await ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setAddress(accounts[0])
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      } finally {
        setLoading(false)
      }
    }

    checkConnection()
  }, [])

  const openFundingModal = (project : any) => {
    console.log('Opening modal for:', project); // Debugging
    setSelectedProject(project)
    setFundingAmount('')
  }

  const closeFundingModal = () => {
    setSelectedProject(null)
  }

  const handleFundingSubmit = () => {
    const amount = parseFloat(fundingAmount);
    
    if (!selectedProject || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
  
    // Ensure the funding doesn't exceed the goal
    const maxFunding = selectedProject.goal - selectedProject.funded;
    if (amount > maxFunding) {
      alert(`You can't fund more than $${maxFunding}`);
      return;
    }
  
    // Update the fundedProjects state
    setFundedProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProject.id
          ? { ...project, funded: project.funded + amount }
          : project
      )
    );
    alert(`You have supported ${selectedProject?.title} with  $${amount}! Thank you!!`);
    closeFundingModal();
  };
  

  // Handle disconnect wallet
  const disconnectWallet = () => {
    setAddress('')
    // localStorage.removeItem('funderProfile') // Remove profile data from local storage

    router.push('/auth/funder-login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!address) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h1>
        <p className="text-gray-600 mb-6">
          Please connect your wallet to access the funder dashboard.
        </p>
        <Link
          href="/auth/funder-login"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
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
          <Link href="/" className="text-2xl font-bold text-green-700">
            EDUFUNDX
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {address.substring(0, 6)}...{address.substring(address.length - 4)}
            </span>
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
        <div className="bg-green-600 rounded-lg shadow-lg p-6 text-white mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome to your Funder Dashboard</h1>
          <p>Discover and support promising research projects.</p>
        </div>

        {/* Funding stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Total Funded</h3>
            <p className="text-2xl font-bold text-gray-900">
              ${fundingStats.totalFunded.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Projects Funded</h3>
            <p className="text-2xl font-bold text-gray-900">{fundingStats.projectsFunded}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Active Projects</h3>
            <p className="text-2xl font-bold text-gray-900">{fundingStats.activeProjects}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
            <p className="text-2xl font-bold text-gray-900">{fundingStats.completedProjects}</p>
          </div>
        </div>

        {/* Funded Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Funded Projects</h2>
            <Link href="/funder/explore" className="text-green-600 hover:text-green-700">
              Explore More Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundedProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'Funded'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {project.researcher} • {project.institution}
                  </p>

                  {/* Project Category */}
                  <p className="mt-1 text-xs text-gray-500">{project.category}</p>

                  {/* Plagiarism Progress Bar */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">Plagiarism: {project.plagiarism}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className={`h-2.5 rounded-full ${getPlagiarismColor(project.plagiarism)}`}
                        style={{ width: `${project.plagiarism}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Funding Progress Bar */}
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-green-600">
                            {Math.round((project.funded / project.goal) * 100)}% Funded
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-green-600">
                            ${project.funded.toLocaleString()} / ${project.goal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${Math.round((project.funded / project.goal) * 100)}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getFundingColor(
                            Math.round((project.funded / project.goal) * 100)
                          )}`}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex space-x-2">
                    <Link
                      href={`/funder/projects/${project.id}`}
                      className="flex-1 text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      View Details
                    </Link>

                    {project.status !== 'Funded' && (
                      <button 
                        onClick={() => openFundingModal(project)}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Add Funding
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          </div>
          {/* Funding Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Fund {selectedProject.title}</h3>
            <p className="text-sm text-gray-600">Needs: ${selectedProject.goal - selectedProject.funded}</p>
            <input
  type="number"
  value={fundingAmount}
  onChange={(e) => {
    const value = Number(e.target.value);
    const maxValue = selectedProject ? selectedProject.goal - selectedProject.funded : 0;

    if (value > maxValue) {
      setFundingAmount(maxValue.toString()); // Restrict input
    } else {
      setFundingAmount(e.target.value);
    }
  }}
  className="w-full p-2 border rounded mt-2"
  placeholder="Enter amount"
/>

            <div className="flex justify-end mt-4">
              <button
                onClick={closeFundingModal}
                className="mr-2 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleFundingSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Fund
              </button>
            </div>
          </div>
        </div>
      )}
        </div>

        {/* Recommended Projects Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recommended Projects</h2>
            <button className="text-green-600 hover:text-green-700">View All</button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Project
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Researcher
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
                    Funding Goal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Renewable Energy Storage Solutions
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Dr. James Wilson</div>
                    <div className="text-xs text-gray-500">Energy Institute</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Energy
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$150,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">45% ($67,500)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Fund</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">AI for Drug Discovery</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">Dr. Emily Rodriguez</div>
                    <div className="text-xs text-gray-500">Bio Research Lab</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Healthcare
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$250,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">25% ($62,500)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Fund</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <Link href="/" className="text-xl font-bold text-green-700">
                EDUFUNDX
              </Link>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-sm text-gray-500 md:text-right">
                &copy; 2025 EDUFUNDX. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
