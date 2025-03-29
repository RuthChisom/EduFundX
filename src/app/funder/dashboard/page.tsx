'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FunderDashboard() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has connected wallet
    const checkConnection = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum && ethereum.isMetaMask) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h1>
        <p className="text-gray-600 mb-6">Please connect your wallet to access the funder dashboard.</p>
        <Link 
          href="/auth/funder-login"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Connect Wallet
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-700">
            ResearchConnect
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {address.substring(0, 6)}...{address.substring(address.length - 4)}
            </span>
            <button className="bg-gray-100 py-2 px-4 rounded-md text-sm text-gray-700 hover:bg-gray-200">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6