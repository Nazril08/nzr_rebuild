"use client";

import { useState, useEffect } from "react";
import { Builder, BuildingQueueItem, ScheduleItem } from "./types";
import BuilderStatus from "./components/BuilderStatus";
import BuildingQueue from "./components/BuildingQueue";
import UpgradeSchedule from "./components/UpgradeSchedule";
import BuilderTimeline from "./components/BuilderTimeline";

// Initialize with default values
const initialBuilders: Builder[] = [
  { id: 1, status: 'idle' },
  { id: 2, status: 'idle' },
];

export default function CocPlannerPage() {
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
} 