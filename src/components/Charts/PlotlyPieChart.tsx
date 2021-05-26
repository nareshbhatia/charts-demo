import React from 'react';
import Plot from 'react-plotly.js';
import { DataPoint } from '../../models';
import { ChartColors } from '../../utils';

export interface PlotlyPieChartProps {
  title: string;
  totalLabel: string;
  pieSize: number;
  pieInnerSize: number;
  data: Array<DataPoint>;
}

export const PlotlyPieChart = ({
  title,
  totalLabel,
  pieSize,
  pieInnerSize,
  data,
}: PlotlyPieChartProps) => {
  return (
    <Plot
      data={[
        {
          type: 'pie',
          hole: 0.78,
          values: data.map((point) => point.value),
          labels: data.map((point) => point.name),
          textinfo: 'label+value',
          textposition: 'outside',
          automargin: true,
          marker: {
            colors: ChartColors,
          },
          sort: false,
          direction: 'clockwise',
        },
      ]}
      layout={{
        font: {
          family: 'Overpass',
        },
        title: {
          text: title,
          font: {
            size: 16,
          },
          x: 0.025,
          y: 0.97,
        },
        showlegend: false,
        annotations: [
          {
            font: {
              size: 12,
            },
            showarrow: false,
            text: totalLabel,
            x: 0.5,
            y: 0.5,
          },
        ],
      }}
      style={{ width: '100%', height: '100%' }}
      useResizeHandler
    />
  );
};
