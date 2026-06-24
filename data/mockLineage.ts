export interface LineageTimelineEvent {
  step: number;
  timestamp: string;
  event: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  details: string;
  duration?: string;
}

export interface DataQualityReport {
  completeness: number;
  accuracy: number;
  consistency: number;
  timeliness: number;
  overallScore: number;
  lastValidated: string;
  validationRules: number;
  rulesPassed: number;
  rulesFailed: number;
  failedRuleDetails?: string[];
}

export interface LineageEntry {
  id: string;
  applicationId: string;
  applicationName: string;
  sourceSystem: string;
  sourceEndpoint: string;
  integrationPattern: string;
  gatewayName: string;
  gatewayVersion: string;
  protocol: string;
  dataFormat: string;
  frequency: string;
  lastSyncTimestamp: string;
  recordsProcessed: number;
  recordsFailed: number;
  stewardAssigned: string;
  stewardDomain: string;
  dataQuality: DataQualityReport;
  timeline: LineageTimelineEvent[];
}

export const lineageData: LineageEntry[] = [
  {
    id: 'lineage-001',
    applicationId: 'app-001',
    applicationName: 'Workday HCM',
    sourceSystem: 'Workday Cloud (US-West-2)',
    sourceEndpoint: 'https://wd5-impl.workday.com/ccx/service/enterprise/Human_Resources/v42.0',
    integrationPattern: 'Event-Driven Webhook',
    gatewayName: 'MuleSoft Anypoint',
    gatewayVersion: '4.6.2',
    protocol: 'HTTPS / REST',
    dataFormat: 'JSON',
    frequency: 'Real-time (event-triggered)',
    lastSyncTimestamp: '2026-05-23T22:45:12Z',
    recordsProcessed: 14832,
    recordsFailed: 3,
    stewardAssigned: 'Jane Smith',
    stewardDomain: 'Applications',
    dataQuality: {
      completeness: 99.2,
      accuracy: 98.8,
      consistency: 99.5,
      timeliness: 99.9,
      overallScore: 99.4,
      lastValidated: '2026-05-23T22:45:12Z',
      validationRules: 42,
      rulesPassed: 41,
      rulesFailed: 1,
      failedRuleDetails: ['RULE-HR-017: Cost center hierarchy depth exceeds 7 levels for 3 records in APAC region']
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T22:44:01Z',
        event: 'Workday Business Process Event Fired',
        status: 'completed',
        details: 'Worker profile change event detected (Job Change, Compensation Change, Org Transfer)',
        duration: '0.2s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T22:44:02Z',
        event: 'Webhook Payload Received at MuleSoft',
        status: 'completed',
        details: 'Anypoint gateway received JSON payload (4.2 KB), authenticated via OAuth 2.0 client credentials',
        duration: '0.8s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T22:44:03Z',
        event: 'Schema Validation & Transformation',
        status: 'completed',
        details: 'DataWeave transformation applied: Workday RAAS → EA canonical model v3.1. 48 fields mapped.',
        duration: '1.2s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T22:44:05Z',
        event: 'Data Quality Gate — Validation Engine',
        status: 'completed',
        details: '42 validation rules executed. 41 passed, 1 warning (cost center depth). No blocking failures.',
        duration: '2.1s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T22:44:08Z',
        event: 'EA Repository Upsert',
        status: 'completed',
        details: 'Record upserted to EA repository (PostgreSQL). Lineage metadata and version history recorded.',
        duration: '0.9s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T22:44:09Z',
        event: 'Audit Log & Notification',
        status: 'completed',
        details: 'Audit trail committed. Steward notification suppressed (no SLA breach). Dashboard cache invalidated.',
        duration: '0.3s'
      }
    ]
  },
  {
    id: 'lineage-002',
    applicationId: 'app-002',
    applicationName: 'SAP ECC',
    sourceSystem: 'SAP ECC 6.0 EHP8 (On-Prem DC-East)',
    sourceEndpoint: 'sap://ecc-prod.internal:3300/sap/bc/srt/rfc/sap/ZARCH_META_EXTRACT',
    integrationPattern: 'Batch ETL',
    gatewayName: 'Informatica PowerCenter',
    gatewayVersion: '10.5.6',
    protocol: 'RFC / BAPI',
    dataFormat: 'IDoc → CSV → Parquet',
    frequency: 'Every 4 hours',
    lastSyncTimestamp: '2026-05-23T20:00:47Z',
    recordsProcessed: 8456,
    recordsFailed: 12,
    stewardAssigned: 'Jane Smith',
    stewardDomain: 'Applications',
    dataQuality: {
      completeness: 97.8,
      accuracy: 96.5,
      consistency: 95.2,
      timeliness: 98.0,
      overallScore: 96.9,
      lastValidated: '2026-05-23T20:00:47Z',
      validationRules: 56,
      rulesPassed: 53,
      rulesFailed: 3,
      failedRuleDetails: [
        'RULE-SAP-008: 4 cost centers have no owning business unit assignment',
        'RULE-SAP-022: Technical owner field blank for 5 custom Z-transactions',
        'RULE-SAP-041: Module PP workforce planning data 3 records reference decommissioned plant code 4200'
      ]
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T19:55:00Z',
        event: 'Scheduled ETL Job Triggered',
        status: 'completed',
        details: 'Informatica workflow WF_SAP_META_EXTRACT initiated by scheduler (cron: 0 */4 * * *)',
        duration: '0.5s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T19:55:01Z',
        event: 'SAP RFC Connection Established',
        status: 'completed',
        details: 'Connected to SAP ECC via RFC using service account ARCH_SVC. Connection pool: 3/10 active.',
        duration: '2.8s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T19:55:04Z',
        event: 'Data Extraction via BAPI',
        status: 'completed',
        details: 'Extracted metadata from 14 SAP modules (FI, CO, MM, SD, PP, PM, QM, HR, PS, WM, LE, CS, RE, IM). 8,456 records.',
        duration: '128.4s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T19:57:13Z',
        event: 'CSV Staging & Parquet Conversion',
        status: 'completed',
        details: 'Raw CSV staged to /data/staging/sap/. Converted to Parquet with snappy compression. File size: 2.1 MB.',
        duration: '14.2s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T19:57:28Z',
        event: 'Data Quality Gate — Validation Engine',
        status: 'completed',
        details: '56 validation rules executed. 53 passed, 3 failed (non-blocking). Quality score: 96.9%.',
        duration: '8.7s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T19:57:37Z',
        event: 'EA Repository Bulk Upsert',
        status: 'completed',
        details: 'Bulk upsert of 8,444 records (12 rejected). Lineage DAG updated. Version incremented to v147.',
        duration: '22.3s'
      },
      {
        step: 7,
        timestamp: '2026-05-23T20:00:47Z',
        event: 'Post-Load Reconciliation & Notification',
        status: 'completed',
        details: 'Reconciliation check passed (delta: 0.14%). Steward alert sent for 3 failed rules. Jira ticket EAOPS-2847 auto-created.',
        duration: '3.1s'
      }
    ]
  },
  {
    id: 'lineage-003',
    applicationId: 'app-003',
    applicationName: 'ServiceNow CMDB',
    sourceSystem: 'ServiceNow (Tokyo Release) — Instance: enterprise-prod',
    sourceEndpoint: 'https://enterprise-prod.service-now.com/api/now/table/cmdb_ci',
    integrationPattern: 'REST API Poll',
    gatewayName: 'MuleSoft Anypoint',
    gatewayVersion: '4.6.2',
    protocol: 'HTTPS / REST',
    dataFormat: 'JSON',
    frequency: 'Every 30 minutes',
    lastSyncTimestamp: '2026-05-23T22:30:18Z',
    recordsProcessed: 23410,
    recordsFailed: 7,
    stewardAssigned: 'Jane Smith',
    stewardDomain: 'Applications',
    dataQuality: {
      completeness: 98.5,
      accuracy: 97.9,
      consistency: 98.1,
      timeliness: 99.7,
      overallScore: 98.6,
      lastValidated: '2026-05-23T22:30:18Z',
      validationRules: 38,
      rulesPassed: 37,
      rulesFailed: 1,
      failedRuleDetails: ['RULE-SNOW-012: 7 CI records have discovery source = Manual with last_discovered > 90 days ago']
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T22:28:00Z',
        event: 'Polling Scheduler Triggered',
        status: 'completed',
        details: 'MuleSoft polling consumer initiated ServiceNow CMDB delta sync (sys_updated_on > last_sync)',
        duration: '0.3s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T22:28:01Z',
        event: 'ServiceNow REST API Call',
        status: 'completed',
        details: 'GET /api/now/table/cmdb_ci with sysparm_query for delta records. OAuth 2.0 authenticated. 847 delta records returned.',
        duration: '4.8s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T22:28:06Z',
        event: 'Canonical Model Transformation',
        status: 'completed',
        details: 'DataWeave: ServiceNow CI → EA Application model. Relationship graph enrichment (depends_on, hosted_on). 62 fields mapped.',
        duration: '3.2s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T22:28:10Z',
        event: 'Cross-Reference Enrichment',
        status: 'completed',
        details: 'Enriched 847 records with Workday owner data and SAP cost center mapping. 12 unmatched CIs flagged.',
        duration: '5.6s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T22:28:16Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '38 rules executed. 37 passed. 1 warning for stale manual discovery CIs. Quality score: 98.6%.',
        duration: '2.4s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T22:28:19Z',
        event: 'EA Repository Delta Upsert',
        status: 'completed',
        details: '840 records upserted, 7 rejected (orphaned relationships). Version: v892.',
        duration: '6.1s'
      },
      {
        step: 7,
        timestamp: '2026-05-23T22:30:18Z',
        event: 'Cache Refresh & Dashboard Update',
        status: 'completed',
        details: 'Redis cache invalidated for affected application tiles. Dashboard materialized views refreshed.',
        duration: '1.8s'
      }
    ]
  },
  {
    id: 'lineage-004',
    applicationId: 'app-004',
    applicationName: 'Salesforce CRM',
    sourceSystem: 'Salesforce (Enterprise Edition) — Org: 00D5g00000ABC',
    sourceEndpoint: 'https://enterprise.my.salesforce.com/services/data/v59.0/sobjects/',
    integrationPattern: 'Event-Driven Webhook',
    gatewayName: 'MuleSoft Anypoint',
    gatewayVersion: '4.6.2',
    protocol: 'HTTPS / REST (Platform Events)',
    dataFormat: 'JSON',
    frequency: 'Real-time (CDC Platform Events)',
    lastSyncTimestamp: '2026-05-23T22:52:34Z',
    recordsProcessed: 6218,
    recordsFailed: 0,
    stewardAssigned: 'Jane Smith',
    stewardDomain: 'Applications',
    dataQuality: {
      completeness: 99.8,
      accuracy: 99.5,
      consistency: 99.6,
      timeliness: 100,
      overallScore: 99.7,
      lastValidated: '2026-05-23T22:52:34Z',
      validationRules: 28,
      rulesPassed: 28,
      rulesFailed: 0
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T22:52:28Z',
        event: 'Salesforce CDC Platform Event Published',
        status: 'completed',
        details: 'Change Data Capture event on Account, Opportunity, Contact objects. Replay ID: 4,218,903.',
        duration: '0.1s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T22:52:29Z',
        event: 'MuleSoft CometD Subscriber Received Event',
        status: 'completed',
        details: 'CometD long-polling subscriber captured 3 CDC events. Payload validated against Salesforce entity schema.',
        duration: '0.6s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T22:52:30Z',
        event: 'Schema Mapping & Enrichment',
        status: 'completed',
        details: 'Salesforce SObject → EA canonical model. Account owner resolved to EA business owner via Workday cross-ref.',
        duration: '1.1s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T22:52:32Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '28 validation rules executed. All passed. Quality score: 99.7%. Zero anomalies detected.',
        duration: '1.4s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T22:52:34Z',
        event: 'EA Repository Upsert & Event Broadcast',
        status: 'completed',
        details: 'Records upserted. Kafka topic ea.applications.changes published for downstream consumers.',
        duration: '0.8s'
      }
    ]
  },
  {
    id: 'lineage-005',
    applicationId: 'app-005',
    applicationName: 'Snowflake Data Cloud',
    sourceSystem: 'Snowflake (Enterprise Account: xy12345.us-east-1)',
    sourceEndpoint: 'https://xy12345.us-east-1.snowflakecomputing.com/api/v2/statements',
    integrationPattern: 'REST API Poll',
    gatewayName: 'Custom Python Connector',
    gatewayVersion: '2.3.1',
    protocol: 'HTTPS / Snowflake SQL API',
    dataFormat: 'JSON (via SQL API)',
    frequency: 'Every 2 hours',
    lastSyncTimestamp: '2026-05-23T22:00:33Z',
    recordsProcessed: 3842,
    recordsFailed: 2,
    stewardAssigned: 'Bob Wilson',
    stewardDomain: 'Projects',
    dataQuality: {
      completeness: 98.9,
      accuracy: 99.1,
      consistency: 97.8,
      timeliness: 98.5,
      overallScore: 98.6,
      lastValidated: '2026-05-23T22:00:33Z',
      validationRules: 32,
      rulesPassed: 31,
      rulesFailed: 1,
      failedRuleDetails: ['RULE-SNOW-005: 2 database schemas have no assigned data steward in INFORMATION_SCHEMA metadata']
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T21:58:00Z',
        event: 'Scheduled Python Job Triggered',
        status: 'completed',
        details: 'Airflow DAG dag_snowflake_meta_sync triggered. Python connector initialized with key-pair auth.',
        duration: '1.2s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T21:58:02Z',
        event: 'Snowflake Metadata Query Execution',
        status: 'completed',
        details: 'Executed INFORMATION_SCHEMA queries across 8 databases, 42 schemas. ACCOUNT_USAGE views for warehouse metrics.',
        duration: '18.4s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T21:58:21Z',
        event: 'Schema & Warehouse Metrics Aggregation',
        status: 'completed',
        details: 'Aggregated: 3,842 objects (tables, views, stages, pipes). Warehouse credit consumption mapped to cost centers.',
        duration: '8.6s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T21:58:30Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '32 validation rules. 31 passed. 1 failed (missing steward for 2 schemas). Quality score: 98.6%.',
        duration: '4.2s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T21:58:35Z',
        event: 'EA Repository Upsert',
        status: 'completed',
        details: 'Bulk upsert of 3,840 records. 2 rejected (no steward). Lineage graph updated with cross-database dependencies.',
        duration: '12.8s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T22:00:33Z',
        event: 'Cost Attribution & Notification',
        status: 'completed',
        details: 'Snowflake credit costs attributed to 6 business units. Monthly trend report generated. No SLA breach.',
        duration: '5.4s'
      }
    ]
  },
  {
    id: 'lineage-006',
    applicationId: 'app-006',
    applicationName: 'Azure DevOps',
    sourceSystem: 'Azure DevOps Services (Organization: enterprise-global)',
    sourceEndpoint: 'https://dev.azure.com/enterprise-global/_apis/wit/wiql?api-version=7.1',
    integrationPattern: 'Event-Driven Webhook',
    gatewayName: 'Azure Functions',
    gatewayVersion: '4.0 (.NET 8)',
    protocol: 'HTTPS / REST (Service Hooks)',
    dataFormat: 'JSON',
    frequency: 'Real-time (Service Hook events)',
    lastSyncTimestamp: '2026-05-23T22:38:55Z',
    recordsProcessed: 4127,
    recordsFailed: 14,
    stewardAssigned: 'Bob Wilson',
    stewardDomain: 'Projects',
    dataQuality: {
      completeness: 96.2,
      accuracy: 97.1,
      consistency: 94.8,
      timeliness: 99.6,
      overallScore: 96.9,
      lastValidated: '2026-05-23T22:38:55Z',
      validationRules: 34,
      rulesPassed: 31,
      rulesFailed: 3,
      failedRuleDetails: [
        'RULE-ADO-003: 8 work items missing Capability Link custom field (post-upgrade schema gap)',
        'RULE-ADO-011: 4 project areas have no EA mapping to business capability tree',
        'RULE-ADO-019: 2 pipelines reference deprecated service connections'
      ]
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T22:38:40Z',
        event: 'Azure DevOps Service Hook Fired',
        status: 'completed',
        details: 'Work item updated event (type: Feature). Service hook URL: https://ea-func.azurewebsites.net/api/ado-webhook',
        duration: '0.3s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T22:38:41Z',
        event: 'Azure Function Triggered',
        status: 'completed',
        details: 'HTTP trigger function processed webhook. HMAC signature validated. Payload: work item change with 6 field updates.',
        duration: '0.8s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T22:38:42Z',
        event: 'Work Item Enrichment via REST API',
        status: 'completed',
        details: 'Fetched full work item details, parent/child links, and iteration path. Resolved assigned-to against Workday.',
        duration: '2.4s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T22:38:45Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '34 rules executed. 31 passed, 3 failed. Schema gap from v19.2 upgrade causing field mapping issues.',
        duration: '1.8s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T22:38:47Z',
        event: 'EA Repository Upsert',
        status: 'completed',
        details: 'Record upserted with quality warnings attached. Steward exception auto-created for schema mismatch.',
        duration: '1.2s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T22:38:55Z',
        event: 'Steward Alert & Jira Ticket',
        status: 'completed',
        details: 'Bob Wilson notified via Teams. Jira EAOPS-2851 created for schema remediation. SLA timer started (72h).',
        duration: '2.1s'
      }
    ]
  },
  {
    id: 'lineage-007',
    applicationId: 'app-010',
    applicationName: 'Okta SSO',
    sourceSystem: 'Okta (Enterprise Org: enterprise.okta.com)',
    sourceEndpoint: 'https://enterprise.okta.com/api/v1/apps',
    integrationPattern: 'REST API Poll',
    gatewayName: 'MuleSoft Anypoint',
    gatewayVersion: '4.6.2',
    protocol: 'HTTPS / REST',
    dataFormat: 'JSON',
    frequency: 'Every 1 hour',
    lastSyncTimestamp: '2026-05-23T22:00:12Z',
    recordsProcessed: 892,
    recordsFailed: 0,
    stewardAssigned: 'Jane Smith',
    stewardDomain: 'Applications',
    dataQuality: {
      completeness: 100,
      accuracy: 99.8,
      consistency: 99.9,
      timeliness: 99.5,
      overallScore: 99.8,
      lastValidated: '2026-05-23T22:00:12Z',
      validationRules: 22,
      rulesPassed: 22,
      rulesFailed: 0
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T21:58:00Z',
        event: 'Scheduled Poll Initiated',
        status: 'completed',
        details: 'MuleSoft scheduler triggered Okta application inventory sync. API rate limit: 600 req/min.',
        duration: '0.2s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T21:58:01Z',
        event: 'Okta API Paginated Fetch',
        status: 'completed',
        details: 'Fetched all 892 registered applications via /api/v1/apps with pagination (200/page). 5 pages.',
        duration: '6.8s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T21:58:08Z',
        event: 'Application-to-EA Mapping',
        status: 'completed',
        details: 'Mapped Okta app labels to EA application registry using fuzzy matching (threshold: 85%). 878 matched, 14 new.',
        duration: '3.4s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T21:58:12Z',
        event: 'SSO Coverage Analysis',
        status: 'completed',
        details: 'Computed SSO coverage: 89.2% of EA portfolio apps have Okta SSO integration. 11 apps flagged as SSO-exempt.',
        duration: '2.1s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T21:58:15Z',
        event: 'Data Quality Gate & Upsert',
        status: 'completed',
        details: '22 rules passed. All records upserted. SSO coverage metric published to KPI dashboard.',
        duration: '4.6s'
      }
    ]
  },
  {
    id: 'lineage-008',
    applicationId: 'app-015',
    applicationName: 'Concur Expense',
    sourceSystem: 'SAP Concur (US2 Datacenter)',
    sourceEndpoint: 'https://us2.api.concursolutions.com/api/v3.0/expense/reports',
    integrationPattern: 'Batch ETL',
    gatewayName: 'Informatica PowerCenter',
    gatewayVersion: '10.5.6',
    protocol: 'HTTPS / REST',
    dataFormat: 'JSON → CSV',
    frequency: 'Daily (02:00 UTC)',
    lastSyncTimestamp: '2026-05-23T02:14:28Z',
    recordsProcessed: 2156,
    recordsFailed: 5,
    stewardAssigned: 'Mark Davis',
    stewardDomain: 'Costs',
    dataQuality: {
      completeness: 97.4,
      accuracy: 96.8,
      consistency: 97.1,
      timeliness: 95.0,
      overallScore: 96.6,
      lastValidated: '2026-05-23T02:14:28Z',
      validationRules: 26,
      rulesPassed: 24,
      rulesFailed: 2,
      failedRuleDetails: [
        'RULE-EXP-009: 3 expense reports have cost center codes not in SAP FICO master data',
        'RULE-EXP-018: 2 reports have approval chain that references inactive manager accounts'
      ]
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T02:00:00Z',
        event: 'Nightly Batch Job Triggered',
        status: 'completed',
        details: 'Informatica workflow WF_CONCUR_DAILY triggered by Control-M scheduler.',
        duration: '0.8s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T02:00:01Z',
        event: 'Concur API Extraction',
        status: 'completed',
        details: 'Extracted expense reports submitted/approved in last 24h. OAuth 2.0 Company-level token. 2,156 reports.',
        duration: '45.2s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T02:00:47Z',
        event: 'Cost Center Cross-Reference',
        status: 'completed',
        details: 'Concur cost center codes cross-referenced against SAP FICO cost center master. 3 unmatched codes.',
        duration: '12.4s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T02:01:00Z',
        event: 'Currency Normalization',
        status: 'completed',
        details: 'Multi-currency reports normalized to USD using ECB daily FX rates. 14 currencies processed.',
        duration: '4.8s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T02:01:05Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '26 rules executed. 24 passed, 2 failed (non-blocking). Quality score: 96.6%.',
        duration: '3.6s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T02:01:09Z',
        event: 'EA Repository Load & Cost Attribution',
        status: 'completed',
        details: '2,151 records loaded. Expense data attributed to 8 business units for TCO calculation.',
        duration: '18.2s'
      },
      {
        step: 7,
        timestamp: '2026-05-23T02:14:28Z',
        event: 'Reconciliation Report Generation',
        status: 'completed',
        details: 'Daily reconciliation report generated. Variance: 0.23% vs SAP. Report emailed to Mark Davis.',
        duration: '6.7s'
      }
    ]
  },
  {
    id: 'lineage-009',
    applicationId: 'app-020',
    applicationName: 'Celonis Process Mining',
    sourceSystem: 'Celonis EMS (Cloud — EU-West-1)',
    sourceEndpoint: 'https://enterprise.eu-1.celonis.cloud/integration/api/v1/data-push',
    integrationPattern: 'Batch ETL',
    gatewayName: 'Celonis Extractor',
    gatewayVersion: '4.7.0',
    protocol: 'HTTPS / REST (Data Push API)',
    dataFormat: 'Parquet',
    frequency: 'Every 6 hours',
    lastSyncTimestamp: '2026-05-23T18:22:41Z',
    recordsProcessed: 185420,
    recordsFailed: 28,
    stewardAssigned: 'Alice Brown',
    stewardDomain: 'Processes',
    dataQuality: {
      completeness: 98.1,
      accuracy: 97.6,
      consistency: 96.9,
      timeliness: 94.5,
      overallScore: 96.8,
      lastValidated: '2026-05-23T18:22:41Z',
      validationRules: 44,
      rulesPassed: 42,
      rulesFailed: 2,
      failedRuleDetails: [
        'RULE-CEL-007: 18 process variants have no mapped business capability in EA taxonomy',
        'RULE-CEL-031: Event log timestamp gaps > 4 hours detected in 10 Order-to-Cash cases (month-end batch lag)'
      ]
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T18:00:00Z',
        event: 'Celonis Extraction Scheduled',
        status: 'completed',
        details: 'Celonis Extractor triggered for SAP event log extraction. Scope: O2C, P2P, AP processes.',
        duration: '1.2s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T18:00:02Z',
        event: 'SAP Event Log Extraction',
        status: 'completed',
        details: 'Extracted CDHDR/CDPOS change documents and VBAK/VBAP/LIKP/BSEG tables. 185,420 event records.',
        duration: '312.6s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T18:05:15Z',
        event: 'Event Log Transformation',
        status: 'completed',
        details: 'Raw SAP tables transformed to Celonis event log format. Case ID: document number. Activity: transaction code.',
        duration: '88.4s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T18:06:44Z',
        event: 'Process Variant Analysis',
        status: 'completed',
        details: '342 unique process variants identified. Top 10 variants cover 78% of cases. 18 variants unmapped.',
        duration: '124.8s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T18:08:49Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '44 rules executed. 42 passed, 2 warnings. Timestamp gaps flagged for investigation.',
        duration: '18.6s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T18:09:08Z',
        event: 'EA Repository Process Metrics Update',
        status: 'completed',
        details: 'Process KPIs (cycle time, throughput, conformance) published to EA repository. 28 event records rejected.',
        duration: '42.3s'
      },
      {
        step: 7,
        timestamp: '2026-05-23T18:22:41Z',
        event: 'Process Conformance Report',
        status: 'completed',
        details: 'Conformance rate: 82.4% (target: 85%). Deviation report sent to Alice Brown. Dashboard updated.',
        duration: '14.2s'
      }
    ]
  },
  {
    id: 'lineage-010',
    applicationId: 'app-025',
    applicationName: 'AWS Cost Explorer',
    sourceSystem: 'AWS Organizations (Master Account: 123456789012)',
    sourceEndpoint: 'https://ce.us-east-1.amazonaws.com (Cost Explorer API)',
    integrationPattern: 'REST API Poll',
    gatewayName: 'Custom Python Connector',
    gatewayVersion: '2.3.1',
    protocol: 'HTTPS / AWS Signature V4',
    dataFormat: 'JSON',
    frequency: 'Daily (06:00 UTC)',
    lastSyncTimestamp: '2026-05-23T06:18:42Z',
    recordsProcessed: 12840,
    recordsFailed: 0,
    stewardAssigned: 'Mark Davis',
    stewardDomain: 'Costs',
    dataQuality: {
      completeness: 99.6,
      accuracy: 98.2,
      consistency: 97.5,
      timeliness: 96.0,
      overallScore: 97.8,
      lastValidated: '2026-05-23T06:18:42Z',
      validationRules: 30,
      rulesPassed: 29,
      rulesFailed: 1,
      failedRuleDetails: ['RULE-AWS-014: Reserved Instance amortization not updated for Q2 2026 purchases in 12 accounts']
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T06:00:00Z',
        event: 'Daily Cost Sync Triggered',
        status: 'completed',
        details: 'Airflow DAG dag_aws_cost_sync started. IAM role assumed via STS for cross-account access.',
        duration: '2.1s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T06:00:03Z',
        event: 'Cost Explorer API Extraction',
        status: 'completed',
        details: 'GetCostAndUsage API called for 48 AWS accounts. Granularity: DAILY. Group by: SERVICE, LINKED_ACCOUNT, TAG.',
        duration: '84.6s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T06:01:28Z',
        event: 'Tag-Based Cost Attribution',
        status: 'completed',
        details: 'Cost allocation tags mapped to EA applications and business units. 85% of spend tagged. 15% untagged → default pool.',
        duration: '22.4s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T06:01:51Z',
        event: 'RI/Savings Plan Amortization',
        status: 'completed',
        details: 'Reserved Instance and Savings Plans costs amortized across benefiting accounts. Note: Q2 RI data stale.',
        duration: '14.8s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T06:02:06Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '30 rules. 29 passed. 1 failed: RI amortization model outdated. Quality score: 97.8%.',
        duration: '6.2s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T06:02:13Z',
        event: 'EA Repository Cost Update',
        status: 'completed',
        details: '12,840 cost line items upserted. Application TCO dashboard refreshed. Month-to-date spend: $847,320.',
        duration: '28.4s'
      },
      {
        step: 7,
        timestamp: '2026-05-23T06:18:42Z',
        event: 'FinOps Report & Anomaly Detection',
        status: 'completed',
        details: 'Daily FinOps report generated. 2 cost anomalies detected (EC2 spike in dev account). Alert sent to Mark Davis.',
        duration: '12.6s'
      }
    ]
  },
  {
    id: 'lineage-011',
    applicationId: 'app-030',
    applicationName: 'Datadog',
    sourceSystem: 'Datadog (US1 Site: app.datadoghq.com)',
    sourceEndpoint: 'https://api.datadoghq.com/api/v2/hosts',
    integrationPattern: 'REST API Poll',
    gatewayName: 'MuleSoft Anypoint',
    gatewayVersion: '4.6.2',
    protocol: 'HTTPS / REST',
    dataFormat: 'JSON',
    frequency: 'Every 1 hour',
    lastSyncTimestamp: '2026-05-23T22:05:19Z',
    recordsProcessed: 1847,
    recordsFailed: 1,
    stewardAssigned: 'Jane Smith',
    stewardDomain: 'Applications',
    dataQuality: {
      completeness: 99.4,
      accuracy: 98.7,
      consistency: 99.1,
      timeliness: 99.8,
      overallScore: 99.3,
      lastValidated: '2026-05-23T22:05:19Z',
      validationRules: 18,
      rulesPassed: 18,
      rulesFailed: 0
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T22:00:00Z',
        event: 'Hourly Host Inventory Sync',
        status: 'completed',
        details: 'MuleSoft scheduler triggered Datadog infrastructure metadata collection.',
        duration: '0.3s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T22:00:01Z',
        event: 'Datadog API Extraction',
        status: 'completed',
        details: 'Fetched host list, tags, and infrastructure metrics via /api/v2/hosts. 1,847 hosts across 3 cloud providers.',
        duration: '12.4s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T22:00:14Z',
        event: 'Host-to-Application Mapping',
        status: 'completed',
        details: 'Datadog host tags (app:*, env:*, team:*) mapped to EA application registry. 98.2% auto-matched.',
        duration: '8.6s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T22:00:23Z',
        event: 'Infrastructure Topology Update',
        status: 'completed',
        details: 'Application infrastructure topology graph updated. 1,846 records upserted. 1 orphaned host flagged.',
        duration: '14.2s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T22:05:19Z',
        event: 'Dashboard Metrics Refresh',
        status: 'completed',
        details: 'Infrastructure KPIs published: host count by app, cloud distribution, agent coverage (99.1%).',
        duration: '4.8s'
      }
    ]
  },
  {
    id: 'lineage-012',
    applicationId: 'app-035',
    applicationName: 'Ariba Procurement',
    sourceSystem: 'SAP Ariba (Realm: enterprise-prod-s1)',
    sourceEndpoint: 'https://openapi.ariba.com/api/procurement-reporting/v2/prod',
    integrationPattern: 'Batch ETL',
    gatewayName: 'Informatica PowerCenter',
    gatewayVersion: '10.5.6',
    protocol: 'HTTPS / REST (Reporting API)',
    dataFormat: 'JSON → Parquet',
    frequency: 'Daily (04:00 UTC)',
    lastSyncTimestamp: '2026-05-23T04:32:17Z',
    recordsProcessed: 5623,
    recordsFailed: 8,
    stewardAssigned: 'Mark Davis',
    stewardDomain: 'Costs',
    dataQuality: {
      completeness: 97.6,
      accuracy: 97.2,
      consistency: 96.8,
      timeliness: 95.5,
      overallScore: 96.8,
      lastValidated: '2026-05-23T04:32:17Z',
      validationRules: 36,
      rulesPassed: 34,
      rulesFailed: 2,
      failedRuleDetails: [
        'RULE-ARB-006: 5 purchase requisitions reference cost centers not in current fiscal year hierarchy',
        'RULE-ARB-023: 3 supplier records have mismatched DUNS numbers between Ariba and SAP Vendor Master'
      ]
    },
    timeline: [
      {
        step: 1,
        timestamp: '2026-05-23T04:00:00Z',
        event: 'Nightly Procurement Sync Started',
        status: 'completed',
        details: 'Informatica workflow WF_ARIBA_PROCUREMENT triggered. OAuth token refreshed for Ariba API.',
        duration: '1.4s'
      },
      {
        step: 2,
        timestamp: '2026-05-23T04:00:02Z',
        event: 'Ariba Reporting API Extraction',
        status: 'completed',
        details: 'Extracted POs, requisitions, contracts, and invoices for last 24h. Pagination: 50 pages × 200 records.',
        duration: '68.4s'
      },
      {
        step: 3,
        timestamp: '2026-05-23T04:01:11Z',
        event: 'Supplier Master Cross-Reference',
        status: 'completed',
        details: 'Ariba supplier IDs cross-referenced with SAP Vendor Master (LFA1). 3 DUNS mismatches flagged.',
        duration: '18.6s'
      },
      {
        step: 4,
        timestamp: '2026-05-23T04:01:30Z',
        event: 'Spend Category Normalization',
        status: 'completed',
        details: 'Ariba UNSPSC codes mapped to enterprise spend taxonomy. IT-related spend isolated for TCO analysis.',
        duration: '12.2s'
      },
      {
        step: 5,
        timestamp: '2026-05-23T04:01:43Z',
        event: 'Data Quality Gate',
        status: 'completed',
        details: '36 rules. 34 passed, 2 failed. Quality score: 96.8%. Non-blocking failures logged.',
        duration: '6.8s'
      },
      {
        step: 6,
        timestamp: '2026-05-23T04:01:50Z',
        event: 'EA Repository Load',
        status: 'completed',
        details: '5,615 procurement records loaded. 8 rejected. Contract-to-application linkage updated for 142 IT contracts.',
        duration: '24.6s'
      },
      {
        step: 7,
        timestamp: '2026-05-23T04:32:17Z',
        event: 'Procurement Analytics Refresh',
        status: 'completed',
        details: 'Vendor concentration, maverick spend, and contract utilization dashboards updated. Report sent to Mark Davis.',
        duration: '8.4s'
      }
    ]
  }
];
