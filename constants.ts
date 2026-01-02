import { AssetNode, BackfillJob, EngineStatus, JobStatus, NodeType, SystemHealth } from './types';

export const MOCK_HIERARCHY: AssetNode[] = [
  {
    id: 'ent-1',
    name: 'Global Manufacturing',
    type: NodeType.Enterprise,
    children: [
      {
        id: 'site-1',
        name: 'Houston Plant 01',
        type: NodeType.Site,
        children: [
          {
            id: 'area-a',
            name: 'Area A (Packaging)',
            type: NodeType.Area,
            children: [
              {
                id: 'line-1',
                name: 'Line 1',
                type: NodeType.Line,
                children: [
                  {
                    id: 'pump-001',
                    name: 'Pump_001',
                    type: NodeType.Asset,
                    unsPath: 'Enterprise/Houston/AreaA/Line1/Pump001',
                    dataSource: 'OSIsoft PI',
                    attributes: [
                      { id: 'a1', name: 'Temperature', dataType: 'Float', sourceTag: 'TIC-101.PV', transformation: 'return val * 1.0;' },
                      { id: 'a2', name: 'Vibration', dataType: 'Float', sourceTag: 'VIB-202.PV', transformation: 'return val / 1000;', isKpi: true },
                      { id: 'a3', name: 'Status', dataType: 'Boolean', sourceTag: 'STS-001.PV' },
                      { id: 'a4', name: 'Efficiency', dataType: 'Float', transformation: 'return (power_out / power_in) * 100;', isKpi: true }
                    ]
                  },
                  {
                    id: 'pump-002',
                    name: 'Pump_002',
                    type: NodeType.Asset,
                    unsPath: 'Enterprise/Houston/AreaA/Line1/Pump002',
                    dataSource: 'SQL_Historian',
                    attributes: [
                      { id: 'a1', name: 'Temperature', dataType: 'Float', sourceTag: 'TIC-102.PV' }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'area-b',
            name: 'Area B (Processing)',
            type: NodeType.Area,
            children: []
          }
        ]
      },
      {
        id: 'site-2',
        name: 'Berlin Plant 02',
        type: NodeType.Site,
        children: []
      }
    ]
  }
];

export const MOCK_JOBS: BackfillJob[] = [
  {
    id: 'job-101',
    assetName: 'Pump_001',
    kpiName: 'Efficiency (OEE)',
    startTime: '2023-01-01',
    endTime: '2023-06-30',
    progress: 100,
    status: JobStatus.Completed
  },
  {
    id: 'job-102',
    assetName: 'Pump_001',
    kpiName: 'Vibration Analysis',
    startTime: '2023-07-01',
    endTime: '2023-12-31',
    progress: 45,
    status: JobStatus.Processing
  },
  {
    id: 'job-103',
    assetName: 'Line 1',
    kpiName: 'Total Throughput',
    startTime: '2024-01-01',
    endTime: '2024-01-31',
    progress: 0,
    status: JobStatus.Queued
  }
];

export const MOCK_HEALTH: SystemHealth = {
  engineStatus: EngineStatus.Running,
  gatewayStatus: EngineStatus.Running,
  unsConnection: true,
  activeJoints: 142,
  eventsPerSec: 2450
};