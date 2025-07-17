import type React from "react"
import { useGetMeQuery } from "./store/api/userApi"
import { Navbar } from "./components/Navbar";
import { useAppSelector } from "./store/hooks";

export const Layout = ({children}: {children: React.ReactNode}) => {
  const { isLoading } = useGetMeQuery();
  const { isModalOpen } = useAppSelector((state) => state.app);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-gray-600">Loading user data ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isModalOpen && 'blur-md'}`}>
      <Navbar />
      {children}
    </div>
  )
}