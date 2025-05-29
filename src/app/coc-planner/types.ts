export interface Builder {
  id: number;
  status: 'idle' | 'busy';
  remainingTime?: {
    days: number;
    hours: number;
    minutes: number;
  };
}

export interface BuildingQueueItem {
  id: number;
  name: string;
  category: 'Defense' | 'Army' | 'Resource' | 'Other';
  duration: {
    days: number;
    hours: number;
    minutes: number;
  };
  priority: 'High' | 'Medium' | 'Low';
}

export interface UpgradeTask {
  buildingId: number;
  builderId: number;
  startTime: Date;
  endTime: Date;
}

export interface ScheduleItem {
  id: number;
  buildingId: number;
  builderId: number;
  startTime: Date;
  endTime: Date;
  selected: boolean;
}

export type TimelineItem = {
  builderId: number;
  tasks: {
    id: number;
    buildingId: number;
    startTime: Date;
    endTime: Date;
  }[];
}; 