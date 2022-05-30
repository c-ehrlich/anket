import React, { useEffect, useRef } from 'react';
import { SurveyStatsResponseQuestion } from '../../backend/surveyStats/surveyStats.schema';
import { GradientLightgreenGreen } from '@visx/gradient';
import { Group } from '@visx/group';
import { Pie } from '@visx/shape';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { Box, Paper } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { getColorRange } from '../../utils/getColorRange';

export default function SurveyStatsYesNo({
  question,
}: {
  question: SurveyStatsResponseQuestion;
}) {
  // const containerRef = useRef<SVGSVGElement>(null);
  const { ref: containerRef, width: containerWidth } = useElementSize();

  const data = () => {
    const results = [
      { name: 'Yes', quantity: 0 },
      { name: 'No', quantity: 0 },
    ];
    question.questionResponses.forEach((r) => {
      r.answerBoolean === true ? results[0].quantity++ : results[1].quantity++;
    });
    return results;
  };

  const colors = getColorRange({ start: '#388E3C', end: '#4CAF50', count: 2 });

  const ordinalColorScale = scaleOrdinal({
    domain: ['Yes', 'No'],
    range: colors,
  });

  return (
    <Box style={{ position: 'relative' }}>
      <LegendContainer title='Responses'>
        <LegendOrdinal scale={ordinalColorScale} labelFormat={(label) => label}>
          {(labels) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              data={data()}
              pieValue={(d) => d.quantity}
              outerRadius={containerWidth > 500 ? 230 : containerWidth / 2 - 20}
            >
              {(pie) => {
                return pie.arcs.map((arc, index) => {
                  const { name } = arc.data;
                  const [centroidX, centroidY] = pie.path.centroid(arc);
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                  const arcPath = pie.path(arc) || '';
                  // const arcFill='red';
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

function LegendContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      radius='md'
      style={{
        position: 'absolute',
        bottom: '12px',
        right: '4px',
        margin: '8px',
        padding: '8px',
        boxShadow: '1px 1px 10px -4px',
      }}
    >
      <div className='title'>{title}</div>
      {children}
      <style jsx>{`
        .title {
          font-size: 16px;
          margin-bottom: 10px;
          font-weight: 300;
        }
      `}</style>
    </Paper>
  );
}
