import { Builder, BuildingQueueItem, ScheduleItem, TimelineItem } from "../types";

/**
 * Convert duration object to total minutes
 */
const durationToMinutes = (duration: { days: number; hours: number; minutes: number }): number => {
  return duration.days * 24 * 60 + duration.hours * 60 + duration.minutes;
};

/**
 * Add minutes to a date
 */
const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};

/**
 * Check if a time falls within the sleep period
 */
const isInSleepPeriod = (
  time: Date,
  sleepTime: string,
  sleepDuration: number
): boolean => {
  // Parse sleep time
  const [sleepHours, sleepMinutes] = sleepTime.split(":").map(Number);
  
  // Create sleep start and end times for today
  const today = new Date();
  const sleepStart = new Date(today);
  sleepStart.setHours(sleepHours, sleepMinutes, 0, 0);
  
  const sleepEnd = new Date(sleepStart);
  sleepEnd.setHours(sleepStart.getHours() + sleepDuration);
  
  // Check if the given time is within the sleep period
  const timeHours = time.getHours();
  const timeMinutes = time.getMinutes();
  
  // Convert all to minutes since midnight for easier comparison
  const timeInMinutes = timeHours * 60 + timeMinutes;
  const sleepStartInMinutes = sleepHours * 60 + sleepMinutes;
  const sleepEndInMinutes = (sleepHours + sleepDuration) % 24 * 60 + sleepMinutes;
  
  if (sleepStartInMinutes < sleepEndInMinutes) {
    // Normal case: sleep period doesn't cross midnight
    return timeInMinutes >= sleepStartInMinutes && timeInMinutes < sleepEndInMinutes;
  } else {
    // Sleep period crosses midnight
    return timeInMinutes >= sleepStartInMinutes || timeInMinutes < sleepEndInMinutes;
  }
};

/**
 * Generate an upgrade schedule based on builders and building queue
 */
export const generateUpgradeSchedule = (
  builders: Builder[],
  buildingQueue: BuildingQueueItem[]
): ScheduleItem[] => {
  // Sort the building queue by priority (High > Medium > Low)
  const sortedQueue = [...buildingQueue].sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      High: 0,
      Medium: 1,
      Low: 2,
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const scheduleItems: ScheduleItem[] = [];
  let nextId = 1;

  // Create a copy of builders with their availability times
  const builderAvailability = builders.map(builder => {
    if (builder.status === 'idle') {
      return {
        id: builder.id,
        nextAvailableTime: new Date() // Available now
      };
    } else {
      // Calculate when the builder will be available
      const now = new Date();
      const availableTime = addMinutes(
        now,
        durationToMinutes(builder.remainingTime || { days: 0, hours: 0, minutes: 0 })
      );
      return {
        id: builder.id,
        nextAvailableTime: availableTime
      };
    }
  });

  // Assign buildings to builders
  for (const building of sortedQueue) {
    // Find the earliest available builder
    builderAvailability.sort((a, b) => a.nextAvailableTime.getTime() - b.nextAvailableTime.getTime());
    const earliestBuilder = builderAvailability[0];
    
    // Calculate start and end times
    const startTime = earliestBuilder.nextAvailableTime;
    const durationInMinutes = durationToMinutes(building.duration);
    const endTime = addMinutes(startTime, durationInMinutes);
    
    // Update builder's next available time
    earliestBuilder.nextAvailableTime = endTime;
    
    // Add to schedule
    scheduleItems.push({
      id: nextId++,
      buildingId: building.id,
      builderId: earliestBuilder.id,
      startTime,
      endTime,
      selected: false
    });
  }

  return scheduleItems;
};

/**
 * Generate a builder timeline based on selected tasks
 */
export const generateBuilderTimeline = (
  builders: Builder[],
  buildingQueue: BuildingQueueItem[],
  selectedTaskIds: number[]
): TimelineItem[] => {
  // First generate the complete schedule
  const allScheduleItems = generateUpgradeSchedule(builders, buildingQueue);
  
  // Filter to only include selected tasks
  const selectedScheduleItems = allScheduleItems.filter(item => 
    selectedTaskIds.includes(item.id)
  );
  
  // Group tasks by builder
  const timelineItems: TimelineItem[] = [];
  
  for (const builder of builders) {
    const builderTasks = selectedScheduleItems
      .filter(item => item.builderId === builder.id)
      .map(item => ({
        id: item.id,
        buildingId: item.buildingId,
        startTime: item.startTime,
        endTime: item.endTime
      }));
    
    if (builderTasks.length > 0) {
      timelineItems.push({
        builderId: builder.id,
        tasks: builderTasks
      });
    }
  }
  
  return timelineItems;
}; 