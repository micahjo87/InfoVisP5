// Your browser will call the onload() function when the document
// has finished loading. In this case, onload() points to the
// start() method we defined below. Because of something called
// function hoisting, the start() method is callable on line 6
// even though it is defined on line 8.
window.onload = start;

// This is where all of our javascript code resides. This method
// is called by "window" when the document (everything you see on
// the screen) has finished loading.
function start() {
    // Select the graph from the HTML page and save
    // a reference to it for later.
    var container = document.getElementById('container');

    var margin = {top: 20, right: 80, bottom: 30, left: 40},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    var svg = d3.select(container)
        .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " +(width+ margin.left + margin.right)+ " " +(height+ margin.left + margin.right))
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .classed("svg-content", true);

    var colorScale = d3.scale.category10();
    var chem = true,
        econ = true,
        lit = true,
        med = true,
        peace = true,
        phys = true

    d3.select(container).selectAll("input")
    .data(["Chemistry", "Economics", "Literature", "Medicine", "Peace", "Physics"])
    .enter()
    .append('label')
    .text(function(d) { return d; })
    .append("input")
        .attr("checked", true)
        .attr("type", "checkbox")
        .attr("id", function(d,i) { return 'a'+i; });

    d3.select("input[id='a0']").on("click", function () {
        chem = !chem
    });
    d3.select("input[id='a1']").on("click", function () {
        econ = !econ
    });
    d3.select("input[id='a2']").on("click", function () {
        lit = !lit
    });
    d3.select("input[id='a3']").on("click", function () {
        med = !med
    });
    d3.select("input[id='a4']").on("click", function () {
        peace = !peace
    });
    d3.select("input[id='a5']").on("click", function () {
        phys = !phys
    });


    
    d3.csv('nobel_laureates.csv', function(d) {
        d.year = +d.year;
        d.age = +d.age;
        return d;
    }, function(error, data) {

        var yearsExtent = d3.extent(data, d => d.year);
        var ageExtent = d3.extent(data, d => d.age);

        var xScale = d3.scale.linear()
            .domain([1900, 2015])
            .range([30, width])

        var yScale = d3.scale.linear()
        .domain([15, 95])
        .range([height, 0])


        // svg.selectAll('dot')
        //     .data(data)
        //     .enter().append("circle")
        //     .attr("class", "dot")
        //     // .filter(function(d){
        //     //     return d.category == "economics" || d.category == "chemistry";
        //     // })
        //     .attr("r", 3)
        //     .attr("cy", height + 40)
        //     .attr("cx", d => xScale(d.year))
        //     .style("fill", d => colorScale(d.category))

        svg.selectAll('dot')
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .filter(function(d){
                if (chem == true) {
                    chemfilter = d.category == "chemistry"
                }
                if (econ == true) {
                    econfilter = d.category == "economics"
                }
                if (lit == true) {
                    litfilter = d.category == "literature"
                }
                if (med == true) {
                    medfilter = d.category == "medicine"
                }
                if (peace == true) {
                    peacefilter = d.category == "peace"
                }
                if (phys == true) {
                    physfilter = d.category == "physics"
                }
                return chemfilter || econfilter || litfilter || medfilter || peacefilter || physfilter;
            })
            .attr("r", 3)
            .attr("cy", d => yScale(d.age))
            .attr("cx", d => xScale(d.year))
            .style("fill", d => colorScale(d.category))


        var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
            .ticks(20)
            .tickSize(1)
            .tickFormat(d3.format("d"));
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," +height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", 500)
            .attr("y", 30)
            .style("text-anchor", "end")
            .text("Year");

        var yAxis = d3.svg.axis().scale(yScale).orient("left")
            .ticks(20)
            .tickSize(1)
            .tickFormat(d3.format("d"));
        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(30,0)")
            .call(yAxis)
          .append("text")
            .attr("class", "label")
            .text("Age")
            .attr("transform", "translate(30, 0), rotate(-90)")
            .style("text-anchor", "end")

        var legend = svg.append("g")
            .attr("transform", `translate(${width + 120}, 0)`)
            .selectAll(".legend")
            .data(colorScale.domain())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(0, ${i * 20})`);

        // draw legend colored rectangles
        legend.append("rect")
            .attr("x", -18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", colorScale);

        // draw legend text
        legend.append("text")
            .attr("x", -24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(d => d)
    });
}
