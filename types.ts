export enum NodeType {
  Enterprise = 'Enterprise',
  Site = 'Site',
  Area = 'Area',
  Line = 'Line',
  Asset = 'Asset'
}

export enum EngineStatus {
  Running = 'Running',
  Stopped = 'Stopped',
  Warning = 'Warning',
  Error = 'Error'
}

export enum JobStatus {
  Queued = 'Queued',
  Processing = 'Processing',
  Completed = 'Completed',
  Failed = 'Failed'
}

export interface Attribute {
  id: string;
  name: string;
  dataType: string;
  sourceTag?: string; // e.g., PLC.DB10.Temp
  transformation?: string; // e.g., val * 1.8 + 32
  description?: string;
  isKpi?: boolean;
}

export interface AssetNode {
  id: string;
  name: string;
  type: NodeType;
  children?: AssetNode[];
  attributes?: Attribute[];
  unsPath?: string; // e.g., Enterprise/Site1/AreaA/Pump1
  dataSource?: string; // e.g., SQL_Historian_01
}

export interface BackfillJob {
  id: string;
  assetName: string;
  kpiName: string;
  startTime: string;
  endTime: string;
  progress: number; // 0-100
  status: JobStatus;
}

export interface SystemHealth {
  engineStatus: EngineStatus;
  gatewayStatus: EngineStatus;
  unsConnection: boolean;
  activeJoints: number;
  eventsPerSec: number;
}