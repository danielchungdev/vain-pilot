<template>
    <h3>{{this.$props.charttitle}}</h3>
    <div class="histogram" :id="dataset"></div>
</template>
<script>
import * as d3 from 'd3';
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default {
    props: {
        dataset: {
            type: String,
            required: true
        },
        charttitle: {
            type: String,
            required: true
        }
    },
    mounted() {
        switch (this.$props.dataset) {
            case "counttype":
                this.generateTypeCountChart();
                return;
            case "countsubject":
                this.generateSubjectCountChart();
                return;
            case "countyear":
                this.generateYearCountChart();
                return;
            case "countauthorship":
                this.generateAuthorshipCountChart();
                return;
        }
    },
    methods: {
        generateTypeCountChart() {
            const margin = {top: 10, right: 30, bottom: 70, left: 40},
            width = 900 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

            const svg = d3.select(`#counttype`)
                .append('svg')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                        `translate(${margin.left},${margin.top})`);
            
            d3.json('http://localhost:5000/reports/type').then((data) => {

                // sort data
                data.sort(function(b, a) {
                    return a.count - b.count;
                });

                // X axis
                var x = d3.scaleBand()
                    .range([ 0, width ])
                    .domain(data.map(function(d) { return d.type; }))
                    .padding(0.2);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, 1400])
                    .range([ height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // add labels to axis
                var div = d3.select("body")
                    .append("div")
                    .attr("class", "tool-tip")
                    .style("opacity", 0)
                    .text("a simple tooltip");

                // Bars
                svg.selectAll("mybar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function(d) {return x(d.type); })
                    .attr("y", function(d) {return y(d.count); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.count); })
                    .attr("fill", getRandomColor())
                    .on("mouseenter", function(d) {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 0.5);

                        let count = (d.target.__data__.count).toString();
                        
                        div.transition()
                        .duration(50)
                        .style("opacity", 1)
                        .text(count)
                        .style("left", (d.pageX + 10) + "px")
                        .style("top", (d.pageY - 15) + "px");
                    
                        
                    })
                    .on("mouseout", function() {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 1);

                        div.transition()
                        .duration(50)
                        .style("opacity", 0);
                    })

            });
        },
        generateSubjectCountChart() {
            const margin = {top: 10, right: 30, bottom: 70, left: 40},
            width = 900 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

            const svg = d3.select(`#countsubject`)
                .append('svg')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                        `translate(${margin.left},${margin.top})`);
            
            d3.json('http://localhost:5000/reports/subject').then((data) => {

                // sort data
                data.sort(function(b, a) {
                    return a.count - b.count;
                });

                // X axis
                var x = d3.scaleBand()
                    .range([ 0, width ])
                    .domain(data.map(function(d) { return d.subject; }))
                    .padding(0.2);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, 1400])
                    .range([ height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // add labels to axis
                 var div = d3.select("body")
                    .append("div")
                    .attr("class", "tool-tip")
                    .style("opacity", 0)
                    .text("a simple tooltip");

                // Bars
                svg.selectAll("mybar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function(d) { return x(d.subject); })
                    .attr("y", function(d) { return y(d.count); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.count); })
                    .attr("fill", getRandomColor())
                    .on("mouseenter", function(d) {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 0.5);

                        let count = (d.target.__data__.count).toString();
                        
                        div.transition()
                        .duration(50)
                        .style("opacity", 1)
                        .text(count)
                        .style("left", (d.pageX + 10) + "px")
                        .style("top", (d.pageY - 15) + "px");
                    
                        
                    })
                    .on("mouseout", function() {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 1);

                        div.transition()
                        .duration(50)
                        .style("opacity", 0);
                    })

            });
        },
        generateYearCountChart() {
            const margin = {top: 10, right: 30, bottom: 70, left: 40},
            width = 900 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

            const svg = d3.select(`#countyear`)
                .append('svg')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                        `translate(${margin.left},${margin.top})`);
            
            d3.json('http://localhost:5000/reports/year').then((data) => {

                // sort data
                data.sort(function(b, a) {
                    return a.count - b.count;
                });

                // X axis
                var x = d3.scaleBand()
                    .range([ 0, width ])
                    .domain(data.map(function(d) { return d.year; }))
                    .padding(0.2);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, 100])
                    .range([ height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // add labels to axis
                 var div = d3.select("body")
                    .append("div")
                    .attr("class", "tool-tip")
                    .style("opacity", 0)
                    .text("a simple tooltip");

                // Bars
                svg.selectAll("mybar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function(d) { return x(d.year); })
                    .attr("y", function(d) { return y(d.count); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.count); })
                    .attr("fill", getRandomColor())
                    .on("mouseenter", function(d) {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 0.5);

                        let count = (d.target.__data__.count).toString();
                        
                        div.transition()
                        .duration(50)
                        .style("opacity", 1)
                        .text(count)
                        .style("left", (d.pageX + 10) + "px")
                        .style("top", (d.pageY - 15) + "px");
                    
                        
                    })
                    .on("mouseout", function() {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 1);

                        div.transition()
                        .duration(50)
                        .style("opacity", 0);
                    })

            });
        },
        generateAuthorshipCountChart() {
            const margin = {top: 10, right: 30, bottom: 70, left: 40},
            width = 900 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

            const svg = d3.select(`#countauthorship`)
                .append('svg')
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                .append("g")
                    .attr("transform",
                        `translate(${margin.left},${margin.top})`);
            
            d3.json('http://localhost:5000/reports/authorship').then((data) => {

                // sort data
                data.sort(function(b, a) {
                    return a.count - b.count;
                });

                // X axis
                var x = d3.scaleBand()
                    .range([ 0, width ])
                    .domain(data.map(function(d) { return d.authorship; }))
                    .padding(0.2);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, 1400])
                    .range([ height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // add labels to axis
                 var div = d3.select("body")
                    .append("div")
                    .attr("class", "tool-tip")
                    .style("opacity", 0)
                    .text("a simple tooltip");

                // Bars
                svg.selectAll("mybar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function(d) { return x(d.authorship); })
                    .attr("y", function(d) { return y(d.count); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.count); })
                    .attr("fill", getRandomColor())
                    .on("mouseenter", function(d) {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 0.5);

                        let count = (d.target.__data__.count).toString();
                        
                        div.transition()
                        .duration(50)
                        .style("opacity", 1)
                        .text(count)
                        .style("left", (d.pageX + 10) + "px")
                        .style("top", (d.pageY - 15) + "px");
                    
                        
                    })
                    .on("mouseout", function() {
                        d3.select(this)
                        .transition()
                        .duration(500)
                        .attr('opacity', 1);

                        div.transition()
                        .duration(50)
                        .style("opacity", 0);
                    })

            });
        }
    }
}
</script>
<style>
div.tool-tip {
    position: absolute;
    text-align: center;
    padding: .5rem;
    background: #FFFFFF;
    color: #313639;
    border: 1px solid #313639;
    border-radius: 8px;
    pointer-events: none;
    font-size: 1.3rem;
}
</style>