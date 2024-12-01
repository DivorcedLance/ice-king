"use client";
import React from "react";
import { LayoutDashboard, BarChart2, AlertTriangle, Users } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeSection: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Overview", href: "" },
    { id: "reports", icon: BarChart2, label: "Reports", href: "reports" },
    { id: "alerts", icon: AlertTriangle, label: "Alerts", href: "alerts" },
    { id: "users", icon: Users, label: "Users", href: "users" },
  ];

  return (
    <div className="fixed bg-gradient-to-b from-blue-600 to-blue-800 w-64 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold">Weather Hub</h2>
        <p className="text-blue-200 text-sm">Monitoring Station</p>
      </div>
      <div className="space-y-2">
        {menuItems.map(({ id, icon: Icon, label, href }) => (
          <Link href={`/dashboard/${href}`} key={id}>
            <button
              key={id}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === id
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-blue-100 hover:bg-blue-700/50"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};
