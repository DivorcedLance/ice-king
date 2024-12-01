"use client";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { Cloud } from "lucide-react";

interface Props {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 md:flex-row md:overflow-hidden flex">
      <div className="w-full flex-none md:w-64">
        <Sidebar activeSection="dashboard" key={Math.random()} />
      </div>
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center space-x-4">
              {/* Icono con Animación al Hover */}
              <div className="p-3 bg-blue-100 rounded-xl transition transform hover:scale-110">
                <Cloud className="h-8 w-8 text-blue-600 animate-spin-slow" />
              </div>

              {/* Títulos */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 transition-colors duration-300 hover:text-blue-600">
                  Weather Station
                </h1>
                <p className="text-gray-500">
                  Real-time Environmental Monitoring
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Área de Contenido Principal con Animación de Fade-In */}
        <main className="">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
