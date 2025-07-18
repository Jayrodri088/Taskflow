import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TaskFlow Pro",
  description: "Streamline your workflow with intelligent task management.", 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      {" "}
      {/* Added className="dark" */}
      <body>{children}</body>
    </html>
  )
}
