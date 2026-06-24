export interface StewardException {
  id: string;
  applicationName: string;
  issueType: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  raisedDate: string;
  dueDate: string;
  status: 'open' | 'in-progress' | 'pending-approval';
}

export interface StewardHistoryEntry {
  month: string;
  slaCompliance: number;
  reviewsCompleted: number;
  reviewsRequired: number;
  exceptionsRaised: number;
  exceptionsClosed: number;
  avgResolutionDays: number;
}

export interface Steward {
  id: string;
  name: string;
  email: string;
  role: string;
  domain: string;
  domainDescription: string;
  applicationCount: number;
  slaCompliance: number;
  slaTarget: number;
  status: 'on-target' | 'watch' | 'critical';
  lastReviewDate: string;
  nextReviewDate: string;
  activeExceptions: StewardException[];
  history: StewardHistoryEntry[];
}

export const stewards: Steward[] = [
  {
    id: 'steward-001',
    name: 'Jane Smith',
    email: 'jane.smith@enterprise.com',
    role: 'Senior Enterprise Architect',
    domain: 'Applications',
    domainDescription: 'Enterprise application portfolio including SaaS, cloud-native, and on-premise systems across all business units',
    applicationCount: 42,
    slaCompliance: 94,
    slaTarget: 90,
    status: 'on-target',
    lastReviewDate: '2026-05-20',
    nextReviewDate: '2026-06-03',
    activeExceptions: [
      {
        id: 'exc-app-001',
        applicationName: 'SAP ECC',
        issueType: 'Stale Metadata',
        description: 'SAP ECC module ownership data has not been refreshed since migration to S/4HANA began. Technical owner field references departed employee. Requires manual reconciliation with HR system.',
        severity: 'high',
        raisedDate: '2026-05-10',
        dueDate: '2026-05-28',
        status: 'in-progress'
      },
      {
        id: 'exc-app-002',
        applicationName: 'Legacy Mainframe CICS',
        issueType: 'Missing Integration',
        description: 'Mainframe CICS transaction system lacks API endpoint for automated metadata collection. Currently requires manual quarterly survey from infrastructure team. Middleware adapter in development.',
        severity: 'medium',
        raisedDate: '2026-04-22',
        dueDate: '2026-06-15',
        status: 'in-progress'
      },
      {
        id: 'exc-app-003',
        applicationName: 'Tableau Server',
        issueType: 'Classification Dispute',
        description: 'Data classification for Tableau Server reporting layer disputed between Security and BI teams. Contains aggregated views of Confidential data but no raw PII. Awaiting ARB ruling on derived-data classification policy.',
        severity: 'low',
        raisedDate: '2026-05-15',
        dueDate: '2026-06-10',
        status: 'pending-approval'
      }
    ],
    history: [
      {
        month: '2025-12',
        slaCompliance: 78,
        reviewsCompleted: 28,
        reviewsRequired: 38,
        exceptionsRaised: 8,
        exceptionsClosed: 3,
        avgResolutionDays: 18
      },
      {
        month: '2026-01',
        slaCompliance: 82,
        reviewsCompleted: 31,
        reviewsRequired: 38,
        exceptionsRaised: 6,
        exceptionsClosed: 5,
        avgResolutionDays: 15
      },
      {
        month: '2026-02',
        slaCompliance: 86,
        reviewsCompleted: 34,
        reviewsRequired: 40,
        exceptionsRaised: 5,
        exceptionsClosed: 6,
        avgResolutionDays: 12
      },
      {
        month: '2026-03',
        slaCompliance: 89,
        reviewsCompleted: 36,
        reviewsRequired: 40,
        exceptionsRaised: 4,
        exceptionsClosed: 5,
        avgResolutionDays: 10
      },
      {
        month: '2026-04',
        slaCompliance: 92,
        reviewsCompleted: 38,
        reviewsRequired: 41,
        exceptionsRaised: 4,
        exceptionsClosed: 4,
        avgResolutionDays: 8
      },
      {
        month: '2026-05',
        slaCompliance: 94,
        reviewsCompleted: 40,
        reviewsRequired: 42,
        exceptionsRaised: 3,
        exceptionsClosed: 3,
        avgResolutionDays: 7
      }
    ]
  },
  {
    id: 'steward-002',
    name: 'Bob Wilson',
    email: 'bob.wilson@enterprise.com',
    role: 'Principal Solution Architect',
    domain: 'Projects',
    domainDescription: 'Strategic IT project portfolio including transformation programs, infrastructure modernization, and digital initiatives across all business lines',
    applicationCount: 28,
    slaCompliance: 87.5,
    slaTarget: 90,
    status: 'watch',
    lastReviewDate: '2026-05-18',
    nextReviewDate: '2026-06-01',
    activeExceptions: [
      {
        id: 'exc-prj-001',
        applicationName: 'Azure DevOps',
        issueType: 'Schema Mismatch',
        description: 'Azure DevOps work item schema changed after v19.2 upgrade. Custom fields for EA traceability (Capability Link, Architecture Decision Record) were dropped. Requires re-mapping via REST API connector and backfill of 340 work items.',
        severity: 'high',
        raisedDate: '2026-05-05',
        dueDate: '2026-05-26',
        status: 'in-progress'
      },
      {
        id: 'exc-prj-002',
        applicationName: 'Planview Portfolios',
        issueType: 'Data Quality',
        description: 'Planview project cost data shows 12% variance against SAP actuals for Q1 2026. Root cause traced to currency conversion timing differences between systems. Finance team implementing synchronized FX rate feed.',
        severity: 'high',
        raisedDate: '2026-05-12',
        dueDate: '2026-05-30',
        status: 'in-progress'
      },
      {
        id: 'exc-prj-003',
        applicationName: 'Jira',
        issueType: 'Missing Linkage',
        description: 'Jira epic-to-capability mapping incomplete for Digital Commerce program (47 epics unlinked). Product owners need training on mandatory EA metadata fields in Jira workflow.',
        severity: 'medium',
        raisedDate: '2026-04-28',
        dueDate: '2026-06-05',
        status: 'open'
      },
      {
        id: 'exc-prj-004',
        applicationName: 'ServiceNow PPM',
        issueType: 'Duplicate Records',
        description: 'ServiceNow PPM module contains 23 duplicate project records created during CMDB merge. Deduplication script drafted but requires change approval board sign-off before execution in production.',
        severity: 'medium',
        raisedDate: '2026-05-08',
        dueDate: '2026-06-01',
        status: 'pending-approval'
      }
    ],
    history: [
      {
        month: '2025-12',
        slaCompliance: 72,
        reviewsCompleted: 18,
        reviewsRequired: 26,
        exceptionsRaised: 9,
        exceptionsClosed: 2,
        avgResolutionDays: 22
      },
      {
        month: '2026-01',
        slaCompliance: 76,
        reviewsCompleted: 20,
        reviewsRequired: 26,
        exceptionsRaised: 7,
        exceptionsClosed: 4,
        avgResolutionDays: 19
      },
      {
        month: '2026-02',
        slaCompliance: 80,
        reviewsCompleted: 22,
        reviewsRequired: 27,
        exceptionsRaised: 6,
        exceptionsClosed: 5,
        avgResolutionDays: 16
      },
      {
        month: '2026-03',
        slaCompliance: 83,
        reviewsCompleted: 23,
        reviewsRequired: 27,
        exceptionsRaised: 5,
        exceptionsClosed: 6,
        avgResolutionDays: 14
      },
      {
        month: '2026-04',
        slaCompliance: 85,
        reviewsCompleted: 24,
        reviewsRequired: 28,
        exceptionsRaised: 5,
        exceptionsClosed: 4,
        avgResolutionDays: 12
      },
      {
        month: '2026-05',
        slaCompliance: 87.5,
        reviewsCompleted: 25,
        reviewsRequired: 28,
        exceptionsRaised: 4,
        exceptionsClosed: 3,
        avgResolutionDays: 10
      }
    ]
  },
  {
    id: 'steward-003',
    name: 'Alice Brown',
    email: 'alice.brown@enterprise.com',
    role: 'Enterprise Architect - Business Processes',
    domain: 'Processes',
    domainDescription: 'End-to-end business process architecture including BPMN models, process mining outputs, and capability-to-process mappings across all operational domains',
    applicationCount: 18,
    slaCompliance: 92,
    slaTarget: 90,
    status: 'on-target',
    lastReviewDate: '2026-05-21',
    nextReviewDate: '2026-06-04',
    activeExceptions: [
      {
        id: 'exc-prc-001',
        applicationName: 'Celonis Process Mining',
        issueType: 'Data Lag',
        description: 'Celonis event log ingestion pipeline experiencing 18-hour delay due to SAP transaction log volume spike during month-end close. Temporary batch window extension requested from infrastructure team.',
        severity: 'medium',
        raisedDate: '2026-05-19',
        dueDate: '2026-06-02',
        status: 'in-progress'
      },
      {
        id: 'exc-prc-002',
        applicationName: 'Signavio Process Manager',
        issueType: 'Version Conflict',
        description: 'Signavio BPMN models for Order-to-Cash process diverge between v3.2 (production) and v4.0 (staging). Process owners submitted conflicting change requests. Requires process governance board arbitration.',
        severity: 'low',
        raisedDate: '2026-05-14',
        dueDate: '2026-06-12',
        status: 'open'
      }
    ],
    history: [
      {
        month: '2025-12',
        slaCompliance: 80,
        reviewsCompleted: 13,
        reviewsRequired: 16,
        exceptionsRaised: 5,
        exceptionsClosed: 2,
        avgResolutionDays: 16
      },
      {
        month: '2026-01',
        slaCompliance: 83,
        reviewsCompleted: 14,
        reviewsRequired: 17,
        exceptionsRaised: 4,
        exceptionsClosed: 3,
        avgResolutionDays: 14
      },
      {
        month: '2026-02',
        slaCompliance: 86,
        reviewsCompleted: 15,
        reviewsRequired: 17,
        exceptionsRaised: 3,
        exceptionsClosed: 4,
        avgResolutionDays: 12
      },
      {
        month: '2026-03',
        slaCompliance: 88,
        reviewsCompleted: 15,
        reviewsRequired: 17,
        exceptionsRaised: 3,
        exceptionsClosed: 3,
        avgResolutionDays: 10
      },
      {
        month: '2026-04',
        slaCompliance: 90,
        reviewsCompleted: 16,
        reviewsRequired: 18,
        exceptionsRaised: 2,
        exceptionsClosed: 3,
        avgResolutionDays: 8
      },
      {
        month: '2026-05',
        slaCompliance: 92,
        reviewsCompleted: 17,
        reviewsRequired: 18,
        exceptionsRaised: 2,
        exceptionsClosed: 2,
        avgResolutionDays: 7
      }
    ]
  },
  {
    id: 'steward-004',
    name: 'Mark Davis',
    email: 'mark.davis@enterprise.com',
    role: 'Enterprise Architect - Financial Systems',
    domain: 'Costs',
    domainDescription: 'IT financial management including application TCO, cloud spend allocation, license optimization, and chargeback models across all technology domains',
    applicationCount: 24,
    slaCompliance: 89,
    slaTarget: 90,
    status: 'watch',
    lastReviewDate: '2026-05-17',
    nextReviewDate: '2026-05-31',
    activeExceptions: [
      {
        id: 'exc-cst-001',
        applicationName: 'Apptio Cloudability',
        issueType: 'Missing Data',
        description: 'Apptio Cloudability cost allocation tags missing for 15% of AWS accounts following organizational restructuring. FinOps team re-tagging in progress but estimated 2-week completion timeline.',
        severity: 'high',
        raisedDate: '2026-05-06',
        dueDate: '2026-05-27',
        status: 'in-progress'
      },
      {
        id: 'exc-cst-002',
        applicationName: 'SAP FICO',
        issueType: 'Reconciliation Gap',
        description: 'SAP FICO cost center hierarchy does not align with updated IT organization chart effective April 2026. 8 cost centers orphaned, 3 new cost centers missing GL mapping. Joint remediation with Finance underway.',
        severity: 'high',
        raisedDate: '2026-05-01',
        dueDate: '2026-05-25',
        status: 'in-progress'
      },
      {
        id: 'exc-cst-003',
        applicationName: 'Flexera IT Asset Management',
        issueType: 'License Discrepancy',
        description: 'Flexera license entitlement data for Oracle Database licenses shows 340 deployed vs 280 purchased. Potential compliance risk flagged to vendor management. Audit remediation plan in draft.',
        severity: 'high',
        raisedDate: '2026-05-11',
        dueDate: '2026-06-01',
        status: 'open'
      },
      {
        id: 'exc-cst-004',
        applicationName: 'AWS Cost Explorer',
        issueType: 'Stale Cost Model',
        description: 'AWS reserved instance amortization model not updated for Q2 2026 RI purchases. Showing inflated on-demand costs for 12 production workloads. Cost model refresh scheduled for next billing cycle.',
        severity: 'medium',
        raisedDate: '2026-05-16',
        dueDate: '2026-06-08',
        status: 'pending-approval'
      }
    ],
    history: [
      {
        month: '2025-12',
        slaCompliance: 70,
        reviewsCompleted: 14,
        reviewsRequired: 22,
        exceptionsRaised: 10,
        exceptionsClosed: 3,
        avgResolutionDays: 24
      },
      {
        month: '2026-01',
        slaCompliance: 75,
        reviewsCompleted: 17,
        reviewsRequired: 22,
        exceptionsRaised: 8,
        exceptionsClosed: 5,
        avgResolutionDays: 20
      },
      {
        month: '2026-02',
        slaCompliance: 79,
        reviewsCompleted: 18,
        reviewsRequired: 23,
        exceptionsRaised: 7,
        exceptionsClosed: 6,
        avgResolutionDays: 17
      },
      {
        month: '2026-03',
        slaCompliance: 83,
        reviewsCompleted: 19,
        reviewsRequired: 23,
        exceptionsRaised: 6,
        exceptionsClosed: 6,
        avgResolutionDays: 14
      },
      {
        month: '2026-04',
        slaCompliance: 86,
        reviewsCompleted: 21,
        reviewsRequired: 24,
        exceptionsRaised: 5,
        exceptionsClosed: 5,
        avgResolutionDays: 11
      },
      {
        month: '2026-05',
        slaCompliance: 89,
        reviewsCompleted: 22,
        reviewsRequired: 24,
        exceptionsRaised: 4,
        exceptionsClosed: 3,
        avgResolutionDays: 9
      }
    ]
  }
];
