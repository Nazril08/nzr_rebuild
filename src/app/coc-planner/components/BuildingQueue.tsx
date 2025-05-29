"use client";

import { useState } from "react";
import { BuildingQueueItem } from "../types";

interface BuildingQueueProps {
  buildingQueue: BuildingQueueItem[];
  setBuildingQueue: React.Dispatch<React.SetStateAction<BuildingQueueItem[]>>;
}

const BuildingQueue: React.FC<BuildingQueueProps> = ({
  buildingQueue,
  setBuildingQueue,
}) => {
  const [buildingName, setBuildingName] = useState<string>("");
  const [buildingCategory, setBuildingCategory] = useState<string>("Defense");
  const [priority, setPriority] = useState<string>("Medium");
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [isQueueManagementOpen, setIsQueueManagementOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleAddToQueue = () => {
    if (buildingName.trim() === "" || (days === 0 && hours === 0 && minutes === 0)) {
      return;
    }

    const newItem: BuildingQueueItem = {
      id: Date.now(),
      name: buildingName,
      category: buildingCategory as any,
      duration: {
        days,
        hours,
        minutes,
      },
      priority: priority as any,
    };

    setBuildingQueue([...buildingQueue, newItem]);
    setBuildingName("");
    setDays(0);
    setHours(0);
    setMinutes(0);
  };

  const handleRemoveSelected = () => {
    setBuildingQueue(buildingQueue.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(buildingQueue.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, id]);
      if (selectedItems.length + 1 === buildingQueue.length) {
        setSelectAll(true);
      }
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
            Building Queue
          </span>
        </h3>
        <button
          onClick={() => setIsQueueManagementOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-6 xl:px-7"
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
          Manage Queue
        </button>
      </div>

      <div className="mb-5">
        <label className="mb-2.5 block text-black dark:text-white">
          Building name
        </label>
        <input
          type="text"
          placeholder="Enter building name"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2.5 block text-black dark:text-white">
          Category
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            value={buildingCategory}
            onChange={(e) => setBuildingCategory(e.target.value)}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="Defense">Defense</option>
            <option value="Army">Army</option>
            <option value="Resource">Resource</option>
            <option value="Other">Other</option>
          </select>
          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2.5 block text-black dark:text-white">
          Priority
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                  fill=""
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-2.5 block text-black dark:text-white">
          Upgrade Duration
        </label>
        <div className="flex gap-4">
          <div>
            <input
              type="number"
              min="0"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Days"
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Hours"
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Minutes"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleAddToQueue}
        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
      >
        Add to Queue
      </button>

      {/* Building Queue Table */}
      <div className="mt-5">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Building Queue
          </h4>
          <div className="max-h-90 overflow-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Building
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Category
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Duration
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody>
                {buildingQueue.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">{item.name}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.category}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {item.duration.days > 0 && `${item.duration.days}d `}
                        {item.duration.hours > 0 && `${item.duration.hours}h `}
                        {item.duration.minutes > 0 && `${item.duration.minutes}m`}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          item.priority === "High"
                            ? "bg-success text-success"
                            : item.priority === "Medium"
                            ? "bg-warning text-warning"
                            : "bg-danger text-danger"
                        }`}
                      >
                        {item.priority}
                      </p>
                    </td>
                  </tr>
                ))}
                {buildingQueue.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark"
                    >
                      <p className="text-black dark:text-white">
                        No buildings in queue
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Queue Management Modal */}
      {isQueueManagementOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-full max-w-lg rounded-lg bg-white p-8 dark:bg-boxdark">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Queue Management
              </h3>
              <button
                onClick={() => {
                  setIsQueueManagementOpen(false);
                  setSelectedItems([]);
                  setSelectAll(false);
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8323 9.23303L18.7074 2.35786C19.0979 1.96734 19.0979 1.33418 18.7074 0.943654C18.3168 0.553131 17.6837 0.553131 17.2931 0.943654L10.418 7.81883L3.54289 0.943654C3.15237 0.553131 2.51921 0.553131 2.12868 0.943654C1.73816 1.33418 1.73816 1.96734 2.12868 2.35786L9.00385 9.23303L2.12868 16.1082C1.73816 16.4987 1.73816 17.1319 2.12868 17.5224C2.31894 17.7127 2.56921 17.8078 2.81947 17.8078C3.06974 17.8078 3.32 17.7127 3.51026 17.5224L10.418 10.6472L17.2931 17.5224C17.4834 17.7127 17.7337 17.8078 17.9839 17.8078C18.2342 17.8078 18.4844 17.7127 18.6747 17.5224C19.0653 17.1319 19.0653 16.4987 18.6747 16.1082L11.8323 9.23303Z"
                    fill=""
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="select-all"
                checked={selectAll}
                onChange={handleSelectAll}
                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="select-all"
                className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Select All
              </label>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {buildingQueue.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 flex items-center rounded border border-stroke p-3 dark:border-strokedark"
                >
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`item-${item.id}`}
                    className="ml-2 flex-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-black dark:text-white">
                        {item.name}
                      </span>
                      <span
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          item.priority === "High"
                            ? "bg-success text-success"
                            : item.priority === "Medium"
                            ? "bg-warning text-warning"
                            : "bg-danger text-danger"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="mr-3">{item.category}</span>
                      <span>
                        {item.duration.days > 0 && `${item.duration.days}d `}
                        {item.duration.hours > 0 && `${item.duration.hours}h `}
                        {item.duration.minutes > 0 && `${item.duration.minutes}m`}
                      </span>
                    </div>
                  </label>
                </div>
              ))}
              {buildingQueue.length === 0 && (
                <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                  No buildings in queue
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setIsQueueManagementOpen(false);
                  setSelectedItems([]);
                  setSelectAll(false);
                }}
                className="mr-2 rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveSelected}
                disabled={selectedItems.length === 0}
                className={`rounded px-6 py-2 font-medium text-white ${
                  selectedItems.length === 0
                    ? "bg-gray-300 dark:bg-gray-600"
                    : "bg-danger hover:bg-opacity-90"
                }`}
              >
                Remove Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingQueue; 