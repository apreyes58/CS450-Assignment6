import React, { Component } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

class WordCloud extends Component {

    componentDidMount() {
        var words = [
            { text: "D3.js", size: 40 },
            { text: "Visualization", size: 30 },
            { text: "React", size: 35 },
            { text: "JavaScript", size: 25 },
            { text: "Data", size: 20 },
            { text: "Cloud", size: 50 },
            { text: "Chart", size: 15 },
        ];

        const width = 500;
        const height = 500;

        // Create the layout and render the text
        var layout = cloud().size([width, height]).words(words).padding(5).rotate(0).fontSize(d => d.size)
            .on('end', (words) => {
                console.log(words)
                d3.select('g').attr('transform', `translate(${width / 2}, ${height / 2})`)
                    .selectAll('text').data(words).join('text').attr('font-size', d => d.size)
                    .text(d => d.text).attr('x', d => d.x).attr('y', d => d.y)
                    .attr('transform', d => `rotate(${d.rotate})`)
                    .attr('fill', (d, i) => d3.schemeCategory10[i])
            })
        layout.start()
    }

    render() {
        return (
            <svg className="container" width={500} height={500}><g></g></svg>
        );
    }
}

export default WordCloud;


// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {

//     componentDidMount() {
//         var data = [
//             { "radius": 12, "category": 0 }, { "radius": 4, "category": 1 }, { "radius": 19, "category": 2 }, { "radius": 9, "category": 0 }, { "radius": 7, "category": 1 },
//             { "radius": 14, "category": 2 }, { "radius": 5, "category": 0 }, { "radius": 23, "category": 1 }, { "radius": 16, "category": 2 }, { "radius": 2, "category": 0 },
//             { "radius": 25, "category": 1 }, { "radius": 11, "category": 2 }, { "radius": 6, "category": 0 }, { "radius": 20, "category": 1 }, { "radius": 18, "category": 2 },
//             { "radius": 13, "category": 0 }, { "radius": 24, "category": 1 }, { "radius": 10, "category": 2 }, { "radius": 8, "category": 0 }, { "radius": 22, "category": 1 },
//             { "radius": 17, "category": 2 }, { "radius": 3, "category": 0 }, { "radius": 21, "category": 1 }, { "radius": 15, "category": 2 }, { "radius": 1, "category": 0 },
//             { "radius": 16, "category": 1 }, { "radius": 5, "category": 2 }, { "radius": 9, "category": 0 }, { "radius": 7, "category": 1 }, { "radius": 19, "category": 2 },
//             { "radius": 10, "category": 0 }, { "radius": 13, "category": 1 }, { "radius": 14, "category": 2 }, { "radius": 6, "category": 0 }, { "radius": 12, "category": 1 },
//             { "radius": 23, "category": 2 }, { "radius": 25, "category": 0 }, { "radius": 11, "category": 1 }, { "radius": 8, "category": 2 }, { "radius": 20, "category": 0 },
//             { "radius": 18, "category": 1 }, { "radius": 15, "category": 2 }, { "radius": 1, "category": 0 }, { "radius": 17, "category": 1 }, { "radius": 2, "category": 2 }
//         ]
//         var colorScale = ['#66c2a5', '#fc8d62', '#8da0cb']
//         var catCenters = [100, 300, 500];

//         d3.forceSimulation(data).force("x", d3.forceX(d => catCenters[d.category])).force("collision", d3.forceCollide(d => d.radius))
//             .on('tick', () => {
//                 d3.select('g').selectAll('circle').data(data).join('circle').attr('r', d => d.radius).attr('fill', (d, i) => colorScale[d.category])
//                     .attr('cx', d => d.x).attr('cy', d => d.y)
//             })

//     }

//     render() {
//         return <svg width="900" height="600"><g transform="translate(110,200)"></g></svg>;
//     }
// }

// export default App;


// import React, { Component } from "react";
// import * as d3 from "d3";

// class TreeMap extends Component {
//     componentDidMount() {
//         const data = {
//             "name": "A1",
//             "children": [
//                 {
//                     "name": "B1",
//                     "children": [
//                         { "name": "C1", "value": 100 },
//                         { "name": "C2", "value": 300 },
//                         { "name": "C3", "value": 200 }
//                     ]
//                 },
//                 { "name": "B2", "value": 200 }
//             ]
//         };

//         // Hierarchy setup with value summing
//         const h_data = d3.hierarchy(data).sum(d => d.value); //.sum() traverses the tree and sets .value on each node to be the sum of its children.
//         console.log(h_data)

//         // Define the treemap layout
//         const treemapLayout = d3.treemap().size([400, 200]).paddingOuter(16);

//         // Compute the treemap layout
//         treemapLayout(h_data);
//         console.log(h_data);

//         // Select the container and join groups for each node
//         d3.select('.container').selectAll('g').data(h_data.descendants()).join('g').attr('transform', d => `translate(${d.x0}, ${d.y0})`)
//             .attr('add_rects', function (d) {
//                 d3.select(this).selectAll('rect').data([null]).join('rect').attr('width', d.x1 - d.x0).attr('height', d.y1 - d.y0).attr('fill', 'gray').attr('stroke', 'white')
//             })
//             .attr('add_text', function (d) {
//                 d3.select(this).selectAll('text').data([null]).join('text').text(d.data.name).attr('dy', 15).attr('dx', 2).style('font-size', 12)
//             })


