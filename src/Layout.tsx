import type React from "react"
import { useGetMeQuery } from "./store/api/userApi"
import { Navbar } from "./components/Navbar";

export const Layout = ({children}: {children: React.ReactNode}) => {
  const { isLoading } = useGetMeQuery();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}