import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { DataPoint } from '../../models';
import { ChartColors } from '../../utils';

export interface NivoPieChartProps {
  title: string;
  total: number;
  totalLabel: string;
  pieSize: number;
  pieInnerSize: number;
  data: Array<DataPoint>;
}

const theme = {
  fontFamily: 'Overpass',
  fontSize: 12,
};

const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
  let total = 0;
  dataWithArc.forEach((datum: any) => {
    total += datum.value;
  });

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '32px',
      }}
    >
      {total}
    </text>
  );
};

export const NivoPieChart = ({
  title,
  total,
  totalLabel,
  pieSize,
  pieInnerSize,
  data,
}: NivoPieChartProps) => {
  const nivoData = data.map((point) => ({
    id: point.name,
    value: point.value,
  }));

  // @ts-ignore
  return (
    <ResponsivePie
      data={nivoData}
      theme={theme}
      colors={ChartColors}
      margin={{ top: 82, bottom: 82 }}
      innerRadius={pieInnerSize / pieSize}
      padAngle={1}
      activeOuterRadiusOffset={8}
      arcLinkLabel={(d) => `${d.id}: ${d.value}`}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      layers={['arcs', 'arcLinkLabels', CenteredMetric]}
    />
  );
};