//         // Join the rectangles


//         // Join text labels to each node


//     }

//     render() {
//         return (
//             <svg className="container" width="400" height="200"></svg>
//         );
//     }
// }

// export default TreeMap;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         const data = {
//             "name": "Root",
//             "children": [
//                 {
//                     "name": "Branch 1",
//                     "children": [
//                         { "name": "Leaf 1", "size": 10, "color": "red" },
//                         { "name": "Leaf 2", "size": 20, "color": "blue" }
//                     ]
//                 },
//                 {
//                     "name": "Branch 2",
//                     "children": [
//                         { "name": "Leaf 3", "size": 15, "color": "green" },
//                         { "name": "Leaf 4", "size": 25, "color": "purple", "children": [{ "name": "Subleaf", "size": 5, "color": "orange" }] }
//                     ]
//                 }
//             ]
//         };

//         const width = 400;
//         const height = 300;

//         // Set up the tree layout with the height as the depth
//         const treeLayout = d3.tree().size([height, width]);
//         const h_data = d3.hierarchy(data);
//         treeLayout(h_data); // Generates layout positions for nodes and links

//         // Draw links (lines between nodes)
//         console.log(h_data.links())
//         d3.select('.parent').selectAll('circle').data(h_data.links()).join('line').attr('x1', d => d.source.x).attr('y1', d => d.source.y)
//             .attr('x2', d => d.target.x).attr('y2', d => d.target.y).attr('stroke', 'blue')

//         // Draw nodes (circles for each node)
//         console.log(h_data.descendants())
//         d3.select('.parent').selectAll("circles").data(h_data.descendants()).join('circle').attr("cx", d => d.x).attr('cy', d => d.y).attr('r', 10).attr('fill', 'red')
//         // Add Labels
//         d3.select('.parent').selectAll("text").data(h_data.descendants()).join('text').attr('x', d => d.x).attr('y', d => d.y).text(d => d.data.name).attr('text-anchor', 'middle')
//             .attr('dy', d => {
//                 if (d.data.name === 'Root') {
//                     return -15
//                 }
//                 if (d.children) {
//                     return 5
//                 }
//                 else
//                     return 25
//             })
//             .attr('dx', d => {
//                 if (d.data.name === 'Root') {
//                     return -0
//                 }
//                 if (d.children) {
//                     return 45
//                 }
//             })


//     }

