'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex flex-col w-64 bg-black text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin</h1>
        </div>
        <nav className="mt-10 flex-1">
          <a href="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Dashboard</a>
          <a href="/admin/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Posts</a>
          <a href="/admin/authors" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Authors</a>
          <a href="/admin/categories" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Categories</a>
          <a href="/admin/tags" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Tags</a>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="flex-shrink-0 w-64 bg-black text-white">
            <div className="p-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Admin</h1>
              <button onClick={() => setSidebarOpen(false)} className="text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-10 flex-1">
              <a href="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Dashboard</a>
              <a href="/admin/posts" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Posts</a>
              <a href="/admin/authors" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Authors</a>
              <a href="/admin/categories" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Categories</a>
              <a href="/admin/tags" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800">Tags</a>
            </nav>
          </div>
          <div className="flex-1" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}

      <main className="flex-1 flex flex-col bg-white relative">
        {/* Mobile menu button */}
        <div className="md:hidden p-4">
          <button onClick={() => setSidebarOpen(true)} className="text-black focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
