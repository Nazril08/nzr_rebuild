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
  const [category, setCategory] = useState<"Defense" | "Army" | "Resource" | "Other">("Defense");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [days, setDays] = useState<number | "">("");
  const [hours, setHours] = useState<number | "">("");
  const [minutes, setMinutes] = useState<number | "">("");

  const handleAddBuilding = () => {
    if (!buildingName.trim()) return;

    const newBuilding: BuildingQueueItem = {
      id: Date.now(),
      name: buildingName,
      category,
      priority,
      duration: {
        days: typeof days === "number" ? days : 0,
        hours: typeof hours === "number" ? hours : 0,
        minutes: typeof minutes === "number" ? minutes : 0,
      },
    };

    setBuildingQueue([...buildingQueue, newBuilding]);
    resetForm();
  };

  const handleRemoveBuilding = (id: number) => {
    setBuildingQueue(buildingQueue.filter((item) => item.id !== id));
  };

  const resetForm = () => {
    setBuildingName("");
    setCategory("Defense");
    setPriority("Medium");
    setDays("");
    setHours("");
    setMinutes("");
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium text-black dark:text-white">
          <span className="inline-flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3333 1.66667H1.66667C1.29848 1.66667 1 1.96514 1 2.33333V17.6667C1 18.0349 1.29848 18.3333 1.66667 18.3333H18.3333C18.7015 18.3333 19 18.0349 19 17.6667V2.33333C19 1.96514 18.7015 1.66667 18.3333 1.66667Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 6.33333H19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.33334 18.3333V6.33333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Building Queue
          </span>
        </h3>
        <button
          onClick={() => window.open("https://clashofclans.fandom.com/wiki/Buildings", "_blank")}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-4"
        >
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 8H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Reference
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
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
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
            onChange={(e) => setPriority(e.target.value as any)}
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="number"
              min="0"
              placeholder="Days"
              value={days}
              onChange={(e) => setDays(e.target.value === "" ? "" : parseInt(e.target.value))}
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="23"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value === "" ? "" : parseInt(e.target.value))}
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="59"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value === "" ? "" : parseInt(e.target.value))}
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleAddBuilding}
        className="flex w-full items-center justify-center gap-2 rounded bg-primary py-2.5 px-4.5 font-medium text-white hover:bg-opacity-90"
      >
        Add to Queue
      </button>

      <div className="mt-6.5">
        <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
          Building Queue
        </h4>
        {buildingQueue.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No building in queue</p>
        ) : (
          <div className="max-h-70 overflow-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Building
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                    Category
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {buildingQueue.map((building) => (
                  <tr key={building.id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <h5 className="font-medium text-black dark:text-white">
                            {building.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            {building.duration.days}d {building.duration.hours}h {building.duration.minutes}m
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className={`inline-block rounded-full py-1 px-3 text-sm font-medium ${
                        building.category === "Defense"
                          ? "bg-red-100 text-red-600"
                          : building.category === "Army"
                          ? "bg-blue-100 text-blue-600"
                          : building.category === "Resource"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {building.category}
                      </span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => handleRemoveBuilding(building.id)}
                          className="hover:text-danger"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingQueue; 