import { useState } from 'react'
import { Home, FileText, Users, Settings, Search, Bell, Smartphone, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LowFidelityExample() {
  const [view, setView] = useState<'mobile' | 'desktop'>('mobile')

  const MobileView = () => (
    <div className="flex flex-col h-[500px] w-[280px] mx-auto bg-gray-100 rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <header className="bg-gray-200 p-3">
        <div className="flex items-center justify-between">
          <div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* User Story */}
        <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex-shrink-0 w-14 space-y-1">
              <div className="h-14 w-14 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Posts */}
        {[1, 2, 3].map((post) => (
          <div key={post} className="bg-white p-3 rounded-lg shadow-sm space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
              <div className="space-y-1">
                <div className="w-20 h-3 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-14 h-2 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-32 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="w-14 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-14 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gray-200 border-t border-gray-300">
        <ul className="flex justify-around p-2">
          {[Home, Search, Bell, Users].map((Icon, index) => (
            <li key={index}>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                  <Icon size={16} className="text-gray-500" />
                </div>
                <div className="w-10 h-2 bg-gray-300 rounded mt-1 animate-pulse"></div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  const DesktopView = () => (
    <div className="w-full aspect-[16/9] bg-gray-100 rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex">
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
        <header className="h-14 bg-white shadow-sm flex items-center justify-between px-4 border-b border-gray-200">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 cursor-pointer">
              <Search size={16} className="text-gray-500" />
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 cursor-pointer">
              <Bell size={16} className="text-gray-500" />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 overflow-auto bg-gray-50">
          <div className="mb-4">
            <div className="h-6 w-36 bg-gray-300 rounded mb-3 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-24 bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-200">
                  <div className="h-3 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="h-6 w-36 bg-gray-300 rounded mb-3 animate-pulse"></div>
            <div className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow duration-200">
              <div className="h-3 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-3 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )

  const buttonClasses = 'flex items-center space-x-2 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-200'

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => setView('mobile')}
          className={`flex items-center space-x-2 bg-black text-white border border-white ${
            view === 'mobile' 
              ? 'bg-white !text-black pointer-events-none' 
              : 'hover:bg-white hover:text-black transition-colors duration-200'
          }`}
        >
          <Smartphone className="h-4 w-4" />
          <span>Mobile</span>
        </Button>
        <Button
          onClick={() => setView('desktop')}
          className={`flex items-center space-x-2 bg-black text-white border border-white ${
            view === 'desktop' 
              ? 'bg-white !text-black pointer-events-none' 
              : 'hover:bg-white hover:text-black transition-colors duration-200'
          }`}
        >
          <Monitor className="h-4 w-4" />
          <span>Desktop</span>
        </Button>
      </div>
      <div className="w-full overflow-x-hidden">
        {view === 'mobile' ? <MobileView /> : <DesktopView />}
      </div>
    </div>
  )
} 