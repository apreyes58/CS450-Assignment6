import React, { Component } from "react";
import FileUpload from "./FileUpload";
import * as d3 from 'd3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected_data: []
    };
  }
  componentDidMount() {
    this.renderChart()
  }
  componentDidUpdate() {
    this.renderChart()
  }
  set_data = (csv_data) => {
    this.setState({ data: csv_data });
  }
  renderChart = () => {
    const { data } = this.state;
    if (data.length === 0) return;

    d3.select(".parent").selectAll("*").remove();

    const margin = { top: 20, right: 150, bottom: 30, left: 50 };
    const width = 800;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(".parent")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const models = ["GPT-4", "Gemini", "PaLM-2", "Claude", "LLaMA-3.1"];
    const colorScale = d3.scaleOrdinal()
      .domain(models)
      .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.Date))
      .range([0, innerWidth]);

    const stack = d3.stack()
      .keys(models)
      .offset(d3.stackOffsetWiggle);

    const stackedData = stack(data);
    this.stackedKeys = stackedData.map(d => d.key);

    const yExtent = [
      d3.min(stackedData, layer => d3.min(layer, d => d[0])),
      d3.max(stackedData, layer => d3.max(layer, d => d[1]))
    ];

    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([innerHeight - 10, 0]);

    const area = d3.area()
      .curve(d3.curveCardinal)
      .x(d => xScale(d.data.Date))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]));

    g.selectAll(".area")
      .data(stackedData)
      .join("path")
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", d => colorScale(d.key));

    const tooltip = d3.select("body").selectAll(".tooltip").data([0]).join("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid gray")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    g.selectAll(".area")
      .on("mouseover", (event, d) => {
        tooltip.style("opacity", 1);
        showMiniBarChart(d.key);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", (event.pageX + 15) + "px")
          .style("top", (event.pageY - 75) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
        tooltip.selectAll("svg").remove();
      });

    function showMiniBarChart(modelKey) {
      tooltip.selectAll("svg").remove();

      const w = 300, h = 150, margin = { top: 20, right: 10, bottom: 30, left: 35 };
      const innerW = w - margin.left - margin.right;
      const innerH = h - margin.top - margin.bottom;
      const modelData = data.map(d => ({ date: d.Date, value: d[modelKey] }));

      const x = d3.scaleBand()
        .domain(modelData.map(d => d3.timeFormat("%b")(d.date)))
        .range([0, innerW])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(modelData, d => d.value)])
        .range([innerH, 0]);

      const svg = tooltip.append("svg")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      svg.append("g")
        .attr("transform", `translate(0, ${innerH})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y).ticks(4));

      svg.selectAll("rect")
        .data(modelData)
        .join("rect")
        .attr("x", d => x(d3.timeFormat("%b")(d.date)))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => innerH - y(d.value))
        .attr("fill", colorScale(modelKey));
    }


    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));

    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);

    models.reverse().forEach((model, i) => {
      const yOffset = i * 30;

      legend.append("rect")
        .attr("x", 0)
        .attr("y", yOffset)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", colorScale(model));

      legend.append("text")
        .attr("x", 20)
        .attr("y", yOffset + 12)
        .text(model)
        .style("font-size", "14px")
        .attr("alignment-baseline", "middle");
    });


  };

  render() {
    return (
      <div>
        <FileUpload set_data={this.set_data}></FileUpload>
        <div className="parent">
        </div>
      </div>
    );
  }
}

export default App;
