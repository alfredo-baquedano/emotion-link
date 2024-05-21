import { useRef, useEffect, useState } from 'react';
import * as d3 from "d3";
import ChartLegend from './../../components/ChartLegend';
import CreateEventForm from './CreateEventForm';
import EditEventForm from './EditEventForm';
import { Dialog } from '@mui/material';
import emotionList from '../../contants/emotions.json';

const EmotionalChart = ({ events }) => {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const ref = useRef();

  const emotions = emotionList.reduce((acc, curr) => ({ ...acc, [curr.name]: curr}), {});

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    loadChart(svgElement);
    return () => d3.select(ref.current).selectAll('*').remove();
  }, []);

  const handleOpenCreateEvent = () => {
    setOpenCreateEvent(true);
  };

  const handleCloseCreateEvent = () => {
    setOpenCreateEvent(false);
  };

  const handleOpenEditEvent = (e) => {
    e.stopPropagation();
    setOpenEditEvent(true);
  };

  const handleCloseEditEvent = () => {
    setOpenEditEvent(false);
  };

  const handleCreateEvent = (event) => {
    setEvents([...events, event]);
    setOpenCreateEvent(false);
  };

  const handleEditEvent = (event) => {
    setEvents([...events, event]);
    setOpenCreateEvent(false);
  };

  const linkArc = (d) => {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
      M${d.source.x},${d.source.y}
      A${0},${0} 0 0,1 ${d.target.x},${d.target.y}
    `;
  };

  const drag = (simulation) => {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  };

  const loadChart = (svg) => {
    const width = 1628;
    const height = 800;
    const filteredEvents = events.filter((e) =>
      events.some(
        (eventR) =>
          e.name === 'Myself' ||
          eventR.relationships.followed_by.some((eventF) => eventF === e.id),
      ),
    );
    const suits = filteredEvents.reduce((acc, curr) => {
      curr.relationships.followed_by.forEach((event) => {
        acc.push({ source: curr.id, target: event, type: 'cause' });
      });
      curr.relationships.preceded_by.forEach((event) => {
        acc.push({ source: event, target: curr.id, type: 'result' });
      });
      return acc;
    }, []);

    const types = Array.from(new Set(suits.map((d) => d.type)));
    const nodes = filteredEvents;
    const links = suits;

    const color = d3.scaleOrdinal(types, d3.schemeCategory10);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .strength(() => 0.1)
          .distance(() => 100)
          .id((d) => d.id),
      )
      .force('charge', d3.forceManyBody().strength(-500))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    svg
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'max-width: 100%; height: auto; font: 12px sans-serif;');

    svg
      .append('defs')
      .selectAll('marker')
      .data(types)
      .join('marker')
      .attr('id', (d) => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 40)
      .attr('refY', -1.5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', color)
      .attr('d', 'M0,-5L10,0L0,5');

    const link = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('stroke', (d) => color(d.type))
      .attr(
        'marker-end',
        (d) => `url(${new URL(`#arrow-${d.type}`, location)})`,
      );

    const node = svg
      .append('g')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('stroke', 'white')
      .attr('stroke-width', 1)
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    node
      .on('mouseover', function (e) {
        const data = e.target.__data__;
        d3.select(this).attr('stroke-width', 5);
        d3.select(`#edit-button-${data.id}`).style('display', 'block');
        d3.select(`#create-button-${data.id}`).style('display', 'block');
      })
      .on('mouseout', function (e) {
        const data = e.target.__data__;
        d3.select(this).attr('stroke-width', 1);
        d3.select(`#edit-button-${data.id}`).style('display', 'none');
        d3.select(`#create-button-${data.id}`).style('display', 'none');
      });

    const nodeCircle = node.append('g').attr('cursor', 'grab');

    nodeCircle
      .append('circle')
      .attr('r', 25)
      .attr('fill', (d) => emotions[d?.emotions[0]]?.color ?? 'white');

    nodeCircle
      .append('path')
      .data(nodes)
      .attr('d', 'M-25,0 a1,1 0 0,0 50,0')
      .attr('transform', 'rotate(-45)')
      .attr('fill', (d) => emotions[d?.emotions[1]]?.color ?? 'transparent');

    node
      .append('text')
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '14px')
      .attr('stroke', 'black')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 0.4)
      .text((d) => d.name);

    const editButton = node
      .append('g')
      .data(nodes)
      .attr('id', (d) => `edit-button-${d.id}`)
      .attr('stroke-width', 0)
      .attr('transform', `translate(20, -17)`)
      .style('cursor', 'pointer')
      .style('display', 'none')
      .on('click', handleOpenEditEvent);

    editButton.append('circle').attr('r', 10).attr('fill', 'white');

    editButton
      .append('path')
      .attr('transform', `translate(-8, -8) scale(0.7)`)
      .attr('fill', 'gray')
      .attr('stroke', 'gray')
      .attr(
        'd',
        'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z',
      );

    const createButton = node
      .append('g')
      .data(nodes)
      .attr('id', (d) => `create-button-${d.id}`)
      .attr('stroke-width', 2)
      .attr('transform', `translate(-18, 20)`)
      .style('cursor', 'pointer')
      .style('display', 'none')
      .on('click', handleOpenCreateEvent);

    createButton.append('circle').attr('r', 10).attr('fill', 'white');

    createButton
      .append('path')
      .attr('transform', `translate(-9, -8) scale(0.7)`)
      .attr('fill', 'gray')
      .attr('stroke', 'gray')
      .attr('d', 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z');

    simulation.on('tick', () => {
      link.attr('d', linkArc);
      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });
  }

  return (
    <>
      <Dialog open={openCreateEvent} onClose={handleCloseCreateEvent}>
        <CreateEventForm
          relatedEvent={''}
          onCreate={handleCreateEvent}
          emotionsList={emotionList}
          onClose={handleCloseCreateEvent}
        />
      </Dialog>
      <Dialog open={openEditEvent} onClose={handleCloseEditEvent}>
        <EditEventForm
          event={'currentEvent'}
          emotionsList={emotionList}
          onEdit={handleEditEvent}
          onClose={handleCloseEditEvent}
        />
      </Dialog>
      <ChartLegend emotionList={emotionList} />
      <svg ref={ref} />
    </>
  );
}

export default EmotionalChart;
