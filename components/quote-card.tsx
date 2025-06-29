"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Quote {
  id: number
  author: string
  quote: string
  category: string
  era: string
  nationality: string
}

interface QuoteCardProps {
  quote: Quote
}

const categoryColors = {
  "学习": "bg-blue-100 text-blue-800 border-blue-200",
  "行动": "bg-green-100 text-green-800 border-green-200",
  "智慧": "bg-purple-100 text-purple-800 border-purple-200",
  "励志": "bg-orange-100 text-orange-800 border-orange-200",
  "积累": "bg-teal-100 text-teal-800 border-teal-200",
  "修养": "bg-pink-100 text-pink-800 border-pink-200",
  "哲学": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "坚持": "bg-red-100 text-red-800 border-red-200",
  "时间": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "希望": "bg-emerald-100 text-emerald-800 border-emerald-200"
}

const eraColors = {
  "古代": "bg-amber-100 text-amber-800 border-amber-200",
  "近代": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "现代": "bg-rose-100 text-rose-800 border-rose-200"
}

const nationalityColors = {
  "中国": "bg-red-100 text-red-800 border-red-200",
  "古希腊": "bg-blue-100 text-blue-800 border-blue-200",
  "古罗马": "bg-orange-100 text-orange-800 border-orange-200",
  "英国": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "法国": "bg-purple-100 text-purple-800 border-purple-200",
  "德国": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "美国": "bg-green-100 text-green-800 border-green-200",
  "印度": "bg-pink-100 text-pink-800 border-pink-200"
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const categoryColor = categoryColors[quote.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800 border-gray-200"
  const eraColor = eraColors[quote.era as keyof typeof eraColors] || "bg-gray-100 text-gray-800 border-gray-200"
  const nationalityColor = nationalityColors[quote.nationality as keyof typeof nationalityColors] || "bg-gray-100 text-gray-800 border-gray-200"

  // 检查文本是否过长
  const isLongQuote = quote.quote.length > 50
  const isLongAuthor = quote.author.length > 15

  return (
    <div 
      className="relative h-80 cursor-pointer perspective-1000"
      onClick={handleCardClick}
    >
      <div className={cn(
        "absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d",
        isFlipped ? "rotate-y-180" : ""
      )}>
        {/* 正面 */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            {/* 顶部区域：标签和编号 */}
            <div className="flex justify-between items-start mb-4 flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border",
                  categoryColor
                )}>
                  {quote.category}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border",
                  eraColor
                )}>
                  {quote.era}
                </span>
              </div>
              <span className="text-2xl text-gray-300 flex-shrink-0">#{quote.id}</span>
            </div>
            
            {/* 中间区域：名言内容 */}
            <div className="flex-1 min-h-0 mb-4">
              <blockquote className={cn(
                "text-gray-700 leading-relaxed h-full",
                isLongQuote ? "text-base" : "text-lg"
              )}>
                <div className={cn(
                  "h-full",
                  isExpanded ? "overflow-y-auto custom-scrollbar" : "overflow-hidden"
                )}>
                  <div className={cn(
                    "relative",
                    !isExpanded && isLongQuote && "line-clamp-5"
                  )}>
                    "{quote.quote}"
                    {!isExpanded && isLongQuote && (
                      <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white via-white to-transparent w-8 h-6"></div>
                    )}
                  </div>
                </div>
              </blockquote>
              
              {isLongQuote && (
                <button
                  onClick={handleExpandClick}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium mt-2 transition-colors"
                >
                  {isExpanded ? "收起" : "展开"}
                </button>
              )}
            </div>
            
            {/* 底部区域：作者信息和提示 */}
            <div className="flex-shrink-0">
              {/* 作者信息行 */}
              <div className="border-t border-gray-100 pt-3 mb-3">
                <cite className={cn(
                  "text-gray-500 not-italic block",
                  isLongAuthor ? "text-sm" : "text-sm"
                )}>
                  <div className="truncate">
                    — {quote.author}
                  </div>
                </cite>
                <div className="mt-2">
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-medium border",
                    nationalityColor
                  )}>
                    {quote.nationality}
                  </span>
                </div>
              </div>
              
              {/* 操作提示 */}
              <div className="text-center">
                <p className="text-xs text-gray-400">点击卡片查看详情</p>
              </div>
            </div>
          </div>
        </div>

        {/* 背面 */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 h-full flex flex-col justify-center text-white">
            <div className="text-center">
              <h3 className={cn(
                "font-bold mb-2",
                isLongAuthor ? "text-lg" : "text-xl"
              )}>
                {quote.author}
              </h3>
              <p className="text-sm opacity-90 mb-4">{quote.nationality} · {quote.era}</p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">分类：</span>
                  {quote.category}
                </p>
                <p>
                  <span className="font-medium">年代：</span>
                  {quote.era}
                </p>
                <p>
                  <span className="font-medium">国籍：</span>
                  {quote.nationality}
                </p>
                <p>
                  <span className="font-medium">编号：</span>
                  {quote.id}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-xs opacity-75">再次点击返回正面</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 