import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
// import { Cd } from "../hooks/useFetchData";

const Chart = ({ data }: any) => {
  const {
    cd_name: name,
    _1970_population: _70_pop,
    _1980_population: _80_pop,
    _1990_population: _90_pop,
    _2000_population: _00_pop,
    _2010_population: _10_pop,
  } = data;
  const [newData] = useState<object[]>([
    {
      yr: 1970,
      pop: Number(_70_pop),
    },
    {
      yr: 1980,
      pop: Number(_80_pop),
    },
    {
      yr: 1990,
      pop: Number(_90_pop),
    },
    {
      yr: 2000,
      pop: Number(_00_pop),
    },
    {
      yr: 2010,
      pop: Number(_10_pop),
    },
  ]);
  console.log(newData);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // establish values
    const w = 600;
    const h = 300;
    const yMax = d3.max(newData, (d: any) => d.pop);
    const yMin = d3.min(newData, (d: any) => d.pop);
    const xMax = d3.max(newData, (d: any) => d.yr);
    const xMin = d3.min(newData, (d: any) => d.yr);

    // create chart area
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#d3d3d3")
      // .style("margin-top", "50")
      .style("overflow", "visible");

    // setting the scaling (range of values for chart)
    const xScale = d3
      .scaleLinear()
      .domain([xMin, xMax])
      .range([0, w]);
    const yScale: any = d3
      .scaleLinear()
      .domain([yMin - 10000, yMax])
      .range([h, 0]);
    const generateScaledLine = d3
      .line()
      // .x((d, i) => xScale(i))
      // .y(yScale)
      .x((d: any) => xScale(d.yr))
      .y((d: any) => yScale(d.pop))
      .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(newData.length)
      .tickFormat((i: any) => i);
    const yAxis = d3.axisLeft(yScale).ticks(4);
    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);

    // setting up data for svg
    svg
      .selectAll(".line")
      .data([newData])
      .join("path")
      .attr("d", (d: any) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
  }, [newData]);

  return (
    <div>
      <h2>{name}</h2>
      {/* <p>(Insert Chart Here)</p> */}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Chart;
