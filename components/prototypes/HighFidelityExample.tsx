'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LucideIcon } from 'lucide-react'
import { 
  ArrowLeft, Home, Bell, 
  Plus, CreditCard, ChevronRight, Wallet 
} from 'lucide-react'
import { cn } from "@/lib/utils"

type ActiveScreen = 'main' | 'transactions' | 'cards'

interface MenuItemType {
  icon: LucideIcon
  label: string
  screen: ActiveScreen
}

export default function HighFidelityExample({ type }: { type: 'desktop' | 'mobile' }) {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('main')
  const [notifications, setNotifications] = useState(3)
  const [balance] = useState(12450.00)

  const transactions = [
    { name: 'Netflix', amount: -13.99, date: 'Today', icon: '📺' },
    { name: 'Spotify', amount: -9.99, date: 'Yesterday', icon: '🎵' },
    { name: 'Salary', amount: 5000, date: 'Mar 1', icon: '💰' },
    { name: 'Amazon', amount: -79.99, date: 'Mar 1', icon: '📦' },
  ]

  const cards = [
    { name: 'Physical Debit Card', last4: '4242', type: 'Visa', color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { name: 'Virtual Card', last4: '8353', type: 'Mastercard', color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
  ]

  const menuItems: MenuItemType[] = [
    { icon: Home, label: 'Dashboard', screen: 'main' },
    { icon: Wallet, label: 'Transactions', screen: 'transactions' },
    { icon: CreditCard, label: 'Cards', screen: 'cards' },
  ]

  const handleScreenChange = useCallback((screen: ActiveScreen) => {
    requestAnimationFrame(() => {
      setActiveScreen(screen)
    })
  }, [])

  if (type === 'mobile') {
    return (
      <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
        {/* Status Bar */}
        <div className="h-6 bg-black flex items-center justify-between px-4">
          <div className="text-white text-xs">9:41</div>
          <div className="flex items-center space-x-2">
            <div className="text-white text-xs">100%</div>
            <div className="w-4 h-2 border border-white rounded-sm" />
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 p-4 overflow-auto">
          {activeScreen === 'main' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-gray-600">John Doe</p>
                </div>
                <button 
                  className="relative"
                  onClick={() => setNotifications(0)}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              <div className="bg-blue-500 rounded-2xl p-4 text-white mb-6">
                <div className="text-sm opacity-80 mb-1">Total Balance</div>
                <div className="text-2xl font-bold mb-4">${balance.toLocaleString()}</div>
                <div className="flex justify-between items-center">
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                    Send
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">Recent Transactions</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleScreenChange('transactions')}
                    className="text-sm text-gray-600"
                  >
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {transactions.slice(0, 3).map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{tx.icon}</div>
                        <div>
                          <div className="font-medium">{tx.name}</div>
                          <div className="text-sm text-gray-600">{tx.date}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : ''}`}>
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeScreen === 'transactions' && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Button variant="ghost" size="sm" onClick={() => handleScreenChange('main')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-xl font-bold">All Transactions</h1>
              </div>
              <div className="space-y-3">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{tx.icon}</div>
                      <div>
                        <div className="font-medium">{tx.name}</div>
                        <div className="text-sm text-gray-600">{tx.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : ''}`}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeScreen === 'cards' && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Button variant="ghost" size="sm" onClick={() => handleScreenChange('main')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-xl font-bold">Your Cards</h1>
              </div>
              <div className="space-y-4">
                {cards.map((card, i) => (
                  <div key={i} className={`${card.color} p-6 rounded-xl text-white`}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-sm opacity-80">{card.name}</div>
                        <div className="font-medium mt-1">•••• {card.last4}</div>
                      </div>
                      <div className="text-2xl">{card.type === 'Visa' ? '𝗩' : '◈'}</div>
                    </div>
                    <div className="text-sm opacity-80">John Doe</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="h-16 border-t bg-white flex items-center justify-around px-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleScreenChange(item.screen)}
              className={`flex flex-col items-center space-y-1 ${
                activeScreen === item.screen ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">F</div>
          <div className="font-medium">Finance App</div>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleScreenChange(item.screen)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg",
                "will-change-transform transform-gpu",
                "hover:bg-gray-100 transition-transform duration-200",
                activeScreen === item.screen ? "bg-gray-100 text-black" : "text-gray-600"
              )}
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 bg-white border-b flex items-center justify-between px-4">
          <div className="text-lg font-medium">
            {menuItems.find(item => item.screen === activeScreen)?.label}
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="relative"
              onClick={() => setNotifications(0)}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              JD
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">
          {activeScreen === 'main' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">Total Balance</div>
                  <div className="text-2xl font-bold">${balance.toLocaleString()}</div>
                  <div className="text-xs text-green-600 mt-2">+12.5% from last month</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">Active Cards</div>
                  <div className="text-2xl font-bold">{cards.length}</div>
                  <div className="text-xs text-blue-600 mt-2">All cards active</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">This Month</div>
                  <div className="text-2xl font-bold">$3,240</div>
                  <div className="text-xs text-green-600 mt-2">+12.5% from last month</div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Recent Transactions</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-sm"
                    onClick={() => handleScreenChange('transactions')}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {transactions.slice(0, 3).map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{tx.icon}</div>
                        <div>
                          <div className="font-medium">{tx.name}</div>
                          <div className="text-sm text-gray-600">{tx.date}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : ''}`}>
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeScreen === 'transactions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">All Transactions</h2>
                <Input 
                  placeholder="Search transactions..." 
                  className="w-64"
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="space-y-px">
                  {transactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{tx.icon}</div>
                        <div>
                          <div className="font-medium">{tx.name}</div>
                          <div className="text-sm text-gray-600">{tx.date}</div>
                        </div>
                      </div>
                      <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : ''}`}>
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeScreen === 'cards' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium">Your Cards</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Card
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {cards.map((card, i) => (
                  <div key={i} className={`${card.color} p-6 rounded-xl text-white`}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-sm opacity-80">{card.name}</div>
                        <div className="font-medium mt-1">•••• {card.last4}</div>
                      </div>
                      <div className="text-2xl">{card.type === 'Visa' ? '𝗩' : '◈'}</div>
                    </div>
                    <div className="text-sm opacity-80">John Doe</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 