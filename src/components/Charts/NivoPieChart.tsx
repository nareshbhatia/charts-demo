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

// This is a function that returns a layer component
const Title = (title: string) => () => {
  return (
    <text
      x={9}
      y={-60}
      style={{
        fontSize: '16px',
      }}
    >
      {title}
    </text>
  );
};

// This is a function that returns a layer component
const CenteredMetric =
  (total: number, totalLabel: string) =>
  ({ centerX, centerY }: any) => {
    return (
      <>
        <text
          x={centerX}
          y={centerY - 12}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '32px',
          }}
        >
          {total}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: '12px',
          }}
        >
          {totalLabel}
        </text>
      </>
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
      layers={[
        'arcs',
        'arcLinkLabels',
        Title(title),
        CenteredMetric(total, totalLabel),
      ]}
    />
  );
};
