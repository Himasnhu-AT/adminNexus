export interface Project {
  id: number;
  name: string;
  totalLogs: number;
  errorRate: string;
}

export interface Log {
  id: number;
  message: string;
  severity: string;
  timestamp: string;
}
