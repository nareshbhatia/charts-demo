import React from 'react';
import { animated } from '@react-spring/web';
import { ArcLinkLabelComponent } from '@nivo/arcs';
import { useTheme } from '@nivo/core';
import { ComputedDatum, ResponsivePie } from '@nivo/pie';
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

const Label: ArcLinkLabelComponent<ComputedDatum<{}>> = ({
  datum,
  label,
  style,
}) => {
  const theme = useTheme();

  // TODO: remove the hard-coding below to left-align the values
  const x =
    datum.id === 'Travel & Shopping'
      ? -85
      : datum.id === 'Miscellaneous'
      ? -61
      : 0;

  return (
    <animated.g opacity={style.opacity}>
      <animated.path
        fill="none"
        stroke={style.linkColor}
        strokeWidth={style.thickness}
        d={style.path}
      />
      <animated.text
        transform={style.textPosition}
        textAnchor={style.textAnchor}
        dominantBaseline="central"
        style={{
          ...theme.labels.text,
          fill: style.textColor,
        }}
      >
        {label}
      </animated.text>
      <g transform={`translate(${x}, 16)`}>
        <animated.text
          transform={style.textPosition}
          textAnchor={style.textAnchor}
          dominantBaseline="central"
          style={{
            ...theme.labels.text,
            fill: style.textColor,
            fontWeight: 'bold',
          }}
        >
          {datum.formattedValue}
        </animated.text>
      </g>
    </animated.g>
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
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLinkLabelComponent={Label}
      layers={[
        'arcs',
        'arcLinkLabels',
        Title(title),
        CenteredMetric(total, totalLabel),
      ]}
    />
  );
};
