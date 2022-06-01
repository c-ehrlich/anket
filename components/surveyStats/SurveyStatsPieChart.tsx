import { Box, Paper } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { GradientLightgreenGreen } from '@visx/gradient';
import { Group } from '@visx/group';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { Pie } from '@visx/shape';
import { useMemo } from 'react';
import { getColorRange } from '../../utils/getColorRange';
import LegendContainer from './LegendContainer';

export default function SurveyStatsPieChart({
  data,
}: {
  data: { name: string; quantity: number }[];
}) {
  const { ref: containerRef, width: containerWidth } = useElementSize();

  const colors = useMemo(() => {
    return getColorRange({
      start: '#388E3C',
      end: '#4CAF50',
      count: data.length,
    });
  }, [data]);

  const ordinalColorScale = useMemo(() => {
    return scaleOrdinal({
      domain: data.map((o) => o.name),
      range: colors,
    });
  }, [data, colors]);

  return (
    <Box style={{ position: 'relative' }}>
      <LegendContainer title='Responses'>
        <LegendOrdinal scale={ordinalColorScale} labelFormat={(label) => label}>
          {(labels) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {labels.reverse().map((label, i) => (
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
      </LegendContainer>
      <div ref={containerRef}>
        <svg
          width='100%'
          height={containerWidth > 500 ? 500 : containerWidth + 50}
        >
          <GradientLightgreenGreen id='visx-pie-gradient' />
          <rect
            rx={14}
            width='100%'
            height={containerWidth > 500 ? 500 : containerWidth + 50}
            fill="url('#visx-pie-gradient')"
          />

          <Group
            top={containerWidth > 500 ? 250 : containerWidth / 2}
            left={containerWidth > 500 ? 250 : containerWidth / 2}
          >
            <Pie
              data={data}
              pieValue={(d) => d.quantity}
              outerRadius={containerWidth > 500 ? 230 : containerWidth / 2 - 20}
            >
              {(pie) => {
                return pie.arcs.map((arc, index) => {
                  const { name } = arc.data;
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.2;
                  const arcPath = pie.path(arc) || '';
                  return (
                    <g key={`arc-${name}-${index}`}>
                      <path d={arcPath} fill={colors[index]} />
                      {hasSpaceForLabel && (
                        <text
                          x={centroidX}
                          y={centroidY}
                          dy='.33em'
                          fill='#ffffff'
                          fontSize={22}
                          fontWeight={500}
                          textAnchor='middle'
                          pointerEvents='none'
                        >
                          {arc.data.name}
                        </text>
                      )}
                    </g>
                  );
                });
              }}
            </Pie>
          </Group>
        </svg>
      </div>
    </Box>
  );
}


