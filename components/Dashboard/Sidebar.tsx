"use client";
import React, { useState } from "react";
import { LayoutDashboard, BarChart2, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  activeSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Dashboard", href: "" },
    { id: "reports", icon: BarChart2, label: "Reportes", href: "reports" },
  ];

  return (
    <div className="relative z-40">
      {/* Toggle button for smaller screens */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-600 to-blue-800 w-64 min-h-screen p-6 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="mb-8">
          <Image
            priority
            src="/images/neptorAvatar.png"
            width={500}
            height={500}
            alt="Weather Hub"
          />
          <h2 className="pt-4 text-white text-center text-xl font-bold">Neptor Weather Hub</h2>
          <p className="text-blue-200 text-center text-sm">Estación de monitoreo climático</p>
        </div>
        <div className="space-y-2">
          {menuItems.map(({ id, icon: Icon, label, href }) => (
            <Link
              href={`/dashboard/${href}`}
              key={id}
              onClick={() => setIsOpen(false)} // Close the sidebar when a menu item is clicked
            >
              <div
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeSection === id
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-blue-100 hover:bg-blue-700/50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for smaller screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)} // Close the sidebar when clicking outside
        ></div>
      )}
    </div>
  );
};
  