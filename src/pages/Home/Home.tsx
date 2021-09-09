import React from 'react';
import {
  HighchartsPieChart,
  NivoPieChart,
  PlotlyPieChart,
  RechartsPieChart,
} from '../../components';
import { DataPoint, DataPointHelpers } from '../../models';
import './Home.css';

const pieSize = 152;
const pieInnerSize = pieSize - 32;

const monthlySpending: Array<DataPoint> = [
  { name: 'Food & Dining', value: 22 },
  { name: 'Health Insurance', value: 18 },
  { name: 'Miscellaneous', value: 32 },
  { name: 'Travel & Shopping', value: 16 },
];

const total = DataPointHelpers.getTotal(monthlySpending);

export const Home = () => {
  return (
    <main>
      <div className="charts-wrapper">
        <div>
          <h1>Highcharts</h1>
          <div className="chart">
            <HighchartsPieChart
              title="Top spending categories"
              total={total}
              totalLabel="$ per month"
              pieSize={pieSize}
              pieInnerSize={pieInnerSize}
              data={monthlySpending}
            />
          </div>
        </div>

        <div>
          <h1>Nivo</h1>
          <div className="chart">
            <NivoPieChart
              title="Top spending categories"
              total={total}
              totalLabel="$ per month"
              pieSize={pieSize}
              pieInnerSize={pieInnerSize}
              data={monthlySpending}
            />
          </div>
        </div>

        <div>
          <h1>Plotly</h1>
          <div className="chart">
            <PlotlyPieChart
              title="Top spending categories"
              total={total}
              totalLabel="$ per month"
              pieSize={pieSize}
              pieInnerSize={pieInnerSize}
              data={monthlySpending}
            />
          </div>
        </div>

        <div>
          <h1>Recharts</h1>
          <div className="chart">
            <RechartsPieChart
              title="Top spending categories"
              total={total}
              totalLabel="$ per month"
              pieSize={pieSize}
              pieInnerSize={pieInnerSize}
              data={monthlySpending}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
