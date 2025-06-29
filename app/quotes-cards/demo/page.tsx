"use client"

import { useState } from "react"
import { QuoteCard } from "@/components/quote-card"

// 演示数据
const demoQuotes = [
  {
    id: 1,
    author: "孔子",
    quote: "学而时习之，不亦说乎？",
    category: "学习",
    era: "古代",
    nationality: "中国"
  },
  {
    id: 2,
    author: "苏格拉底",
    quote: "认识你自己。",
    category: "智慧",
    era: "古代",
    nationality: "古希腊"
  },
  {
    id: 3,
    author: "爱因斯坦",
    quote: "想象力比知识更重要，因为知识是有限的，而想象力却包围着整个世界。",
    category: "智慧",
    era: "现代",
    nationality: "德国"
  },
  {
    id: 4,
    author: "老子",
    quote: "千里之行，始于足下。",
    category: "行动",
    era: "古代",
    nationality: "中国"
  },
  {
    id: 5,
    author: "莎士比亚",
    quote: "生存还是毁灭，这是一个问题。",
    category: "哲学",
    era: "近代",
    nationality: "英国"
  },
  {
    id: 6,
    author: "甘地",
    quote: "成为你想看到的改变。",
    category: "行动",
    era: "现代",
    nationality: "印度"
  },
  {
    id: 7,
    author: "尼采",
    quote: "每一个不曾起舞的日子，都是对生命的辜负。",
    category: "励志",
    era: "近代",
    nationality: "德国"
  },
  {
    id: 8,
    author: "王阳明",
    quote: "知行合一。",
    category: "哲学",
    era: "古代",
    nationality: "中国"
  }
]

export default function QuotesDemoPage() {
  const [selectedQuote, setSelectedQuote] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">世界名言卡片演示</h1>
          <p className="text-gray-600">点击卡片体验3D翻转效果，探索古今中外的智慧</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {demoQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">功能特点</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-semibold text-indigo-600">🎨 视觉设计</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 精美的卡片设计</li>
                  <li>• 分类颜色标识</li>
                  <li>• 年代和国籍标签</li>
                  <li>• 渐变背景效果</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-indigo-600">🔄 交互体验</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 3D翻转动画</li>
                  <li>• 悬停阴影效果</li>
                  <li>• 响应式布局</li>
                  <li>• 多维度筛选</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-indigo-600">📚 内容丰富</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 古今中外名言</li>
                  <li>• 按分类筛选</li>
                  <li>• 按年代筛选</li>
                  <li>• 按国籍筛选</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-600 mb-2">🔍 智能搜索功能</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">• 实时搜索响应</p>
                  <p className="font-medium mb-1">• 多字段搜索支持</p>
                  <p className="font-medium mb-1">• 搜索框始终可见</p>
                </div>
                <div>
                  <p className="font-medium mb-1">• 支持名言内容搜索</p>
                  <p className="font-medium mb-1">• 支持作者名称搜索</p>
                  <p className="font-medium mb-1">• 支持分类和国籍搜索</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-600 mb-2">📄 分页功能</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">• 每页显示 4 条记录</p>
                  <p className="font-medium mb-1">• 智能页码显示</p>
                  <p className="font-medium mb-1">• 保持用户位置</p>
                </div>
                <div>
                  <p className="font-medium mb-1">• 筛选时自动重置到第一页</p>
                  <p className="font-medium mb-1">• 分页信息实时更新</p>
                  <p className="font-medium mb-1">• 响应式分页控件</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-600 mb-2">🎛️ 智能筛选器</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">• 默认收缩状态</p>
                  <p className="font-medium mb-1">• 一键展开/收起</p>
                  <p className="font-medium mb-1">• 平滑动画过渡</p>
                </div>
                <div>
                  <p className="font-medium mb-1">• 当前筛选状态始终可见</p>
                  <p className="font-medium mb-1">• 节省页面空间</p>
                  <p className="font-medium mb-1">• 提升浏览体验</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-600 mb-2">📝 智能文本处理</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">• 长文本自动截断</p>
                  <p className="font-medium mb-1">• 展开/收起功能</p>
                  <p className="font-medium mb-1">• 渐变遮罩效果</p>
                </div>
                <div>
                  <p className="font-medium mb-1">• 自定义滚动条</p>
                  <p className="font-medium mb-1">• 自适应字体大小</p>
                  <p className="font-medium mb-1">• 保持卡片布局一致</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-600 mb-2">📱 响应式布局</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">• 移动端单列显示</p>
                  <p className="font-medium mb-1">• 桌面端双列布局</p>
                  <p className="font-medium mb-1">• 卡片间距优化</p>
                </div>
                <div>
                  <p className="font-medium mb-1">• 居中布局设计</p>
                  <p className="font-medium mb-1">• 最大宽度限制</p>
                  <p className="font-medium mb-1">• 适配各种屏幕</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">📏 卡片尺寸优化</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-1">• 增加卡片高度至320px</p>
                  <p className="font-medium mb-1">• 更好的长文本兼容性</p>
                  <p className="font-medium mb-1">• 增加显示行数至5行</p>
                </div>
                <div>
                  <p className="font-medium mb-1">• 更舒适的阅读体验</p>
                  <p className="font-medium mb-1">• 减少展开操作频率</p>
                  <p className="font-medium mb-1">• 保持视觉平衡</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <a 
                href="/quotes-cards" 
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                查看完整版本
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 