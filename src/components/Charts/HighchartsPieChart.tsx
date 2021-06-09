import React, { useEffect, useRef, useState } from 'react';
import Highcharts, { Chart } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DataPoint } from '../../models';
import { ChartColors } from '../../utils';

Highcharts.setOptions({
  colors: ChartColors,
});

export interface HighchartsPieChartProps {
  title: string;
  total: number;
  totalLabel: string;
  pieSize: number;
  pieInnerSize: number;
  data: Array<DataPoint>;
}

export const HighchartsPieChart = ({
  title,
  total,
  totalLabel,
  pieSize,
  pieInnerSize,
  data,
}: HighchartsPieChartProps) => {
  const chartRef =
    useRef<{
      chart: Chart;
      container: React.RefObject<HTMLDivElement>;
    }>(null);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie',
      style: {
        fontFamily: 'Overpass',
      },
      events: {
        render() {
          const chart = chartRef?.current?.chart;
          if (!chart) {
            return;
          }

          // destroy old total elements
          // @ts-ignore
          if (chart.totalElement && chart.totalElement) {
            // @ts-ignore
            chart.totalElement.destroy();
            // @ts-ignore
            chart.totalLabelElement.destroy();
          }

          // render total
          // @ts-ignore
          chart.totalElement = chart.renderer
            .text(total.toString(), 0, 0)
            .css({
              fontSize: '32px',
            })
            .add();

          // @ts-ignore
          chart.totalLabelElement = chart.renderer
            .text(totalLabel, 0, 0)
            .css({
              fontSize: '12px',
            })
            .add();

          // @ts-ignore
          const totalElementBox = chart.totalElement.getBBox();
          // @ts-ignore
          const totalLabelElementBox = chart.totalLabelElement.getBBox();

          // Place total above center.
          // This is done by ignoring totalElementBox.height
          // @ts-ignore
          chart.totalElement.translate(
            chart.plotLeft + (chart.plotWidth - totalElementBox.width) / 2,
            chart.plotTop + chart.plotHeight / 2
          );

          // Place total label below label.
          // @ts-ignore
          chart.totalLabelElement.translate(
            chart.plotLeft + (chart.plotWidth - totalLabelElementBox.width) / 2,
            chart.plotTop + (chart.plotHeight + totalElementBox.height) / 2
          );
        },
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: pieSize,
        innerSize: pieInnerSize,
        dataLabels: {
          distance: 30, // this is the default
          format: '{point.name}<br /><b>{point.y}</b>',
          style: {
            fontSize: '12px',
            fontWeight: 300,
            textOverflow: 'clip',
          },
        },
      },
      series: {
        states: {
          hover: {
            enabled: false,
          },
          inactive: {
            opacity: 1,
          },
        },
      },
    },
    title: {
      align: 'left',
      style: {
        fontSize: '16px',
      },
      text: title,
    },
    tooltip: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            // rule applies when chart width is less than this
            maxWidth: 325,
          },
          chartOptions: {
            plotOptions: {
              pie: {
                dataLabels: {
                  distance: 25,
                },
              },
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    // set options from props
    const pieData = data.map((point) => ({
      name: point.name,
      y: point.value,
    }));
    // overwrite the options - the new ones will be passed to chart.update()
    // see https://github.com/highcharts/highcharts-react#optimal-way-to-update
    setChartOptions({
      // @ts-ignore
      series: [{ data: pieData }],
    });
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { width: '100%', height: '100%' } }}
      options={chartOptions}
      ref={chartRef}
    />
  );
};
