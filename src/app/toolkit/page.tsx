"use client";

import Link from "next/link";

export default function ToolkitPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Toolkit</h1>
        <p className="text-lg text-gray-600 mt-2">
          Access powerful tools to enhance your productivity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* AI Image Upscaler Tool Card */}
        <Link href="/toolkit/image-upscaler" className="block">
          <div className="toolkit-card group hover:border-primary hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <div className="toolkit-card-icon bg-blue-100 group-hover:bg-blue-200 transition-colors">
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
              </div>
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
                Active
              </div>
            </div>
            <h3 className="toolkit-card-title group-hover:text-primary transition-colors">AI Image Upscaler</h3>
            <p className="toolkit-card-description">
              Enhance and upscale your images with AI technology up to 8x resolution while
              maintaining quality.
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                Image Processing
              </span>
              <span className="text-primary group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span className="text-sm font-medium">Try it</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </Link>

        {/* Coming Soon Card */}
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
      </div>
    </div>
  );
} 