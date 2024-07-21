import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { scaleLinear } from 'd3-scale';
import * as d3Shape from 'd3-shape';

interface SparklineProps {
  data: number[];
  positive: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({ data, positive }) => {
  if (data.length === 0) {
    return <View style={styles.placeholder} />;
  }

  const width = 80;
  const height = 50;
  const strokeWidth = 2;

  const x = scaleLinear().domain([0, data.length - 1]).range([0, width]);
  const y = scaleLinear().domain([Math.min(...data), Math.max(...data)]).range([height, 0]);

  const line = d3Shape.line<number>()
    .x((_, index) => x(index))
    .y(d => y(d))
    .curve(d3Shape.curveMonotoneX);

  const pathData = line(data) || undefined;

  return (
    <Svg width={width} height={height}>
      <Path
        d={pathData}
        fill="none"
        stroke={positive ? 'green' : 'red'}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    width: 100,
    height: 50,
    backgroundColor: '#f0f0f0',
  },
});

export default Sparkline;
