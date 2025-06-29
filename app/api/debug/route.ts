import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: !!process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: !!process.env.AUTH_GITHUB_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    NETLIFY: process.env.NETLIFY,
  }

  return NextResponse.json({
    message: "环境变量检查",
    envCheck,
    timestamp: new Date().toISOString(),
  })
} 