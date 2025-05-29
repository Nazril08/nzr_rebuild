"use client";

import { useMemo } from "react";
import { Builder, BuildingQueueItem, TimelineItem } from "../types";
import { generateBuilderTimeline } from "../utils/scheduler";

interface BuilderTimelineProps {
  builders: Builder[];
  buildingQueue: BuildingQueueItem[];
  selectedTasks: number[];
}

const BuilderTimeline: React.FC<BuilderTimelineProps> = ({
  builders,
  buildingQueue,
  selectedTasks,
}) => {
  // Generate timeline data
  const timelineData = useMemo(() => {
    if (builders.length === 0 || buildingQueue.length === 0 || selectedTasks.length === 0) {
      return [];
    }
    return generateBuilderTimeline(builders, buildingQueue, selectedTasks);
  }, [builders, buildingQueue, selectedTasks]);

  // Find earliest and latest dates to set timeline boundaries
  const { startDate, endDate } = useMemo(() => {
    if (timelineData.length === 0) {
      return {
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days from now
      };
    }

    let earliest = new Date();
    let latest = new Date();

    timelineData.forEach((builder) => {
      builder.tasks.forEach((task) => {
        if (task.startTime < earliest) {
          earliest = task.startTime;
        }
        if (task.endTime > latest) {
          latest = task.endTime;
        }
      });
    });

    return {
      startDate: earliest,
      endDate: latest,
    };
  }, [timelineData]);

  // Calculate total timeline duration in milliseconds
  const timelineDuration = endDate.getTime() - startDate.getTime();

  // Get building name by ID
  const getBuildingName = (buildingId: number) => {
    const building = buildingQueue.find((b) => b.id === buildingId);
    return building ? building.name : "Unknown";
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get color based on building category
  const getCategoryColor = (buildingId: number) => {
    const building = buildingQueue.find((b) => b.id === buildingId);
    if (!building) return "bg-gray-500";
    
    switch (building.category) {
      case "Defense":
        return "bg-red-500";
      case "Army":
        return "bg-blue-500";
      case "Resource":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get text color based on category
  const getCategoryTextColor = (buildingId: number) => {
    const building = buildingQueue.find((b) => b.id === buildingId);
    if (!building) return "text-gray-800";
    
    switch (building.category) {
      case "Defense":
        return "text-red-800";
      case "Army":
        return "text-blue-800";
      case "Resource":
        return "text-yellow-800";
      default:
        return "text-gray-800";
    }
  };

  // Format duration for display
  const formatDuration = (startTime: Date, endTime: Date) => {
    const durationMs = endTime.getTime() - startTime.getTime();
    const days = Math.floor(durationMs / (24 * 60 * 60 * 1000));
    const hours = Math.floor((durationMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((durationMs % (60 * 60 * 1000)) / (60 * 1000));
    
    let result = "";
    if (days > 0) result += `${days}d `;
    if (hours > 0 || days > 0) result += `${hours}h `;
    result += `${minutes}m`;
    
    return result;
  };

  if (timelineData.length === 0) {
    return (
      <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <h3 className="mb-5 text-xl font-semibold text-black dark:text-white">
          Builder Timeline
        </h3>
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 dark:text-gray-400">
            {selectedTasks.length === 0
              ? "Select tasks from the schedule to visualize the timeline."
              : "No timeline data available. Make sure you have builders and buildings in the queue."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
        Builder Timeline
      </h3>

      <div className="mb-4 text-sm text-gray-500">
        Timeline from {formatDate(startDate)} to {formatDate(endDate)}
      </div>

      {/* Color legend */}
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="text-xs text-gray-500">Defense</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="text-xs text-gray-500">Army</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="text-xs text-gray-500">Resource</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 bg-gray-500 rounded-full"></span>
          <span className="text-xs text-gray-500">Other</span>
        </div>
      </div>

      {/* Builder sections */}
      <div className="space-y-6">
        {timelineData.map((builderData) => (
          <div key={builderData.builderId} className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Builder header */}
            <div className="bg-gray-100 dark:bg-meta-4 px-4 py-3 flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-700 dark:text-gray-300"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21C20 18.8783 19.1571 16.8434 17.6569 15.3431C16.1566 13.8429 14.1217 13 12 13C9.87827 13 7.84344 13.8429 6.34315 15.3431C4.84285 16.8434 4 18.8783 4 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h4 className="font-medium text-black dark:text-white">
                Builder {builderData.builderId}
              </h4>
              <span className="text-xs text-gray-500">
                ({builderData.tasks.length} task{builderData.tasks.length !== 1 ? 's' : ''})
              </span>
            </div>

            {/* Builder tasks */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {builderData.tasks.map((task) => {
                const categoryColor = getCategoryColor(task.buildingId);
                const categoryTextColor = getCategoryTextColor(task.buildingId);
                const buildingName = getBuildingName(task.buildingId);
                const duration = formatDuration(task.startTime, task.endTime);
                
                // Calculate progress percentage
                const now = new Date();
                let progressPercent = 0;
                
                if (now < task.startTime) {
                  progressPercent = 0; // Not started yet
                } else if (now > task.endTime) {
                  progressPercent = 100; // Completed
                } else {
                  // In progress
                  const totalDuration = task.endTime.getTime() - task.startTime.getTime();
                  const elapsed = now.getTime() - task.startTime.getTime();
                  progressPercent = Math.floor((elapsed / totalDuration) * 100);
                }
                
                return (
                  <div key={task.id} className="p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center gap-2 mb-1 sm:mb-0">
                        <div className={`w-3 h-3 rounded-full ${categoryColor}`}></div>
                        <span className="font-medium text-black dark:text-white">
                          {buildingName}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{duration}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row text-xs text-gray-500 mb-2">
                      <div className="sm:w-1/2">
                        Start: {formatDate(task.startTime)}
                      </div>
                      <div className="sm:w-1/2">
                        End: {formatDate(task.endTime)}
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${categoryColor}`} 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuilderTimeline; 