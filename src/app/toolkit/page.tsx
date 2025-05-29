"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Builder, BuildingQueueItem } from "./coc-planner/types";
import BuilderStatus from "./coc-planner/components/BuilderStatus";
import BuildingQueue from "./coc-planner/components/BuildingQueue";
import UpgradeSchedule from "./coc-planner/components/UpgradeSchedule";
import BuilderTimeline from "./coc-planner/components/BuilderTimeline";

// Initialize with default values
const initialBuilders: Builder[] = [
  { id: 1, status: 'idle' },
  { id: 2, status: 'idle' },
];

export default function ToolkitPage() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [builders, setBuilders] = useState<Builder[]>(initialBuilders);
  const [buildingQueue, setBuildingQueue] = useState<BuildingQueueItem[]>([]);
  const [sleepTime, setSleepTime] = useState<string>("22:00");
  const [sleepDuration, setSleepDuration] = useState<number>(8);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBuilders = localStorage.getItem("cocBuilders");
      const savedBuildingQueue = localStorage.getItem("cocBuildingQueue");
      const savedSleepTime = localStorage.getItem("cocSleepTime");
      const savedSleepDuration = localStorage.getItem("cocSleepDuration");

      if (savedBuilders) setBuilders(JSON.parse(savedBuilders));
      if (savedBuildingQueue) setBuildingQueue(JSON.parse(savedBuildingQueue));
      if (savedSleepTime) setSleepTime(savedSleepTime);
      if (savedSleepDuration) setSleepDuration(Number(savedSleepDuration));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cocBuilders", JSON.stringify(builders));
      localStorage.setItem("cocBuildingQueue", JSON.stringify(buildingQueue));
      localStorage.setItem("cocSleepTime", sleepTime);
      localStorage.setItem("cocSleepDuration", String(sleepDuration));
    }
  }, [builders, buildingQueue, sleepTime, sleepDuration]);

  const renderActiveTool = () => {
    switch (activeToolId) {
      case 'coc-planner':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Clash of Clans Upgrade Planner</h1>
              <p className="text-lg text-gray-600 mt-2">
                Optimize your building upgrades with smart scheduling
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
              <div className="col-span-12 xl:col-span-4">
                <BuilderStatus 
                  builders={builders} 
                  setBuilders={setBuilders} 
                  sleepTime={sleepTime}
                  setSleepTime={setSleepTime}
                  sleepDuration={sleepDuration}
                  setSleepDuration={setSleepDuration}
                />
              </div>
              <div className="col-span-12 xl:col-span-4">
                <BuildingQueue 
                  buildingQueue={buildingQueue}
                  setBuildingQueue={setBuildingQueue}
                />
              </div>
              <div className="col-span-12 xl:col-span-4">
                <UpgradeSchedule 
                  builders={builders}
                  buildingQueue={buildingQueue}
                  selectedTasks={selectedTasks}
                  setSelectedTasks={setSelectedTasks}
                />
              </div>
              <div className="col-span-12">
                <BuilderTimeline 
                  builders={builders}
                  buildingQueue={buildingQueue}
                  selectedTasks={selectedTasks}
                />
              </div>
            </div>
          </div>
        );
      case 'image-upscaler':
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">AI Image Upscaler</h1>
              <p className="text-lg text-gray-600 mt-2">
                Enhance and upscale your images with AI technology
              </p>
            </div>
            <div className="text-center p-10">
              <p>Image upscaler tool content will go here</p>
            </div>
          </div>
        );
      default:
        return renderToolCards();
    }
  };

  const renderToolCards = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Toolkit</h1>
        <p className="text-lg text-gray-600 mt-2">
          Access powerful tools to enhance your productivity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* AI Image Upscaler Tool Card */}
        <div 
          onClick={() => setActiveToolId('image-upscaler')}
          className="toolkit-card group hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
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

        {/* COC Upgrade Planner Tool Card */}
        <div 
          onClick={() => setActiveToolId('coc-planner')}
          className="toolkit-card group hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <div className="toolkit-card-icon bg-green-100 group-hover:bg-green-200 transition-colors">
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
            </div>
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
              New
            </div>
          </div>
          <h3 className="toolkit-card-title group-hover:text-primary transition-colors">COC Upgrade Planner</h3>
          <p className="toolkit-card-description">
            Optimize your Clash of Clans building upgrades with smart scheduling based on builder availability and priorities.
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
              Game Tools
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
    </>
  );

  return (
    <div>
      {activeToolId && (
        <div className="mb-6">
          <button 
            onClick={() => setActiveToolId(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Toolkit
          </button>
        </div>
      )}
      
      {renderActiveTool()}
    </div>
  );
} 