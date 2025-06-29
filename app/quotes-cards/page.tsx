import { auth } from "auth"
import { SessionProvider } from "next-auth/react"
import QuotesCardsClient from "@/components/quotes-cards-client"

export default async function QuotesCardsPage() {
  const session = await auth()
  if (session?.user) {
    // 过滤敏感数据
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }

  return (
    <SessionProvider basePath={"/auth"} session={session}>
      <QuotesCardsClient />
    </SessionProvider>
  )
} 