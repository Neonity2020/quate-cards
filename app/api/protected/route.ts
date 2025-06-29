import { auth } from "auth"
import { readFileSync } from "fs"
import { join } from "path"

export const GET = auth(async (req) => {
  if (req.auth) {
    try {
      // 读取受保护的名言数据
      const dataPath = join(process.cwd(), "app", "api", "protected", "data-protected.json")
      const dataContent = readFileSync(dataPath, "utf-8")
      const quotesData = JSON.parse(dataContent)
      
      return Response.json({ 
        message: "成功获取受保护的名言数据",
        data: quotesData,
        user: req.auth.user
      })
    } catch (error) {
      return Response.json({ 
        message: "读取数据时发生错误",
        error: error instanceof Error ? error.message : "未知错误"
      }, { status: 500 })
    }
  }

  return Response.json({ message: "未认证，无法访问受保护的数据" }, { status: 401 })
})
