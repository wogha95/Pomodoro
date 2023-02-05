export interface Alarm {
  name: "update" | "25min" | "50min";
  periodInMinutes?: number;
  scheduledTime: number;
}

interface AlarmCreateInfo {
  delayInMinutes?: number;
  periodInMinutes?: number;
  when?: number;
}

interface NotificationOptions {
  type: "basic" | "image" | "list" | "progress";
  title: string;
  message: string;
  iconUrl: string;
}

export interface Chrome {
  alarms: {
    getAll: () => Alarm[];
    create: (name: string, alarmInfo: AlarmCreateInfo) => Promise<void>;
    clearAll: () => Promise<boolean>;
    onAlarm: {
      addListener: (callback: (alarm: Alarm) => void) => void;
    };
  };
  action: {
    setIcon: (details: { path: string }) => Promise<void>;
    setTitle: (details: { title: string }) => Promise<void>;
  };
  notifications: {
    create: (options: NotificationOptions) => void;
  };
}
