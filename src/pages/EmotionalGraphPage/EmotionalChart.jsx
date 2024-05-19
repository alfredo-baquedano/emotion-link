import { useRef, useEffect, useState } from 'react'
import * as d3 from "d3";
import events from './testData.json';
import ChartLegend from './../../components/ChartLegend'
import CreateEventForm from './CreateEventForm'
import { Dialog } from '@mui/material';

const emotions =  {
  joy: {
    name: 'joy',
    display_name: "Joy",
    color: "#87D37C"
  },
  surprise: {
    name: 'surprise',
    display_name: "Surprise",
    color: "#FFCC99"
  },
  sadness: {
    name: 'sadness',
    display_name: "Sadness",
    color: "#99CCFF"
  },
  anger: {
    name: 'anger',
    display_name: "Anger",
    color: "#ff4d4d"
  },
  fear: {
    name: 'fear',
    display_name: "Fear",
    color: "#8E44AD"
  },
  love: {
    name: 'love',
    display_name: "Love",
    color: "#FFBDFF"
  }
}

const EmotionalChart = () => {
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    loadChart(svgElement);
    return () => d3.select(ref.current).selectAll('*').remove();;
  }, [])

  const handleOpenCreateEvent = () => {
    setOpenCreateEvent(true);
  }

  const handleCloseCreateEvent = () => {
    setOpenCreateEvent(false);
  }

  const handleCreateEvent = () => {
    setOpenCreateEvent(false);
  }

  const linkArc = (d) => {
    const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
    return `
      M${d.source.x},${d.source.y}
      A${0},${0} 0 0,1 ${d.target.x},${d.target.y}
    `;
  }

  const drag = simulation => {
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
    
    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  const loadChart = svg => {
    const width = 1628;
    const height = 800;
    const filteredEvents = events
      .filter((e) => events
        .some(eventR => e.name === 'Myself' || eventR.relationships.followed_by
            .some(eventF => eventF === e.id)));
    const suits = filteredEvents.reduce((acc, curr) => {
      curr.relationships.followed_by.forEach(event => {
        acc.push({ source: curr.id, target: event, type: 'cause' });
      });
      curr.relationships.preceded_by.forEach(event => {
        acc.push({ source: event, target: curr.id, type: 'result' });
      });
      return acc;
    }, [])
  
    const types = Array.from(new Set(suits.map(d => d.type)));
    const nodes = filteredEvents;
    const links = suits;
  
    const color = d3.scaleOrdinal(types, d3.schemeCategory10);
  
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).strength(() => 0.1).distance(() => 100).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
  
    svg
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; font: 12px sans-serif;");

    svg.append("defs").selectAll("marker")
      .data(types)
      .join("marker")
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 40)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("fill", color)
        .attr("d", "M0,-5L10,0L0,5");
  
    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
        .attr("stroke", d => color(d.type))
        .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);
  
    const node = svg.append("g")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(nodes)
      .join("g")
        .attr("fill", d => emotions[d?.emotions[0]]?.color ?? 'white')
        .call(drag(simulation));

    node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 0.1)
        .attr("r", 25)
      .clone(true).lower()
        .attr("fill", "transparent")
        .attr("stroke", "white")
        .attr("stroke-width", 2)

    node.append("path")
      .data(nodes)
      .attr("d", "M-25,0 a1,1 0 0,0 50,0")
      .attr("transform", "rotate(-45)")
      .attr("fill", d => emotions[d?.emotions[1]]?.color ?? 'transparent')

    node.on("click", handleOpenCreateEvent);

    node.append("text")
      .attr("y", 40)
      .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "12px")
        .text(d => d.name)
      .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1);
  
    simulation.on("tick", () => {
      link.attr("d", linkArc);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
  
    return Object.assign(svg.node(), { scales: {color} });
  }

  const emotionList = Object.values(emotions);

  return (
    <>  
      <Dialog open={openCreateEvent} onClose={handleCloseCreateEvent}>
        <CreateEventForm relatedEvent={''} onCreate={handleCreateEvent} emotionsList={emotionList} onClose={handleCloseCreateEvent} />
      </Dialog>
      <ChartLegend emotionList={emotionList}/>
      <svg ref={ref} />
    </>
  )
}

export default EmotionalChart;