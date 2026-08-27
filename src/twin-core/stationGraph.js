export const stationGraph = [
  { id: 'S1', name: 'Inbound prep', zone: 'Material flow', instrumentationTier: 'full', neighbors: ['S2'] },
  { id: 'S2', name: 'Precision weld', zone: 'Assembly', instrumentationTier: 'full', neighbors: ['S1', 'S3', 'S11'], critical: true },
  { id: 'S3', name: 'Torque cell', zone: 'Assembly', instrumentationTier: 'partial', neighbors: ['S2', 'S4'] },
  { id: 'S4', name: 'Seal press', zone: 'Assembly', instrumentationTier: 'full', neighbors: ['S3', 'S5'] },
  { id: 'S5', name: 'Vision gate', zone: 'Quality', instrumentationTier: 'partial', neighbors: ['S4', 'S6'] },
  { id: 'S6', name: 'Cure oven', zone: 'Quality', instrumentationTier: 'none', neighbors: ['S5', 'S7'] },
  { id: 'S7', name: 'Final test', zone: 'Quality', instrumentationTier: 'full', neighbors: ['S6', 'S8'] },
  { id: 'S8', name: 'Pack out', zone: 'Material flow', instrumentationTier: 'full', neighbors: ['S7'] },
  { id: 'S9', name: 'Sub-assembly A', zone: 'Assembly', instrumentationTier: 'partial', neighbors: ['S10'] },
  { id: 'S10', name: 'Sub-assembly B', zone: 'Assembly', instrumentationTier: 'full', neighbors: ['S9', 'S11'] },
  { id: 'S11', name: 'Robot feeder', zone: 'Material flow', instrumentationTier: 'none', neighbors: ['S10', 'S2'], critical: true },
  { id: 'S12', name: 'Buffer lane', zone: 'Material flow', instrumentationTier: 'partial', neighbors: ['S11', 'S13'] },
  { id: 'S13', name: 'Label cell', zone: 'Material flow', instrumentationTier: 'full', neighbors: ['S12', 'S14'] },
  { id: 'S14', name: 'Dispatch', zone: 'Material flow', instrumentationTier: 'full', neighbors: ['S13'] },
];

export const zoneColors = { 'Material flow': '#78d6c5', Assembly: '#f3b562', Quality: '#e67567' };
