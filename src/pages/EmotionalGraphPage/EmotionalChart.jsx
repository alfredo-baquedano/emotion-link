import { useRef, useEffect } from 'react'
import * as d3 from "d3";
import events from './testData.json';

const emotions =  {
  joy: {
    display_name: "Joy",
    color: "#87D37C"  // Pale yellow
  },
  surprise: {
    display_name: "Surprise",
    color: "#FFCC99"
  },
  sadness: {
    display_name: "Sadness",
    color: "#99CCFF"
  },
  anger: {
    display_name: "Anger",
    color: "#ff4d4d"  // Pale red
  },
  fear: {
    display_name: "Fear",
    color: "#8E44AD"  // Pale pink
  },
  love: {
    display_name: "Love",
    color: "#FFBDFF"  // Pale pink
  }
}

const EmotionalChart = () => {
  const ref = useRef();

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    loadChart(svgElement);
    return () => d3.select(ref.current).selectAll('*').remove();;
  }, [])

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
    const width = 928;
    const height = 600;
    const suits = events.reduce((acc, curr) => {
      curr.relationships.followed_by.forEach(event => {
        acc.push({ source: curr.id, target: event, type: 'cause' });
      });
      curr.relationships.preceded_by.forEach(event => {
        acc.push({ source: event, target: curr.id, type: 'result' });
      });
      return acc;
    }, [])
  
    const types = Array.from(new Set(suits.map(d => d.type)));
    const nodes = events;
    const links = suits

    console.log('nodes', nodes)
    console.log('links', links)
    console.log('suits', suits)
    console.log('types', types)
  
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
    
    // Per-type markers, as they don't inherit styles.
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
        .attr("r", 25);

    node.append("path")
        .data(nodes)
        .attr("d", "M-25,0 a1,1 0 0,0 50,0")
        .attr("transform", "rotate(-45)")
        .attr("fill", d => emotions[d?.emotions[1]]?.color ?? 'transparent')
  
    node.append("text")
    .attr("y", 40)
    .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("font-size", "16px")
      .text(d => d.name)
    .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1);
  
    simulation.on("tick", () => {
      link.attr("d", linkArc);
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
  
    return Object.assign(svg.node(), { scales: {color} });
  }

  return (
    <svg ref={ref} />
  )
}

export default EmotionalChart;