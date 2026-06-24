export interface KPIHistory {
  date: string;
  value: number;
}

export interface KPI {
  id: string;
  name: string;
  current: number;
  target: number;
  baseline: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  status: 'on-target' | 'watch' | 'critical';
  history: KPIHistory[];
  explanation: string;
}

export const kpis: KPI[] = [
  {
    id: 'coverage',
    name: 'Platform Automation',
    current: 95,
    target: 95,
    baseline: 40,
    unit: '%',
    trend: 'up',
    lastUpdated: '2 hours ago',
    status: 'on-target',
    history: [
      { date: '2026-01-15', value: 40 },
      { date: '2026-02-15', value: 52 },
      { date: '2026-03-15', value: 65 },
      { date: '2026-04-15', value: 80 },
      { date: '2026-05-15', value: 92 },
      { date: '2026-05-23', value: 95 }
    ],
    explanation: 'Percentage of enterprise systems fully mapped and integrated automatically without manual effort.'
  },
  {
    id: 'freshness',
    name: 'Data Freshness',
    current: 4,
    target: 4,
    baseline: 56,
    unit: 'hours max lag',
    trend: 'down',
    lastUpdated: 'Real-time',
    status: 'on-target',
    history: [
      { date: '2026-01-15', value: 336 },
      { date: '2026-02-15', value: 168 },
      { date: '2026-03-15', value: 96 },
      { date: '2026-04-15', value: 48 },
      { date: '2026-05-15', value: 24 },
      { date: '2026-05-23', value: 4 }
    ],
    explanation: 'Maximum time delay between a change happening in source systems and being visible in reports.'
  },
  {
    id: 'error-rate',
    name: 'Data Error Rate',
    current: 2,
    target: 2,
    baseline: 18,
    unit: '%',
    trend: 'down',
    lastUpdated: '4 hours ago',
    status: 'on-target',
    history: [
      { date: '2026-01-15', value: 18 },
      { date: '2026-02-15', value: 15 },
      { date: '2026-03-15', value: 12 },
      { date: '2026-04-15', value: 6 },
      { date: '2026-05-15', value: 3 },
      { date: '2026-05-23', value: 2 }
    ],
    explanation: 'Percentage of records with critical missing fields or conflicts blocked by automated quality gates.'
  },
  {
    id: 'eaimm-score',
    name: 'Platform Maturity',
    current: 22,
    target: 22,
    baseline: 9,
    unit: '/25',
    trend: 'up',
    lastUpdated: 'Quarterly',
    status: 'on-target',
    history: [
      { date: '2026-01-15', value: 9 },
      { date: '2026-03-01', value: 12 },
      { date: '2026-05-23', value: 22 }
    ],
    explanation: 'Our overall structural health score. Measures how well we govern, connect, and utilize our data assets.'
  },
  {
    id: 'steward-sla',
    name: 'Data Quality Governance',
    current: 92,
    target: 90,
    baseline: 0,
    unit: '%',
    trend: 'stable',
    lastUpdated: 'Monthly',
    status: 'on-target',
    history: [
      { date: '2026-02-15', value: 85 },
      { date: '2026-03-15', value: 88 },
      { date: '2026-04-15', value: 89 },
      { date: '2026-05-15', value: 91 },
      { date: '2026-05-23', value: 92 }
    ],
    explanation: 'Adherence to data quality standards. How consistently data owners resolve flagged data issues within 48 hours.'
  },
  {
    id: 'fte-hours',
    name: 'Operational Efficiency',
    current: 960,
    target: 960,
    baseline: 2400,
    unit: 'hours/year',
    trend: 'down',
    lastUpdated: 'Monthly',
    status: 'on-target',
    history: [
      { date: '2026-01-15', value: 2400 },
      { date: '2026-02-15', value: 2100 },
      { date: '2026-03-15', value: 1800 },
      { date: '2026-04-15', value: 1200 },
      { date: '2026-05-15', value: 1000 },
      { date: '2026-05-23', value: 960 }
    ],
    explanation: 'Manual hours spent yearly by employees compiling reports. A lower number translates directly to cost savings.'
  }
];
