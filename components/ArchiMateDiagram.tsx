'use client';

import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

export default function ArchiMateDiagram() {
  const option = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      title: {
        text: 'Enterprise Data Flow Architecture',
        subtext: 'Showing 1-Way Data Sync into EA Intelligence Hub',
        left: 'center',
        textStyle: { color: '#1E293B', fontSize: 18, fontFamily: 'sans-serif' },
        subtextStyle: { color: '#64748B', fontSize: 13 }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          if (params.dataType === 'edge') {
            return `<b>Flow:</b> ${params.data.value}<br/><b>Type:</b> 1-Way Sync`;
          }
          return `<b>${params.name}</b><br/>${params.data.desc || ''}`;
        }
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: [140, 60],
          symbol: 'roundRect',
          roam: true,
          label: {
            show: true,
            position: 'inside',
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
            formatter: '{b}'
          },
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            show: true,
            fontSize: 11,
            formatter: '{c}',
            color: '#475569',
            backgroundColor: '#fff',
            padding: [2, 4],
            borderRadius: 4,
          },
          data: [
            // Layer: Consumers (Top)
            { name: 'CIO Dashboard', x: 200, y: 100, itemStyle: { color: '#0F172A' }, desc: 'Consumes real-time application portfolio risk and health.' },
            { name: 'CFO Cost Tool', x: 500, y: 100, itemStyle: { color: '#0F172A' }, desc: 'Consumes overlapping capabilities and cost insights.' },
            { name: 'EA Planners', x: 800, y: 100, itemStyle: { color: '#0F172A' }, desc: 'Consumes integration dependencies and data flows.' },

            // Layer: EA Hub (Middle)
            { name: 'EA Intelligence Hub\n(Canonical Model)', x: 500, y: 250, symbolSize: [300, 80], itemStyle: { color: '#2563EB' }, desc: 'Single source of truth. Aggregates data from all silos.' },

            // Layer: Source Systems (Bottom)
            { name: 'ServiceNow CMDB', x: 100, y: 450, itemStyle: { color: '#059669' }, desc: 'System of Record: IT Assets & Lifecycle' },
            { name: 'SAP PPM', x: 350, y: 450, itemStyle: { color: '#059669' }, desc: 'System of Record: Projects & Budgets' },
            { name: 'SAP Signavio', x: 650, y: 450, itemStyle: { color: '#059669' }, desc: 'System of Record: Business Processes' },
            { name: 'Apptio ITFM', x: 900, y: 450, itemStyle: { color: '#059669' }, desc: 'System of Record: Cost & TCO' },
          ],
          links: [
            // Source to Hub (1-way)
            { source: 'ServiceNow CMDB', target: 'EA Intelligence Hub\n(Canonical Model)', value: '1-Way Webhook', lineStyle: { color: '#94A3B8', curveness: 0.1 } },
            { source: 'SAP PPM', target: 'EA Intelligence Hub\n(Canonical Model)', value: '1-Way Batch', lineStyle: { color: '#94A3B8', curveness: 0.1 } },
            { source: 'SAP Signavio', target: 'EA Intelligence Hub\n(Canonical Model)', value: '1-Way Polling', lineStyle: { color: '#94A3B8', curveness: 0.1 } },
            { source: 'Apptio ITFM', target: 'EA Intelligence Hub\n(Canonical Model)', value: '1-Way Export', lineStyle: { color: '#94A3B8', curveness: 0.1 } },

            // Hub to Consumers (1-way)
            { source: 'EA Intelligence Hub\n(Canonical Model)', target: 'CIO Dashboard', value: '1-Way Read', lineStyle: { color: '#3B82F6', curveness: 0.1 } },
            { source: 'EA Intelligence Hub\n(Canonical Model)', target: 'CFO Cost Tool', value: '1-Way Read', lineStyle: { color: '#3B82F6', curveness: 0.1 } },
            { source: 'EA Intelligence Hub\n(Canonical Model)', target: 'EA Planners', value: '1-Way Read', lineStyle: { color: '#3B82F6', curveness: 0.1 } },
          ],
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      ]
    };
  }, []);

  return (
    <div className="w-full h-[600px] bg-white rounded-xl border border-surface-200 shadow-sm p-4">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
