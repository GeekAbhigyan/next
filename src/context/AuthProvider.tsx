'use client'
import { SessionProvider } from "next-auth/react"
import { Html } from "next/document"
export default function AuthProvider({
   children,
  
}:(children :React.ReactNode)) {
  return (
 <html lang="en">
    <AuthProvider>

    </AuthProvider>
        <body className={inter.className}>{children}</body>

    <SessionProvider>
      <children>
    </SessionProvider>
 </html>
    
  )
}