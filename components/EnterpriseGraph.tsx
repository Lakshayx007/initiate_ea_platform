'use client';

import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

export default function EnterpriseGraph() {
  const option = useMemo(() => {
    const nodes = [
      { id: '0', name: 'ServiceNow\nCMDB', category: 0, symbolSize: 60, itemStyle: { color: '#3b82f6' } },
      { id: '1', name: 'SAP PPM\n(Budgets)', category: 0, symbolSize: 60, itemStyle: { color: '#10b981' } },
      { id: '2', name: 'Apptio\nITFM', category: 0, symbolSize: 60, itemStyle: { color: '#8b5cf6' } },
      { id: '3', name: 'Signavio\n(Process)', category: 0, symbolSize: 60, itemStyle: { color: '#f59e0b' } },
      
      { id: '4', name: 'EA Hub', category: 1, symbolSize: 90, itemStyle: { color: '#0A0A0A', borderColor: '#7928CA', borderWidth: 2 } },
      
      { id: '5', name: 'CIO View', category: 2, symbolSize: 50, itemStyle: { color: '#27272A', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 } },
      { id: '6', name: 'CFO View', category: 2, symbolSize: 50, itemStyle: { color: '#27272A', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 } },
      { id: '7', name: 'CTO View', category: 2, symbolSize: 50, itemStyle: { color: '#27272A', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 } },
      { id: '8', name: 'PM View', category: 2, symbolSize: 50, itemStyle: { color: '#27272A', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 } },
    ];

    const links = [
      { source: '0', target: '4', label: { show: true, formatter: '1-way sync' } },
      { source: '1', target: '4', label: { show: true, formatter: 'Nightly batch' } },
      { source: '2', target: '4', label: { show: true, formatter: 'API Export' } },
      { source: '3', target: '4', label: { show: true, formatter: 'Webhooks' } },
      
      { source: '4', target: '5' },
      { source: '4', target: '6' },
      { source: '4', target: '7' },
      { source: '4', target: '8' },
    ];

    return {
      tooltip: {
        formatter: '{b}',
        backgroundColor: '#0A0A0A',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#EDEDED' }
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 800,
            edgeLength: [100, 200]
          },
          data: nodes,
          links: links,
          roam: true,
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}',
            fontSize: 11,
            color: '#FFFFFF',
            fontWeight: 'bold'
          },
          lineStyle: {
            color: '#27272A',
            curveness: 0.3,
            width: 2
          },
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 10,
            color: '#9CA3AF'
          },
          itemStyle: {
            borderColor: '#16181D',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
          }
        }
      ]
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px]">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
