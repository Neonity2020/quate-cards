"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { QuoteCard } from "@/components/quote-card"
import { QuoteFilter } from "@/components/quote-filter"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Button } from "@/components/ui/button"
import SessionData from "./session-data"

interface Quote {
  id: number
  author: string
  quote: string
  category: string
  era: string
  nationality: string
}

interface QuotesData {
  quotes: Quote[]
  metadata: {
    total: number
    categories: string[]
    eras: string[]
    nationalities: string[]
    description: string
  }
}

const ITEMS_PER_PAGE = 4

export default function QuotesCardsClient() {
  const { data: session, status, update } = useSession()
  const [quotesData, setQuotesData] = useState<QuotesData | null>(null)
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("全部")
  const [selectedEra, setSelectedEra] = useState<string>("全部")
  const [selectedNationality, setSelectedNationality] = useState<string>("全部")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSessionData, setShowSessionData] = useState(false)

  // 计算分页数据
  const totalPages = Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentQuotes = filteredQuotes.slice(startIndex, endIndex)

  useEffect(() => {
    if (session) {
      fetchQuotes()
    }
  }, [session])

  useEffect(() => {
    if (quotesData) {
      applyFilters()
    }
  }, [quotesData, selectedCategory, selectedEra, selectedNationality, searchQuery])

  // 当筛选条件改变时，重置到第一页
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedEra, selectedNationality, searchQuery])

  const fetchQuotes = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/protected")
      if (!response.ok) {
        throw new Error("获取数据失败")
      }
      const result = await response.json()
      setQuotesData(result.data)
      setFilteredQuotes(result.data.quotes)
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知错误")
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    if (!quotesData) return

    let filtered = quotesData.quotes

    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(quote => 
        quote.quote.toLowerCase().includes(query) ||
        quote.author.toLowerCase().includes(query) ||
        quote.category.toLowerCase().includes(query) ||
        quote.nationality.toLowerCase().includes(query)
      )
    }

    // 分类过滤
    if (selectedCategory !== "全部") {
      filtered = filtered.filter(quote => quote.category === selectedCategory)
    }

    // 年代过滤
    if (selectedEra !== "全部") {
      filtered = filtered.filter(quote => quote.era === selectedEra)
    }

    // 国籍过滤
    if (selectedNationality !== "全部") {
      filtered = filtered.filter(quote => quote.nationality === selectedNationality)
    }

    setFilteredQuotes(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleEraChange = (era: string) => {
    setSelectedEra(era)
  }

  const handleNationalityChange = (nationality: string) => {
    setSelectedNationality(nationality)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const clearAllFilters = () => {
    setSelectedCategory("全部")
    setSelectedEra("全部")
    setSelectedNationality("全部")
    setSearchQuery("")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 移除自动滚动到顶部，避免用户头晕不适
    // window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("登出失败:", error)
    }
  }

  const handleUpdateSession = async () => {
    if (session?.user) {
      try {
        await update({
          user: {
            ...session.user,
            name: `更新后的 ${session.user.name}`
          }
        })
      } catch (error) {
        console.error("更新 session 失败:", error)
      }
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">需要登录</h1>
          <p className="text-gray-600">请先登录以查看名言卡片</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">世界名言卡片</h1>
          <p className="text-gray-600">探索古今中外的智慧名言</p>
          
          {/* 用户信息和操作按钮 */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <div className="text-sm text-gray-600">
              欢迎，{session.user?.name || session.user?.email}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSessionData(!showSessionData)}
              >
                {showSessionData ? "隐藏" : "显示"} Session 数据
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUpdateSession}
              >
                更新 Session
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleSignOut}
              >
                登出
              </Button>
            </div>
          </div>

          {/* Session 数据显示 */}
          {showSessionData && (
            <div className="mt-6 max-w-2xl mx-auto">
              <SessionData session={session} />
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center mb-8">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            <p>错误: {error}</p>
            <button 
              onClick={fetchQuotes}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              重试
            </button>
          </div>
        )}

        {quotesData && (
          <>
            <QuoteFilter
              categories={quotesData.metadata.categories}
              eras={quotesData.metadata.eras}
              nationalities={quotesData.metadata.nationalities}
              selectedCategory={selectedCategory}
              selectedEra={selectedEra}
              selectedNationality={selectedNationality}
              searchQuery={searchQuery}
              onCategoryChange={handleCategoryChange}
              onEraChange={handleEraChange}
              onNationalityChange={handleNationalityChange}
              onSearchChange={handleSearchChange}
              onClearFilters={clearAllFilters}
              totalQuotes={filteredQuotes.length}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
              {currentQuotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} />
              ))}
            </div>

            {filteredQuotes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchQuery.trim() ? `没有找到包含"${searchQuery}"的名言` : "没有找到相关名言"}
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  清除所有筛选
                </button>
              </div>
            )}

            {/* 分页组件 */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// 分页组件
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onPrevPage: () => void
  onNextPage: () => void
}

function Pagination({ currentPage, totalPages, onPageChange, onPrevPage, onNextPage }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // 如果总页数少于等于5页，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 如果总页数大于5页，显示当前页附近的页码
      let startPage = Math.max(1, currentPage - 2)
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      
      // 调整起始页，确保显示5个页码
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  return (
    <div className="flex items-center space-x-2">
      {/* 上一页按钮 */}
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        上一页
      </button>

      {/* 页码按钮 */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            currentPage === page
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 下一页按钮 */}
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
        }`}
      >
        下一页
      </button>

      {/* 页码信息 */}
      <div className="ml-4 text-sm text-gray-600">
        第 {currentPage} 页，共 {totalPages} 页
      </div>
    </div>
  )
} 