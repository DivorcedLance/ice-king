"use client";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { Cloud } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar activeSection="dashboard" key={Math.random()} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
            <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Icon with hover animation */}
              <div className="p-3 bg-blue-100 rounded-xl transition transform hover:scale-110">
                <Cloud className="h-8 w-8 text-blue-600 animate-spin-slow" />
              </div>

              {/* Titles */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600">
                  Neptor Weather Hub
                </h1>
                <p className="text-gray-500 text-sm sm:text-base">
                  Estación de monitoreo climático
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
