"use client";

import { useState } from "react";
import { Builder } from "../types";

interface BuilderStatusProps {
  builders: Builder[];
  setBuilders: React.Dispatch<React.SetStateAction<Builder[]>>;
  sleepTime: string;
  setSleepTime: React.Dispatch<React.SetStateAction<string>>;
  sleepDuration: number;
  setSleepDuration: React.Dispatch<React.SetStateAction<number>>;
}

const BuilderStatus: React.FC<BuilderStatusProps> = ({
  builders,
  setBuilders,
  sleepTime,
  setSleepTime,
  sleepDuration,
  setSleepDuration,
}) => {
  const [builderCount, setBuilderCount] = useState<number>(builders.length || 2);

  const handleBuilderCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setBuilderCount(count);
    
    // Create new builders array with the selected count
    const newBuilders: Builder[] = [];
    for (let i = 0; i < count; i++) {
      // Preserve existing builder data if available
      if (i < builders.length) {
        newBuilders.push(builders[i]);
      } else {
        // Add new builder with default values
        newBuilders.push({
          id: i + 1,
          status: 'idle',
        });
      }
    }
    setBuilders(newBuilders);
  };

  const updateBuilderStatus = (
    builderId: number,
    status: 'idle' | 'busy',
    days?: number,
    hours?: number,
    minutes?: number
  ) => {
    setBuilders((prevBuilders) =>
      prevBuilders.map((builder) => {
        if (builder.id === builderId) {
          return {
            ...builder,
            status,
            remainingTime:
              status === 'busy'
                ? {
                    days: days || 0,
                    hours: hours || 0,
                    minutes: minutes || 0,
                  }
                : undefined,
          };
        }
        return builder;
      })
    );
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
            Builder Status
          </span>
        </h3>
      </div>

      <div className="mb-5">
        <label className="mb-2.5 block text-black dark:text-white">
          Jumlah Builder
        </label>
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            value={builderCount}
            onChange={handleBuilderCountChange}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            {[1, 2, 3, 4, 5].map((count) => (
              <option key={count} value={count}>
                {count} Builders
              </option>
            ))}
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

      {builders.map((builder) => (
        <div
          key={builder.id}
          className="mb-5 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
            Builder {builder.id}
          </h4>

          <div className="mb-4">
            <div className="flex items-center">
              <div className="mr-4 flex">
                <label
                  htmlFor={`idle-${builder.id}`}
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      id={`idle-${builder.id}`}
                      name={`builder-status-${builder.id}`}
                      className="sr-only"
                      checked={builder.status === 'idle'}
                      onChange={() => updateBuilderStatus(builder.id, 'idle')}
                    />
                    <div className="box mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                      <span className={`h-2.5 w-2.5 rounded-full bg-primary ${builder.status === 'idle' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                  </div>
                  <span className="text-sm text-black dark:text-white">
                    Available now
                  </span>
                </label>
              </div>

              <div className="flex">
                <label
                  htmlFor={`busy-${builder.id}`}
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      id={`busy-${builder.id}`}
                      name={`builder-status-${builder.id}`}
                      className="sr-only"
                      checked={builder.status === 'busy'}
                      onChange={() => updateBuilderStatus(builder.id, 'busy', 0, 0, 0)}
                    />
                    <div className="box mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                      <span className={`h-2.5 w-2.5 rounded-full bg-primary ${builder.status === 'busy' ? 'opacity-100' : 'opacity-0'}`}></span>
                    </div>
                  </div>
                  <span className="text-sm text-black dark:text-white">
                    Busy for...
                  </span>
                </label>
              </div>
            </div>
          </div>

          {builder.status === 'busy' && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-sm text-black dark:text-white">
                  Days
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={builder.remainingTime?.days || ''}
                  onChange={(e) =>
                    updateBuilderStatus(
                      builder.id,
                      'busy',
                      parseInt(e.target.value) || 0,
                      builder.remainingTime?.hours || 0,
                      builder.remainingTime?.minutes || 0
                    )
                  }
                  className="w-full rounded border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-black dark:text-white">
                  Hours
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  placeholder="0"
                  value={builder.remainingTime?.hours || ''}
                  onChange={(e) =>
                    updateBuilderStatus(
                      builder.id,
                      'busy',
                      builder.remainingTime?.days || 0,
                      parseInt(e.target.value) || 0,
                      builder.remainingTime?.minutes || 0
                    )
                  }
                  className="w-full rounded border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-black dark:text-white">
                  Minutes
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="0"
                  value={builder.remainingTime?.minutes || ''}
                  onChange={(e) =>
                    updateBuilderStatus(
                      builder.id,
                      'busy',
                      builder.remainingTime?.days || 0,
                      builder.remainingTime?.hours || 0,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full rounded border border-stroke bg-transparent py-2 px-4 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mb-5">
        <label className="mb-2.5 block text-black dark:text-white">
          Sleep Time
        </label>
        <input
          type="time"
          value={sleepTime}
          onChange={(e) => setSleepTime(e.target.value)}
          className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2.5 block text-black dark:text-white">
          Sleep Duration (hours)
        </label>
        <input
          type="number"
          min="1"
          max="24"
          placeholder="8"
          value={sleepDuration || ''}
          onChange={(e) => setSleepDuration(parseInt(e.target.value) || 8)}
          className="w-full rounded border border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </div>
  );
};

export default BuilderStatus; 