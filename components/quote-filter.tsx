"use client"

import { useState } from "react"

interface QuoteFilterProps {
  categories: string[]
  eras: string[]
  nationalities: string[]
  selectedCategory: string
  selectedEra: string
  selectedNationality: string
  searchQuery: string
  onCategoryChange: (category: string) => void
  onEraChange: (era: string) => void
  onNationalityChange: (nationality: string) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
  totalQuotes: number
  currentPage: number
  totalPages: number
}

export function QuoteFilter({ 
  categories, 
  eras,
  nationalities,
  selectedCategory, 
  selectedEra,
  selectedNationality,
  searchQuery,
  onCategoryChange, 
  onEraChange,
  onNationalityChange,
  onSearchChange,
  onClearFilters,
  totalQuotes,
  currentPage,
  totalPages
}: QuoteFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const hasActiveFilters = selectedCategory !== "全部" || selectedEra !== "全部" || selectedNationality !== "全部" || searchQuery.trim() !== ""

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
          筛选名言
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            共找到 <span className="font-semibold text-indigo-600">{totalQuotes}</span> 条名言
            {totalPages > 1 && (
              <span className="ml-2">
                · 第 <span className="font-semibold text-indigo-600">{currentPage}</span> 页，共 <span className="font-semibold text-indigo-600">{totalPages}</span> 页
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                清除筛选
              </button>
            )}
            <button
              onClick={toggleExpanded}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              {isExpanded ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  收起筛选
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  展开筛选
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 搜索框 - 始终显示 */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索名言内容、作者名称..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 当前筛选状态 - 始终显示 */}
      {hasActiveFilters && (
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-700">
            当前筛选：
            {searchQuery && <span className="font-semibold mx-1">搜索: "{searchQuery}"</span>}
            {selectedCategory !== "全部" && <span className="font-semibold mx-1">{selectedCategory}</span>}
            {selectedEra !== "全部" && <span className="font-semibold mx-1">{selectedEra}</span>}
            {selectedNationality !== "全部" && <span className="font-semibold mx-1">{selectedNationality}</span>}
          </p>
        </div>
      )}

      {/* 筛选选项 - 可收缩 */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="space-y-6">
          {/* 分类筛选 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">按分类筛选</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onCategoryChange("全部")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === "全部"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 年代筛选 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">按年代筛选</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onEraChange("全部")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedEra === "全部"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              
              {eras.map((era) => (
                <button
                  key={era}
                  onClick={() => onEraChange(era)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedEra === era
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          {/* 国籍筛选 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">按国籍筛选</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onNationalityChange("全部")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedNationality === "全部"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                全部
              </button>
              
              {nationalities.map((nationality) => (
                <button
                  key={nationality}
                  onClick={() => onNationalityChange(nationality)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedNationality === nationality
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {nationality}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 快速筛选提示 - 收缩时显示 */}
      {!isExpanded && !hasActiveFilters && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            点击"展开筛选"查看所有筛选选项
          </p>
        </div>
      )}
    </div>
  )
} 