//     render() {
//         return (
//             <svg className="parent" style={{ width: 400, height: 700 }}></svg>
//         );
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class StackComp extends Component {
//     componentDidMount() {
//         var data = [
//             { month: new Date(2023, 0, 1), coffee: 25, tea: 15, juice: 10 },
//             { month: new Date(2023, 1, 1), coffee: 30, tea: 20, juice: 15 },
//             { month: new Date(2023, 2, 1), coffee: 35, tea: 25, juice: 20 }
//         ];

//         var xScale = d3.scaleBand().domain(data.map(d => d.month)).range([50, 275]).padding(0.2),
//             yScale = d3.scaleLinear().domain([0, 80]).range([275, 25]),
//             colorScale = d3.scaleOrdinal().domain(["coffee", "tea", "juice"]).range(["brown", "green", "orange"])

//         var stackGen = d3.stack().keys(["coffee", "tea", "juice"]),
//             stackedSeries = stackGen(data);

//         // Draw rectangles
//         d3.select(".container").selectAll('g').data(stackedSeries).join('g').attr('fill', d => colorScale(d.key))
//             .selectAll('rect').data(d => d).join('rect').attr('x', d => xScale(d.data.month)).attr('y', d => yScale(d[1])).attr('height', d => yScale(d[0]) - yScale(d[1]))
//             .attr('width', xScale.bandwidth())

//         d3.select(".x-axis").attr("transform", "translate(0, 275)").call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));
//         d3.select(".y-axis").attr("transform", "translate(50, 0)").call(d3.axisLeft(yScale).ticks(5));
//     }

//     render() {
//         return (
//             <svg style={{ width: 400, height: 600 }}>
//                 <g className="container"></g>
//                 <g className="x-axis"></g>
//                 <g className="y-axis"></g>
//             </svg>
//         );
//     }
// }
// export default StackComp;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class StackComp extends Component {
//     componentDidMount() {
//         const data = [
//             { month: new Date(2023, 0, 1), coffee: 25, tea: 15, juice: 10 },
//             { month: new Date(2023, 1, 1), coffee: 30, tea: 20, juice: 15 },
//             { month: new Date(2023, 2, 1), coffee: 35, tea: 25, juice: 20 },
//             { month: new Date(2023, 3, 1), coffee: 75, tea: 35, juice: 50 },
//             { month: new Date(2023, 4, 1), coffee: 70, tea: 10, juice: 25 },
//             { month: new Date(2023, 5, 1), coffee: 35, tea: 25, juice: 10 },
//             { month: new Date(2023, 6, 1), coffee: 45, tea: 35, juice: 80 },
//             { month: new Date(2023, 7, 1), coffee: 55, tea: 25, juice: 90 }
//         ];

//         const maxSum = d3.sum([
//             d3.max(data, d => d.coffee),
//             d3.max(data, d => d.tea),
//             d3.max(data, d => d.juice)
//         ]);

//         const margin = { top: 20, right: 20, bottom: 50, left: 50 },
//             width = 600 - margin.left - margin.right,
//             height = 400 - margin.top - margin.bottom;

//         const xScale = d3.scaleTime().domain(d3.extent(data, d => d.month)).range([0, width]),
//             yScale = d3.scaleLinear().domain([0, maxSum]).range([height, 0]);

//         const colorScale = d3.scaleOrdinal().domain(["coffee", "tea", "juice"]).range(["brown", "green", "orange"]);

//         // create stackGenerator
//         var stackGenerator = d3.stack().keys(["coffee", "tea", "juice"])
//         var stackSeries = stackGenerator(data)
//         console.log(stackSeries)

//         // create areaGen
//         var areaGen = d3.area().x(d => xScale(d.data.month)).y0(d => yScale(d[0])).y1(d => yScale(d[1]))
//         const svg = d3.select(".container").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
//         const chartGroup = svg.selectAll(".chart-group").data([null]).join("g").attr("class", "chart-group").attr("transform", `translate(${margin.left}, ${margin.top})`);

//         // Draw areas
//         chartGroup.selectAll('.areas').data(stackSeries).join('path').attr('class', 'areas').attr("d", d => areaGen(d)).attr('fill', d => colorScale(d.key))


//         // Draw x-axis
//         chartGroup.selectAll(".x-axis").data([null]).join("g").attr("class", "x-axis").attr("transform", `translate(0, ${height})`).call(d3.axisBottom(xScale).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b")));
//         // Draw y-axis
//         chartGroup.selectAll(".y-axis").data([null]).join("g").attr("class", "y-axis").call(d3.axisLeft(yScale).ticks(5));
//     }

//     render() {
//         return <svg className="container"></svg>;
//     }
// }

// export default StackComp;

// import React, { Component } from "react";
// import * as d3 from "d3";
// import NTDOY from "./NTDOY.csv";
// import { sliderBottom } from 'd3-simple-slider';

// class App extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { original_data: [], filtered_data: [] }
//     }

//     componentDidMount() {
//         d3.csv(NTDOY).then((data) => {
//             const parseDate = d3.timeParse("%Y-%m-%d");
//             data.forEach((d) => {
//                 d.Date = parseDate(d.Date);
//                 d.Close = +d.Close;
//             });
//             this.setState({ original_data: data, filtered_data: data });
//         });
//     }

//     componentDidUpdate() {
//         var data = this.state.filtered_data;

//         const margin = { top: 70, right: 60, bottom: 50, left: 80 };
//         const width = 1000;
//         const height = 400;

//         // Use innerWidth and innerHeight for the chart area, based on width and height with margins
//         const innerWidth = width - margin.left - margin.right;
//         const innerHeight = height - margin.top - margin.bottom;

//         const xScale = d3.scaleTime().domain(d3.extent(data, (d) => d.Date)).range([0, innerWidth]);
//         const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.Close)]).range([innerHeight, 0]);

//         const svg = d3.select("#chart-container").select("svg")
//             .attr("width", width) // Use width for parent SVG
//             .attr("height", height) // Use height for parent SVG
//             .select("g")
//             .attr("transform", `translate(${margin.left},${margin.top})`);

//         // Add the X axis
//         svg.selectAll(".x-axis").data([null]).join("g").attr("class", "x-axis").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));

//         // Add the Y axis
//         svg.selectAll(".y-axis").data([null]).join("g").attr("class", "y-axis").attr("transform", `translate(${innerWidth},0)`).call(d3.axisRight(yScale).tickFormat(d => isNaN(d) ? "" : `$${d.toFixed(2)}`));

//         // Create the area generator function
//         var areaGenerator = d3.area().x(d => xScale(d.Date)).y0(yScale(0)).y1(d => yScale(d.Close))
//         var pathData = areaGenerator(data)

//         // Draw the area path
//         svg.selectAll(".area").data([0]).join("path").attr('d', pathData).attr("fill", "red")

//         // Create the slider
//         const sliderRange = sliderBottom()
//             .min(d3.min(data, d => d.Date))
//             .max(d3.max(data, d => d.Date))
//             .width(300)
//             .tickFormat(d3.timeFormat('%Y-%m-%d'))
//             .ticks(3)
//             .default([d3.min(data, d => d.Date), d3.max(data, d => d.Date)])
//             .fill('#85bb65')
//             .on('onchange', val => {
//                 const f_data = this.state.original_data.filter(d => d.Date >= val[0] && d.Date <= val[1]);
//                 this.setState({ filtered_data: f_data });
//             });

//         // Add the slider to the page
//         const gRange = d3.select('.slider-range')
//             .attr('width', 500)
//             .attr('height', 100)
//             .selectAll('.slider-g')
//             .data([null])
//             .join('g')
//             .attr('class', 'slider-g')
//             .attr('transform', 'translate(90,30)');

//         gRange.call(sliderRange);
//         console.log(data);
//     }

//     render() {
//         return (
//             <div>
//                 <svg className="slider-range"></svg>
//                 <div id="chart-container"><svg><g></g></svg></div>
//             </div>
//         );
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class SimpleAreaChart extends Component {
//     componentDidMount() {
//         const data = [
//             { x: 0, y: 0 },
//             { x: 1, y: 3 },
//             { x: 2, y: 12 },
//             { x: 3, y: 8 },
//             { x: 4, y: 17 },
//             { x: 5, y: 15 },
//             { x: 6, y: 20 }
//         ];

//         const xScale = d3.scaleLinear().domain([0, 20]).range([25, 175]);
//         const yScale = d3.scaleLinear().domain([0, 6]).range([175, 25]);

//         // create the area chart

//         var areaGenerator = d3.area().y(d => yScale(d.x)).x0(xScale(0)).x1(d => xScale(d.y))
//         var pathData = areaGenerator(data)


//         d3.select("svg").selectAll("path").data([0]).join("path").attr('d', pathData).attr("fill", "red")
//     }

//     render() {
//         return (
//             <svg width="200" height="200"></svg>
//         );
//     }
// }
// export default SimpleAreaChart;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class SimpleAreaChart extends Component {
//     componentDidMount() {
//         var data = [
//             { x: 0, y: 0 },
//             { x: 1, y: 3 },
//             { x: 2, y: 12 },
//             { x: 3, y: 8 },
//             { x: 4, y: 17 },
//             { x: 5, y: 15 },
//             { x: 6, y: 20 }
//         ];

//         var xScale = d3.scaleLinear().domain([0, 6]).range([25, 175]);
//         var yScale = d3.scaleLinear().domain([0, 20]).range([175, 25]);

//         // create the area chart
//         var areaGenerator = d3.area().x(d => xScale(d.x)).y0(yScale(0)).y1(d => yScale(d.y))
//         var pathData = areaGenerator(data)
//         console.log(pathData)
//         d3.select("svg").selectAll('path').data([0]).join("path").attr('d', pathData).attr("fill", "red")


//     }

//     render() {
//         return (
//             <svg width="900" height="620"></svg>
//         );
//     }
// }

// export default SimpleAreaChart;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class HeatMap extends Component {
//     componentDidMount() {
//         const tooltip = d3.select("body").selectAll(".tooltip").data([0]).join("div").attr("class", "tooltip")
//             .style("opacity", 0).style("background-color", "white").style("position", "absolute")
//             .style("border", "1px solid gray").style("border-radius", "5px").style("padding", "5px")

//         const width = 200, height = 200, margin = { top: 30, right: 30, bottom: 30, left: 30 },
//             inner_width = width - margin.left - margin.right,
//             inner_height = height - margin.top - margin.bottom;

//         const chart_container = d3.select("svg").attr("width", width).attr("height", height)
//             .selectAll("g").data([0]).join("g").attr("transform", `translate(${margin.left},${margin.top})`);

//         const data = [
//             { variable1: "A", variable2: "A", correlation: 1 }, { variable1: "A", variable2: "B", correlation: 0.5 },
//             { variable1: "A", variable2: "C", correlation: -0.2 }, { variable1: "B", variable2: "A", correlation: 0.5 },
//             { variable1: "B", variable2: "B", correlation: 1 }, { variable1: "B", variable2: "C", correlation: 0.8 },
//             { variable1: "C", variable2: "A", correlation: -0.2 }, { variable1: "C", variable2: "B", correlation: 0.8 },
//             { variable1: "C", variable2: "C", correlation: 1 }
//         ];

//         const variable1_values = [...new Set(data.map(d => d.variable1))];
//         const variable2_values = [...new Set(data.map(d => d.variable2))];

//         const x_axis_scale = d3.scaleBand().range([0, inner_width]).domain(variable1_values).padding(0.01);
//         chart_container.selectAll(".x-axis").data([0]).join("g").attr("class", "x-axis").attr("transform", `translate(0, ${inner_height})`).call(d3.axisBottom(x_axis_scale));

//         const y_axis_scale = d3.scaleBand().range([inner_height, 0]).domain(variable2_values).padding(0.01);
//         chart_container.selectAll(".y-axis").data([0]).join("g").attr("class", "y-axis").call(d3.axisLeft(y_axis_scale));

//         const ColorScale = d3.scaleLinear().range(["red", "white", "green"]).domain([-1, 0, 1]);

//         chart_container.selectAll("rect").data(data).join("rect")
//             .attr("x", (d) => x_axis_scale(d.variable1)).attr("y", (d) => y_axis_scale(d.variable2))
//             .attr("width", x_axis_scale.bandwidth()).attr("height", y_axis_scale.bandwidth())
//             .attr("fill", (d) => ColorScale(d.correlation))
//             .on("mouseover", () => tooltip.style("opacity", 1))
//             .on("mousemove", (event, d) => tooltip.style("left", `${event.pageX}px`).style("top", `${event.pageY - 35}px`).html(`Hello tooltip`))
//             .on("mouseleave", () => tooltip.style("opacity", 0));
//     }

//     render() {
//         return <svg></svg>
//     }
// }

// export default HeatMap;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class CategoricalColorScales extends Component {
//     constructor(props) {
//         super(props);
//     }

//     componentDidMount() {
//         const data = [
//             { category: "Laptop", sales: 150 },
//             { category: "TV", sales: 200 },
//             { category: "Monitor", sales: 100 },
//             { category: "SSD", sales: 250 },
//             { category: "RAM", sales: 175 }
//         ];

//         const categoricalScale = d3.scaleOrdinal().domain(data.map((d) => d.category)).range(d3.schemeCategory10);

//         const svg = d3.select('svg').attr("transform", "translate(20, 20)");

//         var barWidth = 20, barHeight = 30, bar_x_position = 50;

//         svg.selectAll("rect")
//             .data(data)
//             .join("rect")
//             .attr("x", bar_x_position)
//             .attr("y", (d, i) => i * barHeight)
//             .attr("width", barWidth)
//             .attr("height", barHeight)
//             .attr("fill", d => categoricalScale(d.category));


//         svg.selectAll("text").data(data).join("text")
//             .attr("x", bar_x_position + barWidth + 2)
//             .attr("y", (d, i) => (i * barHeight) + barHeight / 2).attr("alignment-baseline", "middle")
//             .text(d => d.category)
//             .style("font-size", "14px")
//             .style("fill", "black");
//     }

//     render() {
//         return (
//             <div>
//                 <svg width={200} height={300}></svg>
//             </div>
//         );
//     }
// }

// export default CategoricalColorScales;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class DivergingColorScales extends Component {
//     componentDidMount() {
//         //const data = d3.range(-25, 26); // Generates values from -25 to 25
//         const data = [-25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
//         //const cScale = d3.scaleLinear().domain([d3.min(data), d3.median(data), d3.max(data)]).range(['red','white','green'])
//         const cScale = d3.scaleDiverging(d3.interpolateRdBu).domain([d3.min(data), d3.median(data), d3.max(data)]);
//         const xScale = d3.scaleLinear().domain(d3.extent(data)).range([0, 580]);

//         const svg = d3.select("svg").append("g").attr("transform", "translate(20, 20)");

//         const barWidth = 580 / data.length + 1;

//         svg.selectAll("rect").data(data).join("rect")
//             .attr("y", 0).attr("height", 40)
//             .attr("width", barWidth)
//             .attr("x", (d) => xScale(d) - barWidth / 2) // Center the bars
//             .attr("fill", (d) => cScale(d));

//         const xAxis = d3.axisBottom(xScale).ticks(10);
//         svg.selectAll('g').data([0]).join("g").attr("transform", "translate(0, 40)").call(xAxis).selectAll('path, line').remove()
//     }

//     render() {
//         return <svg width={620} height={200}></svg>;
//     }
// }

// export default DivergingColorScales;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class SequentialColorScales extends Component {
//     componentDidMount() {
//         //const data = d3.range(0, 26);
//         const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
//         var legend_width = 280;
//         //const cScale = d3.scaleSequential(d3.interpolateRgb("gray", "black")).domain(d3.extent(data));
//         var cScale = d3.scaleLinear().domain(d3.extent(data)).range(['green', 'yellow'])
//         const xScale = d3.scaleLinear().domain([0, 25]).range([0, legend_width]);

//         const barWidth = legend_width / data.length;
//         console.log(barWidth)

//         const svg = d3.select("svg").selectAll("g").data([0]).join("g").attr("transform", "translate(20, 20)");

//         svg.selectAll("rect")
//             .data(data)
//             .join("rect")
//             .attr("x", (d) => xScale(d) - barWidth / 2)
//             .attr("y", 0)
//             .attr("height", 40)
//             .attr("width", barWidth + 1)
//             .attr("fill", (d) => cScale(d));

//         svg.selectAll(".x-axis").data([0]).join("g").attr("class", "x-axis")
//             .attr("transform", "translate(0, 40)")
//             .call(d3.axisBottom(xScale).ticks(6)).selectAll('path, line').remove()

//     }

//     render() {
//         return <svg width={620} height={100}></svg>;
//     }
// }

// export default SequentialColorScales;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {

//     componentDidMount() {

//         var data = [{ id: 0, x: 182, y: 129 }, { id: 1, x: 280, y: 105 }, { id: 2, x: 300, y: 273 }, { id: 3, x: 150, y: 250 }, { id: 4, x: 405, y: 243 }, { id: 5, x: 302, y: 188 },]

//         d3.select('svg').selectAll('circle').data(data).join('circle').attr('cx', (d) => d.x).attr('cy', (d) => d.y).attr('r', 40)

//         var drag = d3.drag().on('drag', function (e) {
//             var x_pos = +d3.select(this).attr('cx')
//             var y_pos = +d3.select(this).attr('cy')
//             d3.select(this).attr('cx', x_pos + e.dx).attr('cy', y_pos + e.dy)

//             console.log(x_pos, y_pos)
//         });

//         d3.select('svg').selectAll('circle').call(drag);
//     }

//     render() {
//         return <svg width="900" height="600"></svg>;
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             data: [{ id: 0, x: 182, y: 129 }, { id: 1, x: 315, y: 205 }, { id: 2, x: 512, y: 373 }, { id: 3, x: 124, y: 89 }, { id: 4, x: 405, y: 243 }, { id: 5, x: 302, y: 188 }, { id: 6, x: 515, y: 400 }, { id: 7, x: 220, y: 125 }, { id: 8, x: 350, y: 375 }, { id: 9, x: 150, y: 200 }, { id: 10, x: 432, y: 301 }, { id: 11, x: 124, y: 87 }, { id: 12, x: 190, y: 144 }, { id: 13, x: 478, y: 289 }, { id: 14, x: 250, y: 315 }]
//         }
//     }
//     componentDidMount() {
//         this.renderChart()
//     }
//     componentDidUpdate() {
//         this.renderChart()
//     }
//     renderChart = () => {

//         var myZoom = d3.zoom().on('zoom', (e) => {
//             d3.select('g').attr('transform', e.transform);
//         })
//         myZoom.scaleExtent([1, 3]);
//         d3.select('g').selectAll('circle').data(this.state.data).join('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 5);
//         d3.select('svg').call(myZoom);
//     }


//     render() {
//         return <svg width="600" height="600"><g></g></svg>;
//     }
// }

// export default App;


// // // IMPORTANT FOR HOMEWORK!!!!!!!
// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             selected_data: [],
//             data: [
//                 { "id": 10, "salary": 129, "name": "Alice" },
//                 { "id": 15, "salary": 205, "name": "Bob" },
//                 { "id": 20, "salary": 373, "name": "Charlie" },
//                 { "id": 30, "salary": 89, "name": "David" },
//                 { "id": 40, "salary": 243, "name": "Emma" },
//                 { "id": 50, "salary": 188, "name": "Frank" },
//                 { "id": 56, "salary": 400, "name": "Grace" },
//                 { "id": 67, "salary": 125, "name": "Hannah" },
//                 { "id": 80, "salary": 375, "name": "Ian" },
//                 { "id": 90, "salary": 200, "name": "Jack" },
//                 { "id": 100, "salary": 301, "name": "Katie" },
//                 { "id": 110, "salary": 87, "name": "Leo" },
//                 { "id": 120, "salary": 144, "name": "Mia" },
//                 { "id": 130, "salary": 289, "name": "Noah" },
//                 { "id": 140, "salary": 315, "name": "Olivia" }
//             ]

//         }
//     }
//     componentDidMount() {
//         this.renderChart()
//     }
//     componentDidUpdate() {
//         this.renderChart()
//     }

//     renderChart = () => {
//         d3.select('g').selectAll('circle').data(this.state.data).join('circle').attr('cx', d => d.id).attr('cy', d => d.salary).attr('r', 5).attr('fill', d => {
//             var selected_ids = this.state.selected_data.map(item => item.id)
//             if (selected_ids.includes(d.id))
//                 return 'red'
//             else
//                 return 'gray'
//         })

//         var brush = d3.brush().on('start brush', (e) => {
//             var filter_data = this.state.data.filter(item => {
//                 return item.id >= e.selection[0][0] && item.id <= e.selection[1][0] && item.salary >= e.selection[0][1] && item.salary <= e.selection[1][1]
//             })
//             this.setState({ selected_data: filter_data })
//         })

//         d3.select('g').call(brush)

//     }

//     render() {
//         return <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: 20 }}>
//             <svg width="200" height="420"><g></g></svg>
//             <div> {this.state.selected_data.map(item => <p>{item.name + "-----" + item.salary}</p>)}</div>
//         </div>;
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         const margin = { top: 40, right: 50, bottom: 50, left: 50 };
//         const width = 600;
//         const height = 400;
//         const innerWidth = width - margin.left - margin.right;
//         const innerHeight = height - margin.top - margin.bottom;

//         const data = [
//             { x: 1000, y: 20 }, { x: 3000, y: 40 }, { x: 5000, y: 80 },
//             { x: 1700, y: 100 }, { x: 2090, y: 60 }, { x: 3100, y: 120 }
//         ];

//         const svg = d3.select(".container").attr("width", width).attr("height", height);

//         const innerChart = svg.select(".inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);

//         const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).range([0, innerWidth]);

//         const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([innerHeight, 0]);

//         const xAxis = d3.axisBottom(xScale);
//         const yAxis = d3.axisLeft(yScale);

//         innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
//             .join("g").attr('class', 'x-axis') //we have to assign the class we use for selection
//             .attr("transform", `translate(0, ${innerHeight})`)
//             .call(xAxis);

//         innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
//             .join("g").attr('class', 'y-axis') //we have to assign the class we use for selection
//             .call(yAxis);

//         innerChart.selectAll("circle").data(data).join("circle").attr("r", 5).attr("fill", "gray")
//             .attr("cx", d => xScale(d.x)).attr("cy", d => yScale(d.y))

//         d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
//         d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");

//     }

//     render() {
//         return (
//             <svg className="container">
//                 <g className="inner_chart"></g>
//             </svg>
//         );
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         var width = 500
//         var margin = { left: 20, right: 10 }
//         var xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
//         var xAxisGenerator = d3.axisBottom(xScale);
//         d3.select("svg").selectAll("g").data([null]).join('g').attr("transform", 'translate(0,50)').call(xAxisGenerator);

//         d3.select("svg").selectAll(".tick line")
//             .attr("y1", -50)  // Extend tick lines vertically
//             .attr("stroke-dasharray", "2,2") // Dashed lines
//             .attr("stroke", "lightgray");
//     }
//     render() {
//         return (
//             <svg width="500px" height="100px"></svg>
//         );
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         var width = 500;
//         var margin = { top: 20, right: 10, bottom: 20, left: 20 };
//         const categories = ["Category A", "Category B", "Category C", "Category D"];
//         var xScale = d3.scaleBand().domain(categories).range([margin.left, width - margin.right]).padding(0.1); //padding between the bars (as a proportion of the band width)
//         var xAxisGenerator = d3.axisBottom(xScale);
//         d3.select("svg").call(xAxisGenerator);
//     }
//     render() {
//         return (
//             <svg width="500px" height="100px"></svg>
//         );
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         var width = 500
//         var margin = { left: 20, right: 10 }
//         var xScale = d3.scaleLinear().domain([0, 100]).range([margin.left, width - margin.right]);
//         var xAxisGenerator = d3.axisBottom(xScale);
//         xAxisGenerator.ticks(5);
//         xAxisGenerator.tickFormat(d => `$${d}`);
//         d3.select("svg").call(xAxisGenerator);
//         d3.select("svg").selectAll(".domain").attr("stroke", "green");
//         // d3.select("svg").selectAll("g").data([0]).join('g').attr("transform", 'translate(0,30)').call(xAxisGenerator);
//     }
//     render() {
//         return (
//             <svg width="500px" height="100px"></svg>
//         );
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         const data = [
//             { x: 50000, y: 20, level: "low" },
//             { x: 60000, y: 20, level: "medium" },
//             { x: 100000, y: 60, level: "high" },
//             { x: 100000, y: 60, level: "high2" },

//         ];

//         var linearScale = d3.scaleLinear()
//             .domain([50000, 100000])
//             .range([10, 750]);
//         console.log(linearScale(50000))

//         var ordinalScale = d3.scaleOrdinal()
//             .domain(["low", "medium", "high", "high2"])
//             .range(["green", "yellow", "red", "blue"])

//         var bandScale = d3.scaleBand()
//             .domain(["low", "medium", "high", "high2"])
//             .range([0, 400])
//             .padding(0.1);

//         d3.select('svg').selectAll("rect")
//             .data(data)
//             .join('rect')
//             .attr("x", 20)
//             .attr("y", d => bandScale(d.level))
//             .attr("width", d => linearScale(d.x))
//             .attr("height", bandScale.bandwidth())
//             .attr("fill", d => ordinalScale(d.level));
//     }

//     render() {
//         return (
//             <svg className="mysvg" width="760" height="600">
//             </svg>
//         );
//     }
// }

// export default App;

// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {
//         d3.select("circle").attr("cx", 50).attr("cy", 50).attr("r", 20) // Select the elements and define initial state (e.g., position and radius)
//             .transition().duration(1000).attr("cx", 250).attr("cy", 150)
//             .transition().duration(1000).attr("r", 50)
//             .transition().duration(1000).style("fill", "red");

//     }
//     render() {
//         return (
//             <svg className="mysvg" width="1000" height="1000">
//                 <circle cx="240" cy="250" r="50" fill="yellow" />
//             </svg>
//         );
//     }
// }
// export default App;

// class CircleVisualization extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: [
//                 { id: 1, x: 30, y: 50 },
//                 { id: 2, x: 80, y: 100 },
//                 { id: 3, x: 150, y: 30 }
//             ]
//         };
//     }

//     updateData = () => {
//         const randomNum = Math.floor(Math.random() * 5) + 1;
//         const temp_arr = [{ id: 1, x: 50, y: 70 }, { id: 2, x: 120, y: 40 }, { id: 3, x: 140, y: 70 }, { id: 4, x: 120, y: 140 }, { id: 5, x: 80, y: 70 }, { id: 6, x: 80, y: 40 }];
//         const newData = temp_arr.slice(randomNum)
//         this.setState({ data: newData });
//     };

//     componentDidMount() {
//         d3.select('.container').selectAll('circle').data(this.state.data, (d, i) => i).join('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 10).attr('fill', 'gray')
//     }

//     // componentDidUpdate() {
//     //     d3.select('.container').selectAll('circle').data(this.state.data, (d, i) => i).join('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 10).attr('fill', 'gray')
//     // }

//     componentDidUpdate() {
//         d3.select('.container').selectAll('circle').data(this.state.data, (d, i) => i).join(
//             enter => enter.append('circle').attr('cx', d => d.x).attr('cy', d => d.y).attr('r', 10).attr('fill', 'blue'),
//             update => update.attr('cx', d => d.x).attr('cy', d => d.y).attr('fill', 'green'),
//             exit => exit.remove()
//         )
//     }

//     render() {
//         return (
//             <div>
//                 <svg className={'container'} width="200" height="200"></svg>
//                 <button onClick={this.updateData}>Update Data</button>
//             </div>
//         );
//     }
// }

// export default CircleVisualization;

/* Rectangles and stuff */
// import React, { Component } from "react";
// import * as d3 from "d3";

// class App extends Component {
//     componentDidMount() {

//         const myData = [
//             { technology: "Excel", count: 1078 },
//             { technology: "Tableau", count: 852 },
//             { technology: "PowerPoint", count: 681 },
//             { technology: "R", count: 561 },
//             { technology: "Python", count: 530 }
//         ];

//         // Select all rect elements and bind the data
//         // d3.select("svg")
//         //     .selectAll("rect")
//         //     .data(myData, (d, i) => i)
//         //     .join(
//         //         enter => enter.append('rect').attr('x', 50).attr('y', (d, i) => {
//         //             return i * 25;
//         //         })
//         //             .attr('height', 20)
//         //             .attr('width', (d, i) => d.count)
//         //             .attr('fill', 'red'),
//         //         update => update.attr('x', 50).attr('y', (d, i) => {
//         //             return i * 25;
//         //         })
//         //             .attr('height', 20)
//         //             .attr('width', (d, i) => d.count)
//         //             .attr('fill', 'gray'),
//         //         exit => exit.remove()
//         //     );

//         d3.select("svg")
//             .selectAll("rect")
//             .data(myData, (d, i) => i)
//             .join('rect')
//             .attr('x', 50)
//             .attr('y', (d, i) => {
//                 return i * 25;
//             })
//             .attr('height', 20)
//             .attr('width', (d, i) => d.count)
//             .attr('fill', 'gray')

//         // Update rect attributes based on the bound data

//     }

//     render() {
//         return (
//             <div className="responsive-svg-container">
//                 <svg viewBox="0 0 1200 1600">
//                     <rect></rect>
//                     <rect></rect>
//                     <rect></rect>
//                     <rect></rect>
//                     <rect></rect>
//                     <rect></rect>
//                     <rect></rect>
//                 </svg>
//             </div>
//         );
//     }
// }

// export default App;

//Using d3 to select and edit SVG
// class App extends Component {
//     componentDidMount() {

//         // Select the first circle element and set its fill color to red
//         // d3.select('circle').attr('fill', 'red')


//         // Select all circle elements and set their fill color to red
//         // d3.selectAll('circle').attr('fill', 'black')


//         // Select all elements with the class name "c3" and set their fill color to red
//         // d3.selectAll('.c3').attr('fill', 'red')

//         // Select the element with the id "c_id4" and set its fill color to red
//         // d3.selectAll('#c_id4').attr('fill', 'yellow')

//         // d3.select('.mysvg').selectAll('circle').remove()
//         // d3.select('.mysvg').append('circle').attr('Enter stuff here')

//         var original_color
//         d3.selectAll('circle')
//             .on('mouseover', function () {
//                 original_color = d3.select(this).attr('fill')
//                 d3.select(this).attr('fill', 'orange');
//             })

//             .on('mouseleave', function () {
//                 d3.select(this).attr('fill', original_color);
//             });

//     }

//     render() {
//         return (
//             <div>
//                 <svg className="mysvg" width="760" height="400">
//                     <circle cx="120" cy="70" r="50" fill="steelblue" />
//                     <circle cx="240" cy="70" r="50" fill="steelblue" />
//                     <circle className="c3" cx="120" cy="250" r="50" fill="gray" />
//                     <circle id="c_id4" cx="240" cy="250" r="50" fill="gray" />
//                 </svg>

//                 <svg className="mysvg2" width="760" height="400">
//                     <circle cx="120" cy="70" r="50" fill="green" />
//                     <circle cx="240" cy="70" r="50" fill="green" />
//                     <circle className="c3" cx="120" cy="250" r="50" fill="gray" />
//                     <circle id="c_id4" cx="240" cy="250" r="50" fill="gray" />
//                 </svg>
//             </div>
//         );
//     }
// }

// export default App;

//For SVG
// class App extends Component {

//     render() {
//         return (
//             <div>
//                 {/* <svg x="0" width="200" height="200">
//                     <line x1="50" y1="50" x2="150" y2="150" stroke="blue" strokeWidth="2" />
//                 </svg> */}

//                 {/* <svg x="500" width="500" height="500">
//                     <rect x="30 " y="30" width="200" height="100" fill="blue" stroke="black" strokeWidth="2" rx="5" ry="5" />
//                 </svg> */}

//                 {/* <svg x="400" width="100" height="100">
//                     <circle cx="50" cy="50" r="40" fill="red" stroke="black" stroke-width="3" />
//                 </svg> */}

//                 {/* <svg width="200" height="100">
//                     <text x="100" y="20" text-anchor="start" stroke="black" fill="black">Start</text>
//                     <text x="100" y="50" text-anchor="middle" stroke="black" fill="black">Middle</text>
//                     <text x="100" y="80" text-anchor="end" stroke="black" fill="black">End</text>
//                     <line x1="100" y1="0" x2="100" y2="100" stroke="red" stroke-dasharray="5,5" />
//                 </svg> */}

//                 {/* <svg width="200" height="200">
//                     <text x="100" y="100" transform="rotate(90, 100, 100)">Rotated Text</text>
//                 </svg> */}

//                 <svg width="200" height="200">
//                     <g fill="blue" transform="translate(50,50)">
//                         <rect x="0" y="0" width="50" height="50" />
//                         <circle cx="75" cy="25" r="25" />
//                     </g>
//                 </svg>
//             </div>
//         );
//     }
// }
// export default App;

// import React, { Component } from 'react';
// class Counter extends React.Component {
//   constructor() {
//     super()

//     this.state = { input_value: "" };

//   }
//   update_input_val = (val) => {
//     this.setState({ input_value: val.target.value })
//   }

//   render() {
//     return (
//       <div>
//         <p>Enter your name: </p>
//         <input type='text' onChange={this.update_input_val} />
//         <p>{this.state.input_value}</p>
//       </div>
//     );
//   }
// }

// export default Counter


