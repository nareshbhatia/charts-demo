import React from 'react';
import { Cell, Pie, PieChart, PieLabel, ResponsiveContainer } from 'recharts';
import { DataPoint } from '../../models';
import { ChartColors } from '../../utils';

export interface RechartsPieChartProps {
  title: string;
  totalLabel: string;
  pieSize: number;
  pieInnerSize: number;
  data: Array<DataPoint>;
}

export const RechartsPieChart = ({
  title,
  totalLabel,
  pieSize,
  pieInnerSize,
  data,
}: RechartsPieChartProps) => {
  const renderCustomLabel: PieLabel = (entry) => {
    return `${entry.name} ${entry.value}` ;
  };

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={pieSize / 2}
          innerRadius={pieInnerSize / 2}
          startAngle={90}
          endAngle={-270}
          label={renderCustomLabel}
        >
          {data.map((point, index) => (
            <Cell
              key={`cell-${index}`}
              fill={ChartColors[index % ChartColors.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
