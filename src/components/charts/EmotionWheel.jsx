import { useEffect, useRef, memo } from 'react';
import * as d3 from 'd3';
import { getTooltipText } from '@/utils/emotions.js';
import { useUser } from '@/contexts/UserContext';
import emotions from '@/constants/emotions.json';

const EmotionWheel = ({ value: currentEmotions = [], onSelect = () => {} }) => {
  const { getLevel } = useUser();
  const userLevel = getLevel();

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    loadChart(svgElement);
    return () => d3.select(ref.current).selectAll('*').remove();
  }, [currentEmotions]);

  const width = 800;
  const radius = width / 6;
  const ref = useRef();

  const partition = (data) =>
    d3.partition().size([2 * Math.PI, radius])(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value),
    );

  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1);

  const autoBox = () => {
    const { x, y, width, height } = ref.current.getBBox();
    return [x, y, width, height];
  };

  const loadChart = (svg) => {
    console.time('loadChart');
    const root = partition(emotions);
    svg.attr('viewBox', autoBox).node();

    svg
      .attr('style', 'font: 8px sans-serif;')
      .append('g')
      .selectAll('path')
      .data(root.descendants().filter((d) => d.depth))
      .join('path')
      .attr('fill-opacity', (d) =>
        currentEmotions.find((e) => e.name === d.data.name) ? 1 : 0.3,
      )
      .attr('stroke', 'white')
      .attr('stroke-width', (d) =>
        currentEmotions.find((e) => e.name === d.data.name) ? 1 : 0,
      )
      .attr('fill', (d) => (d.data.level > userLevel ? 'gray' : d.data.color))
      .attr('id', (d) => d.data.name)
      .on('click', function () {
        console.time('click');
        const emotionData =
          d3.select(this)._groups?.[0]?.[0]?.__data__?.data ?? '';
        if (emotionData.level > userLevel) return;
        const index = currentEmotions.findIndex(
          (emotion) => emotion.name === emotionData.name,
        );
        let value = [];
        if (index === -1) {
          value = [...currentEmotions, emotionData];
        } else {
          value = currentEmotions.filter((_, i) => i !== index);
        }
        onSelect(value);
      })
      .attr('d', arc)
      .append('title')
      .text((d) => `${d.data.description}${getTooltipText(d.data, userLevel)}`);

    svg
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('font-size', 5)
      .attr('font-family', 'sans-serif')
      .selectAll('text')
      .data(
        root
          .descendants()
          .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10),
      )
      .join('text')
      .attr('transform', function (d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr('dy', '0.35em')
      .text((d) => d.data.displayName);

    svg.attr('viewBox', autoBox).node();
    console.timeEnd('loadChart');
  };

  return <svg width='600' height='600' ref={ref}></svg>;
};

export default EmotionWheel;
