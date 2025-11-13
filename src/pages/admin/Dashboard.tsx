import { useState, useEffect } from 'react'
import { useHybridUsers } from '../../hooks/useHybridUsers'
import { useApiUsers } from '../../hooks/useApiUsers'
import { FaUsers, FaDatabase, FaChartLine, FaChartBar, FaChartPie, FaBolt } from 'react-icons/fa'
import { MdTrendingUp } from 'react-icons/md'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function Dashboard() {
  const { data: localUsers = [], isLoading } = useHybridUsers()
  const { data: apiUsers = [] } = useApiUsers()
  const [showAllUsers, setShowAllUsers] = useState(false)

  // Debug log
  console.log('Local Users:', localUsers, 'Count:', localUsers.length)

  const stats = [
    {
      title: 'Local Users',
      value: localUsers.length,
      icon: FaUsers,
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      textColor: 'text-indigo-600',
      shadowColor: 'shadow-indigo-200'
    },
    {
      title: 'API Products',
      value: apiUsers.length,
      icon: FaDatabase,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      textColor: 'text-emerald-600',
      shadowColor: 'shadow-emerald-200'
    },
    {
      title: 'Total Records',
      value: localUsers.length + apiUsers.length,
      icon: MdTrendingUp,
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      bgGradient: 'from-violet-50 to-purple-50',
      textColor: 'text-violet-600',
      shadowColor: 'shadow-violet-200'
    },
    {
      title: 'Active Sessions',
      value: 24,
      icon: FaChartLine,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgGradient: 'from-orange-50 to-red-50',
      textColor: 'text-orange-600',
      shadowColor: 'shadow-orange-200'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white border-b border-gray-200 p-8 mb-8 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-5xl font-black text-black">
                Dashboard Overview
              </h1>
              <p className="text-gray-600 mt-2 text-lg font-medium">Welcome back! </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="group relative bg-white rounded-3xl shadow-2xl transition-all duration-300 border border-gray-200 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-all duration-500`} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative px-2 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-500 rounded-xl shadow-lg transition-all duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">{stat.title}</p>
                      <p className="text-2xl font-black text-gray-900 transition-all duration-300">{stat.value.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="px-2 py-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-indigo-200/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-500 rounded-xl shadow-lg">
                    <FaUsers className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">Recent Local Users</h3>
                    <p className="text-xs text-gray-600 font-medium">Latest registered members</p>
                  </div>
                </div>
                <div 
                  className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 cursor-pointer hover:bg-indigo-100 transition-colors"
                  onClick={() => setShowAllUsers(!showAllUsers)}
                >
                  <span className="text-xs font-bold text-indigo-700">{localUsers.length} total {showAllUsers ? '▲' : '▼'}</span>
                </div>
              </div>
            </div>
            
            <div className="px-2 py-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500 text-sm font-medium">Loading users...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {localUsers && localUsers.length > 0 ? (
                      localUsers.slice(0, showAllUsers ? localUsers.length : 4).map((user) => (
                        <div key={user.id} className="flex items-center space-x-3 px-2 py-3 bg-white rounded-xl transition-all duration-300 border border-gray-200 shadow-md">
                          <div className="relative">
                            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-white font-black text-sm">
                                {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                              <FaBolt className="w-2 h-2 text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {user.firstName || 'Unknown'} {user.lastName || 'User'}
                            </p>
                            <p className="text-xs text-gray-600 truncate font-medium">{user.email || 'No email'}</p>
                          </div>
                          <div className="text-right bg-gray-50 rounded-lg p-2 border border-gray-200">
                            <p className="text-xs text-gray-500 font-medium">#{user.id}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FaUsers className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm font-medium">No local users found</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-8 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 border-b border-emerald-200/30">
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-3 bg-red-500 rounded-2xl shadow-lg">
                  <FaDatabase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">Top Products</h3>
                  <p className="text-sm text-gray-600 font-medium">{apiUsers.length} products available</p>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-8">
              {apiUsers.length > 0 ? (
                <ChartContainer
                  config={{
                    price: {
                      label: "Price",
                      color: "#ef4444",
                    },
                    stock: {
                      label: "Stock",
                      color: "#10b981",
                    },
                  }}
                  className="h-[300px]"
                >
                  <AreaChart
                    data={apiUsers.slice(0, 8).map((product, index) => ({
                      name: product.title.length > 15 ? product.title.substring(0, 15) + '...' : product.title,
                      price: product.price,
                      stock: product.stock,
                      fullName: product.title,
                      index: index + 1
                    }))}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <defs>
                      <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient id="fillStock" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} className="stroke-muted" />
                    <XAxis 
                      dataKey="name" 
                      className="text-xs fill-muted-foreground"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis className="text-xs fill-muted-foreground" />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          formatter={(value, name, props) => {
                            if (name === 'price') {
                              return [`$${value}`, props.payload?.fullName || 'Price']
                            }
                            return [value, name === 'stock' ? 'Stock' : name]
                          }}
                          indicator="dot"
                        />
                      }
                    />
                    <Area
                      dataKey="stock"
                      type="natural"
                      fill="url(#fillStock)"
                      stroke="#10b981"
                      stackId="a"
                    />
                    <Area
                      dataKey="price"
                      type="natural"
                      fill="url(#fillPrice)"
                      stroke="#ef4444"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaDatabase className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-2xl border border-gray-200 px-2 py-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-red-500 rounded-xl shadow-lg">
                <FaChartPie className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">Data Distribution</h3>
                <p className="text-xs text-gray-600 font-medium">Users vs Products</p>
              </div>
            </div>
            
            <ChartContainer
              config={{
                localUsers: {
                  label: "Local Users",
                  color: "#ef4444",
                },
                apiProducts: {
                  label: "API Products",
                  color: "#10b981",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Local Users', value: localUsers.length, color: '#ef4444' },
                      { name: 'API Products', value: apiUsers.length, color: '#10b981' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      { name: 'Local Users', value: localUsers.length, color: '#ef4444' },
                      { name: 'API Products', value: apiUsers.length, color: '#10b981' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold">{payload[0].name}</p>
                            <p className="text-sm">{payload[0].value} items</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
            <div className="grid grid-cols-2 gap-8">
            <div className="text-center group">
              <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transition-all duration-300">
                <FaChartBar className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{((localUsers.length / (localUsers.length + apiUsers.length)) * 100 || 0).toFixed(1)}%</p>
              <p className="text-xs text-gray-600 font-bold">Local Users Ratio</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transition-all duration-300">
                <FaChartPie className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{((apiUsers.length / (localUsers.length + apiUsers.length)) * 100 || 0).toFixed(1)}%</p>
              <p className="text-xs text-gray-600 font-bold">API Products Ratio</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transition-all duration-300">
                <MdTrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">${apiUsers.reduce((sum, p) => sum + p.price, 0).toFixed(0)}</p>
              <p className="text-xs text-gray-600 font-bold">Total Value</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-red-500 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg transition-all duration-300">
                <FaChartLine className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{apiUsers.reduce((sum, p) => sum + p.stock, 0)}</p>
              <p className="text-xs text-gray-600 font-bold">Total Stock</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}