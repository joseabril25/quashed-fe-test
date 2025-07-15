import type React from "react"

export const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <link href="/src/styles.css" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}