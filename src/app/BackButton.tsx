'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BackButton() {
  const pathname = usePathname()

  // Don't show the button on the home page
  if (pathname === '/') {
    return null
  }

  return (
    <div className="absolute top-2 left-2 z-10">
      <Link
        href="/"
        className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg
          className="-ml-1 mr-1 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Home
      </Link>
    </div>
  )
}
