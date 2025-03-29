'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FunderLogin() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    const { ethereum } = window as any;
    return ethereum && ethereum.isMetaMask;
  };

  // Handle wallet connection
  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');
    
    try {
      if (!isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      const { ethereum } = window as any;
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        
        // Simulate API call to authenticate funder
        setTimeout(() => {
          // Redirect to dashboard after successful connection
          router.push('/funder/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <h2 className="text-center text-3xl font-extrabold text-green-700">
            ResearchConnect
          </h2>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Funder Sign In
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Connect your wallet to access the funding platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {walletAddress ? (
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Wallet Connected</h3>
              <p className="mt-1 text-sm text-gray-600">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </p>
              <p className="mt-4 text-sm text-gray-600">Redirecting to dashboard...</p>
              <div className="mt-4">
                <div className="w-12 h-1 mx-auto bg-green-100 rounded-full">
                  <div className="w-6 h-1 bg-green-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                <div>
                  <button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        Connect Wallet
                      </span>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        No wallet?
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <a
                      href="https://metamask.io/download/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-500"
                    >
                      Install MetaMask
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Link href="/" className="font-medium text-green-600 hover:text-green-500">
                    Return to home
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}