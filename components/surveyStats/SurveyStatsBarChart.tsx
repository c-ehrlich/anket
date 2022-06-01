import { GradientLightgreenGreen } from '@visx/gradient';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { Bar } from '@visx/shape';
import React, { useMemo } from 'react';
import { getColorRange } from '../../utils/getColorRange';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Box, useMantineTheme } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import LegendContainerBarChart from './LegendContainerBarChart';
import { wrap } from 'module';

function SurveyStatsBarChart({
  data,
}: {
  data: { name: string; quantity: number }[];
}) {
  const { ref: sizeRef, width: sizeW, height: sizeH } = useElementSize();

  // bounds
  const width = 500;
  const height = 300;
  const verticalMargin = 12;
  const xMax = width;
  const yMax = height - verticalMargin;
  const defaultMargin = { top: 20, left: 50, right: 40, bottom: 100 };

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, sizeW - defaultMargin.left],
        round: true,
        domain: data.map((d) => d.name),
        padding: 0.4,
      }),
    [sizeW, defaultMargin.left, data]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        // TODO defaultMargin.top is a temp value
        range: [yMax, 0 + defaultMargin.top],
        round: true,
        domain: [0, Math.max(...data.map((d) => d.quantity))],
      }),
    [yMax, defaultMargin.top, data]
  );

  const theme = useMantineTheme();

  const colors = useMemo(() => {
    return getColorRange({
      start: theme.colors.green[8],
      end: theme.colors.green[4],
      count: data.length,
    });
  }, [theme.colors, data.length]);

  const ordinalColorScale = useMemo(() => {
    return scaleOrdinal({
      domain: data.map((o) => o.name),
      range: colors,
    });
  }, [data, colors]);

  return width < 10 ? null : (
    <Box style={{ position: 'relative' }}>
      
      <Box ref={sizeRef}>
        
        {/* TODO don't use this weird height hack */}
        <svg width={sizeW} height={height + 15}>
          <GradientLightgreenGreen id='teal' />
          <rect width={sizeW} height={height} fill='url(#teal)' rx={14} />
          <Group left={defaultMargin.left}>
            {data.map((d, i) => {
              const letter = d.name;
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - (yScale(d.quantity) ?? 0);
              const barX = xScale(d.name);
              const barY = yMax - barHeight;
              return (
                <Bar
                  key={`bar-${letter}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill={colors[i]}
                  // onClick={() => {
                  //   if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                  // }}
                />
              );
            })}
            <AxisLeft
              // hideAxisLine
              // hideTicks
              scale={yScale}
              stroke={colors[0]}
              tickStroke={colors[0]}
              tickLabelProps={() => ({
                fill: colors[0],
                fontSize: 11,
                textAnchor: 'end',
                dy: '0.33em',
              })}
            />
            <AxisBottom
              hideAxisLine
              hideTicks
              top={yMax}
              scale={xScale}
              stroke={colors[0]}
              tickStroke={colors[0]}
              tickLabelProps={() => ({
                fill: colors[0],
                fontSize: 11,
                textAnchor: 'middle',
              })}
            />
          </Group>
        </svg>
      </Box>
      <LegendContainerBarChart title='Legend'>
          <LegendOrdinal
            scale={ordinalColorScale}
            labelFormat={(label) => label}
          >
            {(labels) => (
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {labels.map((label, i) => (
                  <LegendItem key={`legend-${label}-${i}`} margin='5px 5px'>
                    <svg width={15} height={15}>
                      <rect fill={label.value} width={15} height={15} />
                    </svg>
                    <LegendLabel align='left' margin='0 0 0 4px'>
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                ))}
              </div>
            )}
          </LegendOrdinal>
        </LegendContainerBarChart>
    </Box>
  );
}

export default SurveyStatsBarChart;
