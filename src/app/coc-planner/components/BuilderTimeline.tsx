"use client";

import { useEffect, useState } from "react";
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
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  useEffect(() => {
    if (builders.length > 0 && buildingQueue.length > 0 && selectedTasks.length > 0) {
      const generatedTimeline = generateBuilderTimeline(builders, buildingQueue, selectedTasks);
      setTimeline(generatedTimeline);
    } else {
      setTimeline([]);
    }
  }, [builders, buildingQueue, selectedTasks]);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const getTaskDuration = (startTime: Date, endTime: Date) => {
    const diff = endTime.getTime() - startTime.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m`;
    
    return result.trim();
  };

  const getTaskWidth = (startTime: Date, endTime: Date) => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const timelineLength = 7 * oneDay; // 7 days timeline
    
    const duration = endTime.getTime() - startTime.getTime();
    const percentage = (duration / timelineLength) * 100;
    
    // Ensure minimum width for visibility
    return Math.max(percentage, 5);
  };

  const getTaskPosition = (startTime: Date) => {
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const timelineLength = 7 * oneDay; // 7 days timeline
    
    const timeSinceNow = startTime.getTime() - now.getTime();
    const percentage = (timeSinceNow / timelineLength) * 100;
    
    // Ensure position is within bounds
    return Math.max(0, Math.min(percentage, 100));
  };

  const getTaskColor = (buildingId: number) => {
    const building = buildingQueue.find(b => b.id === buildingId);
    if (!building) return 'bg-gray-400';
    
    switch (building.category) {
      case 'Defense':
        return 'bg-primary';
      case 'Army':
        return 'bg-success';
      case 'Resource':
        return 'bg-warning';
      default:
        return 'bg-info';
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-black dark:text-white">
          <span className="inline-flex items-center gap-2">
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                fill=""
              />
              <path
                d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                fill=""
              />
            </svg>
            Builder Timeline
          </span>
        </h3>
      </div>

      {timeline.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
            No schedule has been created yet. Click "Create Schedule" to generate your upgrade timeline.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          {/* Timeline header - days of the week */}
          <div className="flex border-b border-stroke dark:border-strokedark mb-4">
            {Array.from({ length: 8 }).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              return (
                <div
                  key={index}
                  className="flex-1 text-center pb-2 text-sm font-medium text-black dark:text-white"
                >
                  {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
              );
            })}
          </div>

          {/* Builder timelines */}
          {timeline.map((item) => (
            <div key={item.builderId} className="mb-6">
              <div className="mb-2 font-medium text-black dark:text-white">
                Builder {item.builderId}
              </div>
              <div className="relative h-16 bg-gray-100 dark:bg-meta-4 rounded-md">
                {/* Timeline grid lines */}
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 border-r border-dashed border-gray-300 dark:border-gray-600"
                    ></div>
                  ))}
                </div>

                {/* Tasks */}
                {item.tasks.map((task) => {
                  const building = buildingQueue.find(b => b.id === task.buildingId);
                  const width = getTaskWidth(task.startTime, task.endTime);
                  const left = getTaskPosition(task.startTime);
                  
                  return (
                    <div
                      key={task.id}
                      className={`absolute h-12 rounded-md ${getTaskColor(task.buildingId)} flex items-center justify-center px-2 text-white text-xs overflow-hidden`}
                      style={{
                        width: `${width}%`,
                        left: `${left}%`,
                        top: '8px',
                      }}
                      title={`${building?.name} - ${formatDateTime(task.startTime)} to ${formatDateTime(task.endTime)}`}
                    >
                      <div className="truncate">
                        {building?.name} ({getTaskDuration(task.startTime, task.endTime)})
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-primary rounded mr-2"></div>
              <span className="text-sm text-black dark:text-white">Defense</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-success rounded mr-2"></div>
              <span className="text-sm text-black dark:text-white">Army</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-warning rounded mr-2"></div>
              <span className="text-sm text-black dark:text-white">Resource</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-info rounded mr-2"></div>
              <span className="text-sm text-black dark:text-white">Other</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderTimeline; 