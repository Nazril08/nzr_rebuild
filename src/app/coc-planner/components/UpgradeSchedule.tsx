"use client";

import { useEffect, useState } from "react";
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
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  
  useEffect(() => {
    if (builders.length > 0 && buildingQueue.length > 0) {
      const schedule = generateUpgradeSchedule(builders, buildingQueue);
      setScheduleItems(schedule);
    } else {
      setScheduleItems([]);
    }
  }, [builders, buildingQueue]);

  const handleTaskSelection = (taskId: number) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleClearSelection = () => {
    setSelectedTasks([]);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const handleCreateSchedule = () => {
    if (builders.length > 0 && buildingQueue.length > 0) {
      const schedule = generateUpgradeSchedule(builders, buildingQueue);
      setScheduleItems(schedule);
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
            Upgrade Schedule
          </span>
        </h3>
      </div>

      <div className="flex justify-between mb-5">
        <button
          onClick={handleCreateSchedule}
          className="inline-flex items-center justify-center rounded bg-primary py-2 px-6 text-white hover:bg-opacity-90"
        >
          <span className="mr-2">
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
          </span>
          Create Schedule
        </button>

        <button
          onClick={handleClearSelection}
          className="inline-flex items-center justify-center rounded border border-stroke py-2 px-6 text-center font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
        >
          Clear
        </button>
      </div>

      {scheduleItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
            Belum ada jadwal yang dibuat.
          </p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full table-auto">
            <thead className="sticky top-0 bg-white dark:bg-boxdark">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="w-12 py-4 px-4 font-medium text-black dark:text-white">
                  #
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Building
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Builder
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Start
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  End
                </th>
              </tr>
            </thead>
            <tbody>
              {scheduleItems.map((item) => {
                const building = buildingQueue.find(
                  (b) => b.id === item.buildingId
                );
                return (
                  <tr key={item.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <input
                        type="checkbox"
                        checked={selectedTasks.includes(item.id)}
                        onChange={() => handleTaskSelection(item.id)}
                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {building?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {building?.category}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        Builder {item.builderId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatDateTime(item.startTime)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {formatDateTime(item.endTime)}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpgradeSchedule;