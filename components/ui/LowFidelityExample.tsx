'use client'

import { Home, FileText, Users, Settings, Menu, Search, Bell } from 'lucide-react'

const DesktopView = () => (
  <div className="w-full aspect-[16/10] bg-gray-100 rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex">
    {/* Sidebar */}
    <aside className="w-56 bg-gray-200 p-4 border-r border-gray-300">
      <div className="h-8 w-28 bg-gray-300 rounded mb-6 animate-pulse"></div>
      <nav className="space-y-3">
        {[
          { icon: Home, label: 'Dashboard' },
          { icon: FileText, label: 'Documents' },
          { icon: Users, label: 'Team' },
          { icon: Settings, label: 'Settings' },
        ].map((item, index) => (
          <div 
            key={index} 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
          >
            <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
              <item.icon size={16} className="text-gray-500" />
            </div>
            <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </nav>
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <header className="h-14 bg-white shadow-sm flex items-center justify-between px-6 border-b border-gray-200">
        <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 cursor-pointer">
            <Search size={16} className="text-gray-500" />
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 cursor-pointer">
            <Bell size={16} className="text-gray-500" />
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="mb-6">
          <div className="h-6 w-36 bg-gray-300 rounded mb-4 animate-pulse"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-24 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
                <div className="h-3 w-20 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </div>
)

const MobileView = () => (
  <div className="w-[240px] h-[400px] bg-gray-100 rounded-[2rem] p-4">
    {/* Header */}
    <div className="mb-6">
      <div className="w-32 h-5 bg-gray-300 rounded animate-pulse mb-2"></div>
      <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
    </div>
    {/* Card */}
    <div className="h-32 bg-gray-300 rounded-xl animate-pulse mb-6"></div>
    {/* List */}
    <div className="space-y-3">
      {[1, 2].map((i) => (
        <div key={i} className="h-14 bg-gray-300 rounded-lg animate-pulse"></div>
      ))}
    </div>
  </div>
)

export default function LowFidelityExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <DesktopView />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <MobileView />
      </div>
    </div>
  )
} 