"use client";

import { useMemo, useState } from "react";
import { Builder, BuildingQueueItem, ScheduleItem } from "../types";
import { generateUpgradeSchedule } from "../utils/scheduler";

interface UpgradeScheduleProps {
  builders: Builder[];
  buildingQueue: BuildingQueueItem[];
  selectedTasks: number[];
  setSelectedTasks: React.Dispatch<React.SetStateAction<number[]>>;
}

const UpgradeSchedule: React.FC<UpgradeScheduleProps> = ({
  builders,
  buildingQueue,
  selectedTasks,
  setSelectedTasks,
}) => {
  const [isScheduleGenerated, setIsScheduleGenerated] = useState(false);

  // Generate schedule based on builders and building queue
  const schedule = useMemo(() => {
    if (builders.length === 0 || buildingQueue.length === 0) {
      return [];
    }
    return generateUpgradeSchedule(builders, buildingQueue);
  }, [builders, buildingQueue]);

  // Group schedule items by builder
  const scheduleByBuilder = useMemo(() => {
    const groupedSchedule: Record<number, ScheduleItem[]> = {};
    
    schedule.forEach(item => {
      if (!groupedSchedule[item.builderId]) {
        groupedSchedule[item.builderId] = [];
      }
      groupedSchedule[item.builderId].push(item);
    });
    
    // Sort tasks within each builder group by start time
    Object.keys(groupedSchedule).forEach(builderId => {
      groupedSchedule[Number(builderId)].sort((a, b) => 
        a.startTime.getTime() - b.startTime.getTime()
      );
    });
    
    return groupedSchedule;
  }, [schedule]);

  const handleCreateSchedule = () => {
    setIsScheduleGenerated(true);
  };

  const handleClearSchedule = () => {
    setIsScheduleGenerated(false);
    setSelectedTasks([]);
  };

  const toggleTaskSelection = (taskId: number) => {
    setSelectedTasks((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };

  // Toggle all tasks for a specific builder
  const toggleBuilderTasks = (builderId: number, tasks: ScheduleItem[]) => {
    const taskIds = tasks.map(task => task.id);
    const allSelected = taskIds.every(id => selectedTasks.includes(id));
    
    if (allSelected) {
      // Remove all tasks for this builder
      setSelectedTasks(prev => prev.filter(id => !taskIds.includes(id)));
    } else {
      // Add all tasks for this builder
      setSelectedTasks(prev => {
        const newSelection = [...prev];
        taskIds.forEach(id => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Find building name by ID
  const getBuildingName = (buildingId: number) => {
    const building = buildingQueue.find((b) => b.id === buildingId);
    return building ? building.name : 'Unknown';
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-black dark:text-white">
          <span className="inline-flex items-center gap-2">
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 2.5H15.8333V1.66667C15.8333 1.44565 15.7455 1.23369 15.5893 1.07741C15.433 0.921126 15.221 0.833333 15 0.833333C14.779 0.833333 14.567 0.921126 14.4107 1.07741C14.2545 1.23369 14.1667 1.44565 14.1667 1.66667V2.5H5.83333V1.66667C5.83333 1.44565 5.74554 1.23369 5.58926 1.07741C5.43297 0.921126 5.22101 0.833333 5 0.833333C4.77899 0.833333 4.56702 0.921126 4.41074 1.07741C4.25446 1.23369 4.16667 1.44565 4.16667 1.66667V2.5H3.33333C2.67029 2.5 2.03441 2.76339 1.55931 3.23849C1.08421 3.71359 0.833333 4.34946 0.833333 5.00001V16.6667C0.833333 17.3297 1.08421 17.9656 1.55931 18.4407C2.03441 18.9158 2.67029 19.1667 3.33333 19.1667H16.6667C17.3297 19.1667 17.9656 18.9158 18.4407 18.4407C18.9158 17.9656 19.1667 17.3297 19.1667 16.6667V5.00001C19.1667 4.34946 18.9158 3.71359 18.4407 3.23849C17.9656 2.76339 17.3297 2.5 16.6667 2.5ZM17.5 16.6667C17.5 16.8877 17.4122 17.0996 17.2559 17.2559C17.0996 17.4122 16.8877 17.5 16.6667 17.5H3.33333C3.11232 17.5 2.90036 17.4122 2.74408 17.2559C2.5878 17.0996 2.5 16.8877 2.5 16.6667V9.16667H17.5V16.6667ZM17.5 7.5H2.5V5.00001C2.5 4.77899 2.5878 4.56703 2.74408 4.41074C2.90036 4.25446 3.11232 4.16667 3.33333 4.16667H4.16667V5.00001C4.16667 5.22102 4.25446 5.43298 4.41074 5.58927C4.56702 5.74555 4.77899 5.83334 5 5.83334C5.22101 5.83334 5.43297 5.74555 5.58926 5.58927C5.74554 5.43298 5.83333 5.22102 5.83333 5.00001V4.16667H14.1667V5.00001C14.1667 5.22102 14.2545 5.43298 14.4107 5.58927C14.567 5.74555 14.779 5.83334 15 5.83334C15.221 5.83334 15.433 5.74555 15.5893 5.58927C15.7455 5.43298 15.8333 5.22102 15.8333 5.00001V4.16667H16.6667C16.8877 4.16667 17.0996 4.25446 17.2559 4.41074C17.4122 4.56703 17.5 4.77899 17.5 5.00001V7.5Z"
                fill=""
              />
            </svg>
            Upgrade Schedule
          </span>
        </h3>
      </div>

      <div className="flex justify-between mb-5">
        <button
          onClick={handleCreateSchedule}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90"
        >
          Create Schedule
        </button>
        <button
          onClick={handleClearSchedule}
          className="inline-flex items-center justify-center rounded-md border border-stroke py-2 px-10 text-center font-medium hover:bg-opacity-90"
        >
          Clear
        </button>
      </div>

      {Object.keys(scheduleByBuilder).length === 0 ? (
        <div className="text-center p-5">
          <p className="text-gray-500 dark:text-gray-400">
            {isScheduleGenerated
              ? "No upgrades to schedule. Add buildings to the queue first."
              : "Click 'Create Schedule' to generate an upgrade plan."}
          </p>
        </div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          {Object.entries(scheduleByBuilder).map(([builderId, builderTasks]) => (
            <div key={builderId} className="mb-6">
              <div className="bg-gray-100 dark:bg-meta-4 p-3 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={builderTasks.every(task => selectedTasks.includes(task.id))}
                    onChange={() => toggleBuilderTasks(Number(builderId), builderTasks)}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-strokedark dark:bg-boxdark"
                  />
                  <h4 className="font-semibold text-black dark:text-white">Builder {builderId}</h4>
                </div>
                <span className="text-sm text-gray-500">
                  {builderTasks.length} task{builderTasks.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <table className="w-full table-auto">
                <thead className="bg-white dark:bg-boxdark">
                  <tr className="text-left">
                    <th className="py-3 px-4 font-medium text-black dark:text-white w-10"></th>
                    <th className="py-3 px-4 font-medium text-black dark:text-white">
                      Building
                    </th>
                    <th className="py-3 px-4 font-medium text-black dark:text-white">
                      Start
                    </th>
                    <th className="py-3 px-4 font-medium text-black dark:text-white">
                      End
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {builderTasks.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-meta-4">
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(item.id)}
                          onChange={() => toggleTaskSelection(item.id)}
                          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-strokedark dark:bg-boxdark"
                        />
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <span className="font-medium text-black dark:text-white">
                          {getBuildingName(item.buildingId)}
                        </span>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <span className="text-sm text-black dark:text-white">
                          {formatDate(item.startTime)}
                        </span>
                      </td>
                      <td className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                        <span className="text-sm text-black dark:text-white">
                          {formatDate(item.endTime)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpgradeSchedule; 