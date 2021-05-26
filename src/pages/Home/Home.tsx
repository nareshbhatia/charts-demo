import React from 'react';
import {
  HighchartsPieChart,
  PlotlyPieChart,
  RechartsPieChart,
} from '../../components';
import { DataPoint } from '../../models';
import './Home.css';

const pieSize = 152;
const pieInnerSize = pieSize - 32;

const monthlySpending: Array<DataPoint> = [
  { name: 'Food & Dining', value: 22 },
  { name: 'Health Insurance', value: 18 },
  { name: 'Miscellaneous', value: 32 },
  { name: 'Travel & Shopping', value: 16 },
];

export const Home = () => {
  return (
    <main>
      <h1>Highcharts</h1>
      <div className="chart">
        <HighchartsPieChart
          title="Top spending categories"
          totalLabel="$ per month"
          pieSize={pieSize}
          pieInnerSize={pieInnerSize}
          data={monthlySpending}
        />
      </div>

      <h1 className="mt-3">Plotly</h1>
      <div className="chart">
        <PlotlyPieChart
          title="Top spending categories"
          totalLabel="$ per month"
          pieSize={pieSize}
          pieInnerSize={pieInnerSize}
          data={monthlySpending}
        />
      </div>

      <h1 className="mt-3">Recharts</h1>
      <div className="chart">
        <RechartsPieChart
          title="Top spending categories"
          totalLabel="$ per month"
          pieSize={pieSize}
          pieInnerSize={pieInnerSize}
          data={monthlySpending}
        />
      </div>
    </main>
  );
};
