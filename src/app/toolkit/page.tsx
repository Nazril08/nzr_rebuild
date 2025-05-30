"use client";

import { useSearch } from "@/components/Layouts/header";
import Link from "next/link";
import { useMemo } from "react";

// Define tool types for better type safety
interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  href: string;
  category: string;
  categoryColor: string;
  icon: React.ReactNode;
  badge?: {
    text: string;
    color: string;
  };
}

export default function ToolkitPage() {
  const { searchQuery } = useSearch();

  // Define all tools with their data
  const allTools: ToolCardProps[] = [
    {
      id: "image-upscaler",
      name: "AI Image Upscaler",
      description: "Enhance and upscale your images with AI technology up to 8x resolution while maintaining quality.",
      href: "/toolkit/image-upscaler",
      category: "Image Processing",
      categoryColor: "blue",
      badge: {
        text: "Active",
        color: "blue",
      },
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:scale-110 transition-transform"
        >
          <path
            d="M20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4Z"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 15L16 10L4 20"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      id: "coc-planner",
      name: "COC Upgrade Planner",
      description: "Optimize your Clash of Clans building upgrades with smart scheduling based on builder availability and priorities.",
      href: "/toolkit/coc-planner",
      category: "Game Tools",
      categoryColor: "green",
      badge: {
        text: "New",
        color: "green",
      },
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="group-hover:scale-110 transition-transform"
        >
          <path
            d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 2V6"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 2V6"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 10H21"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14H8.01"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 14H12.01"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 14H16.01"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 18H8.01"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 18H12.01"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 18H16.01"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  ];

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery) return allTools;
    
    const query = searchQuery.toLowerCase();
    return allTools.filter(tool => 
      tool.name.toLowerCase().includes(query) || 
      tool.category.toLowerCase().includes(query) || 
      tool.description.toLowerCase().includes(query)
    );
  }, [searchQuery, allTools]);

  // Helper function to get the correct class names
  const getColorClasses = (tool: ToolCardProps) => {
    const colorMap: Record<string, { bg: string, bgHover: string, bgLight: string, text: string }> = {
      blue: {
        bg: "bg-blue-100",
        bgHover: "group-hover:bg-blue-200",
        bgLight: "bg-blue-50",
        text: "text-blue-700",
      },
      green: {
        bg: "bg-green-100",
        bgHover: "group-hover:bg-green-200",
        bgLight: "bg-green-50",
        text: "text-green-700",
      },
      red: {
        bg: "bg-red-100",
        bgHover: "group-hover:bg-red-200",
        bgLight: "bg-red-50",
        text: "text-red-700",
      },
      purple: {
        bg: "bg-purple-100",
        bgHover: "group-hover:bg-purple-200",
        bgLight: "bg-purple-50",
        text: "text-purple-700",
      },
      yellow: {
        bg: "bg-yellow-100",
        bgHover: "group-hover:bg-yellow-200",
        bgLight: "bg-yellow-50",
        text: "text-yellow-700",
      },
      indigo: {
        bg: "bg-indigo-100",
        bgHover: "group-hover:bg-indigo-200",
        bgLight: "bg-indigo-50",
        text: "text-indigo-700",
      },
    };

    return colorMap[tool.categoryColor] || colorMap.blue;
  };

  const getBadgeClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      red: "bg-red-500",
      purple: "bg-purple-500",
      yellow: "bg-yellow-500",
      indigo: "bg-indigo-500",
    };

    return colorMap[color] || colorMap.blue;
  };

  // Render the tool card
  const renderToolCard = (tool: ToolCardProps) => {
    const colorClasses = getColorClasses(tool);
    
    return (
      <Link 
        key={tool.id}
        href={tool.href}
        className="toolkit-card group hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="relative">
          <div className={`toolkit-card-icon ${colorClasses.bg} ${colorClasses.bgHover} transition-colors`}>
            {tool.icon}
          </div>
          {tool.badge && (
            <div className={`absolute top-0 right-0 ${getBadgeClass(tool.badge.color)} text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg`}>
              {tool.badge.text}
            </div>
          )}
        </div>
        <h3 className="toolkit-card-title group-hover:text-primary transition-colors">{tool.name}</h3>
        <p className="toolkit-card-description">
          {tool.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className={`inline-block px-3 py-1 text-xs font-medium ${colorClasses.bgLight} ${colorClasses.text} rounded-full`}>
            {tool.category}
          </span>
          <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
            <span className="text-sm font-medium">Try it</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Toolkit</h1>
        <p className="text-lg text-gray-600 mt-2">
          Access powerful tools to enhance your productivity
        </p>
        {searchQuery && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-700">
              Showing results for: <span className="font-medium">"{searchQuery}"</span>
            </p>
          </div>
        )}
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map(renderToolCard)}
          
          {!searchQuery && (
            <div className="toolkit-card border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-8">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">More Tools Coming Soon</h3>
              <p className="text-gray-500">
                We&apos;re working on adding more powerful AI tools to help you be more productive.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full p-4 mb-4 inline-block">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No tools found</h3>
          <p className="text-gray-500">
            No tools match your search query. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
} 