"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

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
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    // Define allTools inside useMemo to prevent re-renders
    const allTools: ToolCardProps[] = [
      {
        id: "coc-planner",
        name: "CoC Upgrade Planner",
        description: "Plan and optimize your Clash of Clans building upgrades",
        href: "/toolkit/coc-planner",
        category: "Gaming",
        categoryColor: "blue",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.42 4.58C19.99 4.17 19.5 3.83 18.98 3.56C18.47 3.29 17.92 3.11 17.36 3C16.82 2.88 16.28 2.81 15.74 2.78C15.23 2.77 14.71 2.8 14.2 2.86C13.42 2.96 12.65 3.12 11.9 3.34C11.16 3.56 10.45 3.84 9.76 4.18C9.05 4.53 8.39 4.95 7.79 5.43C7.18 5.9 6.64 6.43 6.16 7.02C5.69 7.6 5.28 8.23 4.94 8.9C4.61 9.58 4.35 10.28 4.16 11C3.96 11.73 3.85 12.48 3.81 13.23C3.77 13.97 3.81 14.71 3.93 15.45C4.04 16.18 4.23 16.9 4.5 17.6C4.76 18.3 5.1 18.97 5.52 19.59C5.94 20.22 6.44 20.8 7 21.32C7.03 21.35 7.07 21.37 7.1 21.4C7.65 21.83 8.24 22.2 8.87 22.5C9.5 22.8 10.16 23.03 10.84 23.19C11.52 23.35 12.21 23.44 12.91 23.46C13.61 23.48 14.31 23.43 15 23.32C15.68 23.21 16.35 23.03 17 22.79C17.65 22.55 18.27 22.24 18.86 21.87C19.45 21.5 19.99 21.07 20.49 20.58C20.99 20.09 21.44 19.54 21.82 18.95C22.21 18.36 22.53 17.73 22.78 17.07C23.03 16.41 23.21 15.73 23.32 15.03C23.43 14.34 23.47 13.64 23.44 12.94C23.41 12.24 23.32 11.55 23.16 10.87C23 10.19 22.77 9.53 22.48 8.9C22.19 8.27 21.83 7.67 21.4 7.12C21.12 6.74 20.8 6.38 20.45 6.05C20.45 5.55 20.42 5.06 20.42 4.58ZM19.33 14.4C19.37 14.94 19.34 15.48 19.24 16.02C19.14 16.55 18.97 17.07 18.74 17.56C18.51 18.05 18.22 18.51 17.87 18.92C17.52 19.33 17.12 19.7 16.67 20.01C16.23 20.32 15.75 20.57 15.24 20.76C14.73 20.95 14.2 21.08 13.66 21.14C13.12 21.2 12.58 21.19 12.04 21.12C11.51 21.05 10.98 20.91 10.48 20.71C9.97 20.51 9.49 20.25 9.05 19.94C8.61 19.63 8.21 19.26 7.86 18.84C7.51 18.43 7.22 17.97 6.99 17.48C6.76 16.99 6.59 16.47 6.49 15.94C6.39 15.4 6.36 14.85 6.4 14.31C6.44 13.77 6.55 13.23 6.73 12.72C6.91 12.2 7.15 11.71 7.45 11.26C7.75 10.81 8.1 10.4 8.51 10.04C8.91 9.68 9.36 9.38 9.84 9.14C10.32 8.9 10.84 8.72 11.37 8.62C11.9 8.52 12.45 8.49 12.99 8.53C13.53 8.57 14.07 8.68 14.58 8.86C15.1 9.04 15.59 9.28 16.04 9.58C16.49 9.88 16.9 10.23 17.26 10.64C17.62 11.04 17.92 11.49 18.16 11.97C18.4 12.45 18.58 12.97 18.68 13.5C18.78 13.8 19.29 14.4 19.33 14.4ZM8 6C8.42 5.67 8.87 5.36 9.34 5.09C9.8 4.82 10.29 4.59 10.79 4.39C11.29 4.19 11.81 4.03 12.33 3.91C12.86 3.79 13.39 3.71 13.93 3.67C14.47 3.63 15.01 3.64 15.54 3.69C16.08 3.74 16.61 3.84 17.13 3.98C17.65 4.12 18.16 4.3 18.64 4.53C19.13 4.76 19.59 5.03 20.02 5.34C19.74 6.94 19.5 8.55 19.33 10.17C18.91 9.83 18.46 9.52 17.99 9.25C17.51 8.98 17.01 8.75 16.5 8.56C15.98 8.37 15.45 8.23 14.91 8.13C14.37 8.03 13.82 7.98 13.27 7.98C12.72 7.98 12.17 8.03 11.63 8.13C11.09 8.23 10.56 8.38 10.05 8.57C9.54 8.76 9.05 9 8.58 9.28C8.11 9.56 7.67 9.88 7.26 10.24C7.05 8.83 7.5 7.41 8 6ZM12.77 16.75C12.77 17.37 12.26 17.88 11.63 17.88C11.01 17.88 10.5 17.37 10.5 16.75C10.5 16.12 11.01 15.61 11.63 15.61C12.26 15.61 12.77 16.12 12.77 16.75ZM16.75 12.77C16.75 13.4 16.24 13.91 15.61 13.91C14.99 13.91 14.48 13.4 14.48 12.77C14.48 12.15 14.99 11.64 15.61 11.64C16.24 11.64 16.75 12.15 16.75 12.77ZM8.52 12.77C8.52 13.4 8.01 13.91 7.38 13.91C6.76 13.91 6.25 13.4 6.25 12.77C6.25 12.15 6.76 11.64 7.38 11.64C8.01 11.64 8.52 12.15 8.52 12.77ZM12.77 8.8C12.77 9.42 12.26 9.93 11.63 9.93C11.01 9.93 10.5 9.42 10.5 8.8C10.5 8.17 11.01 7.66 11.63 7.66C12.26 7.66 12.77 8.17 12.77 8.8Z"
              fill="#3B82F6"
            />
          </svg>
        ),
        badge: {
          text: "New",
          color: "blue"
        }
      },
      {
        id: "image-upscaler",
        name: "AI Image Upscaler",
        description: "Enhance and upscale your images using AI technology",
        href: "/toolkit/image-upscaler",
        category: "AI",
        categoryColor: "purple",
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 15L16 10L5 21"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )
      }
    ];

    if (!searchQuery) return allTools;
    
    const query = searchQuery.toLowerCase();
    return allTools.filter(tool => 
      tool.name.toLowerCase().includes(query) || 
      tool.category.toLowerCase().includes(query) || 
      tool.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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
              Showing results for: <span className="font-medium">&quot;{searchQuery}&quot;</span>
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