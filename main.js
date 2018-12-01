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
    cwidth = 1000 - margin.left - margin.right,
    cheight = 600 - margin.top - margin.bottom;

    var divScatter = d3.select(container).append("div")
            .attr("class", "scattertip")
            .style("opacity", 0);

    var svg2 = d3.select(container)
        .append('svg')
        .attr("id", "scatterSVG")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " +(cwidth+ margin.left + margin.right)+ " " +(cheight+ margin.top + margin.bottom))
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .classed("svg-content", true);

    var colorScale = d3.scale.category10();
    var chem = true,
        econ = true,
        lit = true,
        med = true,
        peace = true,
        phys = true,
        male = true,
        female = true
        share1 = true,
        share2 = true,
        share3 = true,
        share4 = true;

    // var checkbox = d3.select(".checkboxWrapper");
    //
    // var box = checkbox.selectAll(".checkbox")
    //     .data(["Chemistry", "Economics", "Literature", "Medicine", "Peace", "Physics", "Male", "Female", "Share: 1", "Share: 2", "Share: 3", "Share: 4"])
    //     .enter()
    //     .append("div")
    //     .attr("class", "checkboxes")
    //
    // box.append("input")
    //     .attr("checked", true)
    //     .attr("type", "checkbox")
    //     .attr("id", function(d,i) { return 'a'+i; });
    // box.append("label")
    //     .text(function(d) { return d; })

    var checkbox1 = document.getElementById("checkboxes1")
    var box1 = d3.select(checkbox1).selectAll("input").data(["Chemistry", "Economics", "Literature", "Medicine", "Peace", "Physics"]);
    var label1 = box1.enter()
        .append('label')
            .attr("class", "cat")
        .append("input")
            .attr("checked", true)
            .attr("type", "checkbox")
            .attr("id", function(d,i) { return 'a'+i; });

    d3.selectAll(".cat")
        .data(["Chemistry", "Economics", "Literature", "Medicine", "Peace", "Physics", "Male", "Female", "Share: 1", "Share: 2", "Share: 3", "Share: 4"])
        .append("text")
        .text(function(d) { return d; });

    var checkbox2 = document.getElementById("checkboxes2")
    var box2 = d3.select(checkbox2).selectAll("input").data(["Male", "Female"]);
    var label2 = box2.enter()
        .append('label')
            .attr("class", "gender")
        .append("input")
            .attr("checked", true)
            .attr("type", "checkbox")
            .attr("id", function(d,i) { return 'a'+(6+i); });

    d3.selectAll(".gender")
        .data(["Male", "Female"])
        .append("text")
        .text(function(d) { return d; });

    var checkbox3 = document.getElementById("checkboxes3")
    var box3 = d3.select(checkbox3).selectAll("input").data(["Share: 1", "Share: 2", "Share: 3", "Share: 4"]);
    var label3 = box3.enter()
        .append('label')
            .attr("class", "share")
        .append("input")
            .attr("checked", true)
            .attr("type", "checkbox")
            .attr("id", function(d,i) { return 'a'+(8+i); });

    d3.selectAll(".share")
        .data(["Share: 1", "Share: 2", "Share: 3", "Share: 4"])
        .append("text")
        .text(function(d) { return d; });


    var graph = document.getElementById('graph');

    var width = 1500, height = 500;


    var svg = d3.select(graph)
        .append('svg')
        .attr("id", "circleSVG")
        .attr('width', width)
        .attr('height', height);

    var div = d3.select(graph).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var buttongroup = document.getElementById('buttongroup');

    d3.select(buttongroup)
        .append('button')
        .text('Category')
        .on('click', function() {
            getCategoryWrap();
        });
    d3.select(buttongroup)
        .append('button')
        .text('Gender')
        .on('click', function() {
            getGenderWrap();
        });
    d3.select(buttongroup)
        .append('button')
        .text('Share')
        .on('click', function() {
            getShareWrap();
        });

    function getCategoryWrap() {
        d3.csv('nobel_laureates.csv', function(d) {
            return {
                fullname : d.fullname,
                motivation : d.motivation,
                share : +d.share,
                born : new Date(d.born),
                year : +d.year,
                age : +d.age,
                born_city : d.born_city,
                born_country : d.born_country,
                died : d.died,
                is_alive : d.is_alive,
                category : d.category,
                gender : d.gender,
                affiliation : d.affiliation,
                affiliation_city : d.affiliation_city,
                affiliation_country : d.affiliation_country
            }
        }, function(error, data) {
            getCategory(data);
        });
    }

    function getGenderWrap() {
        d3.csv('nobel_laureates.csv', function(d) {
            return {
                fullname : d.fullname,
                motivation : d.motivation,
                share : +d.share,
                born : new Date(d.born),
                year : +d.year,
                age : +d.age,
                born_city : d.born_city,
                born_country : d.born_country,
                died : d.died,
                is_alive : d.is_alive,
                category : d.category,
                gender : d.gender,
                affiliation : d.affiliation,
                affiliation_city : d.affiliation_city,
                affiliation_country : d.affiliation_country
            }
        }, function(error, data) {
            getGender(data);
        });
    }

    function getShareWrap() {
        d3.csv('nobel_laureates.csv', function(d) {
            return {
                fullname : d.fullname,
                motivation : d.motivation,
                share : +d.share,
                born : new Date(d.born),
                year : +d.year,
                age : +d.age,
                born_city : d.born_city,
                born_country : d.born_country,
                died : d.died,
                is_alive : d.is_alive,
                category : d.category,
                gender : d.gender,
                affiliation : d.affiliation,
                affiliation_city : d.affiliation_city,
                affiliation_country : d.affiliation_country
            }
        }, function(error, data) {
            getShare(data);
        });
    }

    function getCategory(d) {
        d3.selectAll("#circleSVG > *").remove();
        var nodeData = [];
        var prizesByCategory = d3.nest().key(function(d) {
            return d.category;
        }).rollup(function(v) {
            return v.length;
        }).entries(d);
        nodeData.push({rad: prizesByCategory[0].values, col: "steelblue", txt: prizesByCategory[0].key});
        nodeData.push({rad: prizesByCategory[1].values, col: "orange", txt: prizesByCategory[1].key});
        nodeData.push({rad: prizesByCategory[2].values, col: "forestgreen", txt: prizesByCategory[2].key});
        nodeData.push({rad: prizesByCategory[3].values, col: "red", txt: prizesByCategory[3].key});
        nodeData.push({rad: prizesByCategory[4].values, col: "mediumpurple", txt: prizesByCategory[4].key});
        nodeData.push({rad: prizesByCategory[5].values, col: "sienna", txt: prizesByCategory[5].key});

        var n = nodeData.length;

        var force = d3.layout.force()
            .gravity(0.05)
            .distance(100)
            .charge(-100)
            .size([width, height]);

        var nodes = d3.range(n).map(function(i) {
          var r = nodeData[i].rad * 0.2,
              d = {radius: r, col: nodeData[i].col, txt: nodeData[i].txt, total: nodeData[i].rad};
          return d;
        });

          force
              .nodes(nodes)
              .start();

          var node = svg.selectAll(".node")
              .data(nodes)
            .enter().append("g")
              .attr("class", "node")
              .call(force.drag);

          node.on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html(d.total + " laureates" + "<br/>"  + Math.round(((d.total / 869) * 100) * 10) / 10 + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                });

            node.on("click", function(d) {
                if (d.txt == "chemistry") {
                    chem = true
                    econ = false
                    lit = false
                    med = false
                    peace = false
                    phys = false
                    female = true
                    male = true
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", true);
                    d3.select("input[id='a1']").property("checked", false);
                    d3.select("input[id='a2']").property("checked", false);
                    d3.select("input[id='a3']").property("checked", false);
                    d3.select("input[id='a4']").property("checked", false);
                    d3.select("input[id='a5']").property("checked", false);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                } else if (d.txt == "economics"){
                    econ = true
                    chem = false
                    lit = false
                    med = false
                    peace = false
                    phys = false
                    female = true
                    male = true
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", false);
                    d3.select("input[id='a1']").property("checked", true);
                    d3.select("input[id='a2']").property("checked", false);
                    d3.select("input[id='a3']").property("checked", false);
                    d3.select("input[id='a4']").property("checked", false);
                    d3.select("input[id='a5']").property("checked", false);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                } else if (d.txt == "literature"){
                    lit = true
                    chem = false
                    econ = false
                    med = false
                    peace = false
                    phys = false
                    female = true
                    male = true
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", false);
                    d3.select("input[id='a1']").property("checked", false);
                    d3.select("input[id='a2']").property("checked", true);
                    d3.select("input[id='a3']").property("checked", false);
                    d3.select("input[id='a4']").property("checked", false);
                    d3.select("input[id='a5']").property("checked", false);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                } else if (d.txt == "medicine"){
                    med = true
                    chem = false
                    econ = false
                    lit = false
                    peace = false
                    phys = false
                    female = true
                    male = true
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", false);
                    d3.select("input[id='a1']").property("checked", false);
                    d3.select("input[id='a2']").property("checked", false);
                    d3.select("input[id='a3']").property("checked", true);
                    d3.select("input[id='a4']").property("checked", false);
                    d3.select("input[id='a5']").property("checked", false);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                } else if (d.txt == "peace"){
                    peace = true
                    chem = false
                    econ = false
                    lit = false
                    med = false
                    phys = false
                    female = true
                    male = true
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", false);
                    d3.select("input[id='a1']").property("checked", false);
                    d3.select("input[id='a2']").property("checked", false);
                    d3.select("input[id='a3']").property("checked", false);
                    d3.select("input[id='a4']").property("checked", true);
                    d3.select("input[id='a5']").property("checked", false);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                } else {
                    phys = true
                    chem = false
                    econ = false
                    lit = false
                    med = false
                    peace = false
                    female = true
                    male = true
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", false);
                    d3.select("input[id='a1']").property("checked", false);
                    d3.select("input[id='a2']").property("checked", false);
                    d3.select("input[id='a3']").property("checked", false);
                    d3.select("input[id='a4']").property("checked", false);
                    d3.select("input[id='a5']").property("checked", true);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                }

                placeDots();
            });

          node.append("circle")
              .style("fill", function(d) {
                return d.col;
              })
              .attr("r", function(d) {
                return d.radius;
              });

          node.append("text")
              .attr("text-anchor", "middle")
              .text(function(d) { return d.txt });

          force.on("tick", function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
    }

    function getGender(d) {
        d3.selectAll("#circleSVG > *").remove();
        var nodeData = [];
        var gender = d3.nest().key(function(d) {
            return d.gender;
        }).rollup(function(v) {
            return v.length;
        }).entries(d);
        nodeData.push({rad: gender[0].values, col: "blue", txt: gender[0].key});
        nodeData.push({rad: gender[1].values, col: "pink", txt: gender[1].key});
        var n = nodeData.length;

        var force = d3.layout.force()
            .gravity(0.05)
            .distance(100)
            .charge(-200)
            .size([width, height]);

        var nodes = d3.range(n).map(function(i) {
          var r = nodeData[i].rad * 0.2,
              d = {radius: r, col: nodeData[i].col, txt: nodeData[i].txt, total: nodeData[i].rad};
          return d;
        });

          force
              .nodes(nodes)
              .start();

          var node = svg.selectAll(".node")
              .data(nodes)
            .enter().append("g")
              .attr("class", "node")
              .call(force.drag);

          node.on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html(d.total + " laureates" + "<br/>"  + Math.round(((d.total / 869) * 100) * 10) / 10 + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                });

            node.on("click", function(d) {
                if (d.txt == "male") {
                    chem = true
                    econ = true
                    lit = true
                    med = true
                    peace = true
                    phys = true
                    female = false
                    male = true
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", true);
                    d3.select("input[id='a1']").property("checked", true);
                    d3.select("input[id='a2']").property("checked", true);
                    d3.select("input[id='a3']").property("checked", true);
                    d3.select("input[id='a4']").property("checked", true);
                    d3.select("input[id='a5']").property("checked", true);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", false);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                } else if (d.txt == "female"){
                    chem = true
                    econ = true
                    lit = true
                    med = true
                    peace = true
                    phys = true
                    female = true
                    male = false
                    share1 = true
                    share2 = true
                    share3 = true
                    share4 = true
                    d3.select("input[id='a0']").property("checked", true);
                    d3.select("input[id='a1']").property("checked", true);
                    d3.select("input[id='a2']").property("checked", true);
                    d3.select("input[id='a3']").property("checked", true);
                    d3.select("input[id='a4']").property("checked", true);
                    d3.select("input[id='a5']").property("checked", true);
                    d3.select("input[id='a6']").property("checked", false);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", true);
                }
                placeDots();
            });

          node.append("circle")
              .style("fill", function(d) {
                return d.col;
              })
              .attr("r", function(d) {
                return d.radius;
              });

          node.append("text")
              .attr("text-anchor", "middle")
              .text(function(d) { return d.txt });

          force.on("tick", function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
    }

    function getShare(d) {
        d3.selectAll("#circleSVG > *").remove();
        var nodeData = [];
        var share = d3.nest().key(function(d) {
            return d.share;
        }).rollup(function(v) {
            return v.length;
        }).entries(d);
        nodeData.push({rad: share[0].values, col: "green", txt: share[0].key});
        nodeData.push({rad: share[1].values, col: "orange", txt: share[1].key});
        nodeData.push({rad: share[2].values, col: "red", txt: share[2].key});
        nodeData.push({rad: share[3].values, col: "pink", txt: share[3].key});
        var n = nodeData.length;

        var force = d3.layout.force()
            .gravity(0.05)
            .distance(100)
            .charge(-200)
            .size([width, height]);

        var nodes = d3.range(n).map(function(i) {
          var r = nodeData[i].rad * 0.2,
              d = {radius: r, col: nodeData[i].col, txt: nodeData[i].txt, total: nodeData[i].rad};
          return d;
        });

          force
              .nodes(nodes)
              .start();

          var node = svg.selectAll(".node")
              .data(nodes)
            .enter().append("g")
              .attr("class", "node")
              .call(force.drag);

          node.on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html(d.total + " laureates" + "<br/>"  + Math.round(((d.total / 869) * 100) * 10) / 10 + "%")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                });

            node.on("click", function(d) {
                console.log(d.txt)
                if (d.txt == "1") {
                    chem = true
                    econ = true
                    lit = true
                    med = true
                    peace = true
                    phys = true
                    female = true
                    male = true
                    share1 = true
                    share2 = false
                    share3 = false
                    share4 = false
                    d3.select("input[id='a0']").property("checked", true);
                    d3.select("input[id='a1']").property("checked", true);
                    d3.select("input[id='a2']").property("checked", true);
                    d3.select("input[id='a3']").property("checked", true);
                    d3.select("input[id='a4']").property("checked", true);
                    d3.select("input[id='a5']").property("checked", true);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", true);
                    d3.select("input[id='a9']").property("checked", false);
                    d3.select("input[id='a10']").property("checked", false);
                    d3.select("input[id='a11']").property("checked", false);
                } else if (d.txt == "2"){
                    chem = true
                    econ = true
                    lit = true
                    med = true
                    peace = true
                    phys = true
                    female = true
                    male = true
                    share1 = false
                    share2 = true
                    share3 = false
                    share4 = false
                    d3.select("input[id='a0']").property("checked", true);
                    d3.select("input[id='a1']").property("checked", true);
                    d3.select("input[id='a2']").property("checked", true);
                    d3.select("input[id='a3']").property("checked", true);
                    d3.select("input[id='a4']").property("checked", true);
                    d3.select("input[id='a5']").property("checked", true);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", false);
                    d3.select("input[id='a9']").property("checked", true);
                    d3.select("input[id='a10']").property("checked", false);
                    d3.select("input[id='a11']").property("checked", false);
                } else if (d.txt == "3"){
                    chem = true
                    econ = true
                    lit = true
                    med = true
                    peace = true
                    phys = true
                    female = true
                    male = true
                    share1 = false
                    share2 = false
                    share3 = true
                    share4 = false
                    d3.select("input[id='a0']").property("checked", true);
                    d3.select("input[id='a1']").property("checked", true);
                    d3.select("input[id='a2']").property("checked", true);
                    d3.select("input[id='a3']").property("checked", true);
                    d3.select("input[id='a4']").property("checked", true);
                    d3.select("input[id='a5']").property("checked", true);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", false);
                    d3.select("input[id='a9']").property("checked", false);
                    d3.select("input[id='a10']").property("checked", true);
                    d3.select("input[id='a11']").property("checked", false);
                } else if (d.txt == "4"){
                    chem = true
                    econ = true
                    lit = true
                    med = true
                    peace = true
                    phys = true
                    female = true
                    male = true
                    share1 = false
                    share2 = false
                    share3 = false
                    share4 = true
                    d3.select("input[id='a0']").property("checked", true);
                    d3.select("input[id='a1']").property("checked", true);
                    d3.select("input[id='a2']").property("checked", true);
                    d3.select("input[id='a3']").property("checked", true);
                    d3.select("input[id='a4']").property("checked", true);
                    d3.select("input[id='a5']").property("checked", true);
                    d3.select("input[id='a6']").property("checked", true);
                    d3.select("input[id='a7']").property("checked", true);
                    d3.select("input[id='a8']").property("checked", false);
                    d3.select("input[id='a9']").property("checked", false);
                    d3.select("input[id='a10']").property("checked", false);
                    d3.select("input[id='a11']").property("checked", true);
                }
                placeDots();
            });

          node.append("circle")
              .style("fill", function(d) {
                return d.col;
              })
              .attr("r", function(d) {
                return d.radius;
              });

          node.append("text")
              .attr("text-anchor", "middle")
              .text(function(d) { return d.txt });

          force.on("tick", function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });
    }

    d3.csv('nobel_laureates.csv', function(d) {
        return {
            fullname : d.fullname,
            motivation : d.motivation,
            share : +d.share,
            born : new Date(d.born),
            year : +d.year,
            age : +d.age,
            born_city : d.born_city,
            born_country : d.born_country,
            died : d.died,
            is_alive : d.is_alive,
            category : d.category,
            gender : d.gender,
            affiliation : d.affiliation,
            affiliation_city : d.affiliation_city,
            affiliation_country : d.affiliation_country
        }
    }, function(error, data) {
        getCategory(data);

        var yearsExtent = d3.extent(data, d => d.year);
        var ageExtent = d3.extent(data, d => d.age);

        var xScale = d3.scale.linear()
            .domain([1900, 2015])
            .range([30, cwidth])

        var yScale = d3.scale.linear()
        .domain([15, 95])
        .range([cheight, 30])

        d3.select("input[id='a0']").on("change", function () {
            chem = !chem
            placeDots();
        });
        d3.select("input[id='a1']").on("change", function () {
            econ = !econ
            placeDots();
        });
        d3.select("input[id='a2']").on("change", function () {
            lit = !lit
            placeDots();
        });
        d3.select("input[id='a3']").on("change", function () {
            med = !med
            placeDots();
        });
        d3.select("input[id='a4']").on("change", function () {
            peace = !peace
            placeDots();
        });
        d3.select("input[id='a5']").on("change", function () {
            phys = !phys
            placeDots();
        });
        d3.select("input[id='a6']").on("change", function () {
            male = !male
            placeDots();
        });
        d3.select("input[id='a7']").on("change", function () {
            female = !female
            placeDots();
        });
        d3.select("input[id='a8']").on("change", function () {
            share1 = !share1
            placeDots();
        });
        d3.select("input[id='a9']").on("change", function () {
            share2 = !share2
            placeDots();
        });
        d3.select("input[id='a10']").on("change", function () {
            share3 = !share3
            placeDots();
        });
        d3.select("input[id='a11']").on("change", function () {
            share4 = !share4
            placeDots();
        });

        placeDots();

        function placeDots() {

            var chemfilter, econfilter, litfilter, medfilter, peacefilter, physfilter, malefilter, femalefilter, s1filter, s2filter, s3filter, s4filter;

            svg2.selectAll("circle").remove();

            var circ = svg2.selectAll('dot')
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .filter(function(d){
                    if (chem == true) {
                        chemfilter = d.category == "chemistry"
                    } else {
                        chemfilter = d.category == ""
                    }
                    if (econ == true) {
                        econfilter = d.category == "economics"
                    } else {
                        econfilter = d.category == ""
                    }
                    if (lit == true) {
                        litfilter = d.category == "literature"
                    } else {
                        litfilter = d.category == ""
                    }
                    if (med == true) {
                        medfilter = d.category == "medicine"
                    } else {
                        medfilter = d.category == ""
                    }
                    if (peace == true) {
                        peacefilter = d.category == "peace"
                    } else {
                        peacefilter = d.category == ""
                    }
                    if (phys == true) {
                        physfilter = d.category == "physics"
                    } else {
                        physfilter = d.category == ""
                    }
                    if (female == true) {
                        femalefilter = d.gender == "female"
                    } else {
                        femalefilter = d.gender == ""
                    }
                    if (male == true) {
                        malefilter = d.gender == "male"
                    } else {
                        malefilter = d.gender == ""
                    }
                    if (share1 == true) {
                        s1filter = d.share == "1"
                    } else {
                        s1filter = d.share == ""
                    }
                    if (share2 == true) {
                        s2filter = d.share == "2"
                    } else {
                        s2filter = d.share == ""
                    }
                    if (share3 == true) {
                        s3filter = d.share == "3"
                    } else {
                        s3filter = d.share == ""
                    }
                    if (share4 == true) {
                        s4filter = d.share == "4"
                    } else {
                        s4filter = d.share == ""
                    }
                    return (chemfilter || econfilter || litfilter || medfilter || peacefilter || physfilter) && (femalefilter || malefilter) && (s1filter || s2filter || s3filter || s4filter);
                })
                .attr("r", 3)
                .attr("cy", d => yScale(d.age))
                .attr("cx", d => xScale(d.year))
                .style("fill", d => colorScale(d.category));

            circ.on("click", function(d) {
                divScatter .transition()
                    .duration(200)
                    .style("opacity", 1);
                if (d.motivation == "") {
                    d.motivation = "N/A"
                }
                divScatter .html(d.fullname + "<br/>"  + "Year: " + d.year + "<br/>"  + "Age: " + d.age + "<br/>"  + "Category: " + d.category + "<br/>"  + "Motivation: " + d.motivation )
                    .style("left", (d3.event.pageX - 10) + "px")
                    .style("top", (d3.event.pageY - 805) + "px");
            })
            .on("mouseout", function(d) {
                    divScatter.transition()
                        .duration(500)
                        .style("opacity", 0);
                    });
        }

        var xAxis = d3.svg.axis().scale(xScale).orient("bottom")
            .ticks(20)
            .tickSize(1)
            .tickFormat(d3.format("d"));

        svg2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," +cheight + ")")
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

        svg2.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(30,0)")
            .call(yAxis)
          .append("text")
            .attr("class", "label")
            .text("Age")
            .attr("transform", "translate(15, 30), rotate(-90)")
            .style("text-anchor", "end")

        var legend = svg2.append("g")
            .attr("transform", `translate(${cwidth + 120}, 0)`)
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
            .text(d => d);
    });

    function placeDots() {
        d3.csv('nobel_laureates.csv', function(d) {
            return {
                fullname : d.fullname,
                motivation : d.motivation,
                share : +d.share,
                born : new Date(d.born),
                year : +d.year,
                age : +d.age,
                born_city : d.born_city,
                born_country : d.born_country,
                died : d.died,
                is_alive : d.is_alive,
                category : d.category,
                gender : d.gender,
                affiliation : d.affiliation,
                affiliation_city : d.affiliation_city,
                affiliation_country : d.affiliation_country
            }
        }, function(error, data) {

            var chemfilter, econfilter, litfilter, medfilter, peacefilter, physfilter, malefilter, femalefilter;

            svg2.selectAll("circle").remove();

            var yearsExtent = d3.extent(data, d => d.year);
            var ageExtent = d3.extent(data, d => d.age);

            var xScale = d3.scale.linear()
                .domain([1900, 2015])
                .range([30, cwidth])

            var yScale = d3.scale.linear()
            .domain([15, 95])
            .range([cheight, 30])

            var circ = svg2.selectAll('dot')
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .filter(function(d){
                    if (chem == true) {
                        chemfilter = d.category == "chemistry"
                    } else {
                        chemfilter = d.category == ""
                    }
                    if (econ == true) {
                        econfilter = d.category == "economics"
                    } else {
                        econfilter = d.category == ""
                    }
                    if (lit == true) {
                        litfilter = d.category == "literature"
                    } else {
                        litfilter = d.category == ""
                    }
                    if (med == true) {
                        medfilter = d.category == "medicine"
                    } else {
                        medfilter = d.category == ""
                    }
                    if (peace == true) {
                        peacefilter = d.category == "peace"
                    } else {
                        peacefilter = d.category == ""
                    }
                    if (phys == true) {
                        physfilter = d.category == "physics"
                    } else {
                        physfilter = d.category == ""
                    }
                    if (female == true) {
                        femalefilter = d.gender == "female"
                    } else {
                        femalefilter = d.gender == ""
                    }
                    if (male == true) {
                        malefilter = d.gender == "male"
                    } else {
                        malefilter = d.gender == ""
                    }
                    if (share1 == true) {
                        s1filter = d.share == "1"
                    } else {
                        s1filter = d.share == ""
                    }
                    if (share2 == true) {
                        s2filter = d.share == "2"
                    } else {
                        s2filter = d.share == ""
                    }
                    if (share3 == true) {
                        s3filter = d.share == "3"
                    } else {
                        s3filter = d.share == ""
                    }
                    if (share4 == true) {
                        s4filter = d.share == "4"
                    } else {
                        s4filter = d.share == ""
                    }
                    return (chemfilter || econfilter || litfilter || medfilter || peacefilter || physfilter) && (femalefilter || malefilter) && (s1filter || s2filter || s3filter || s4filter);
                })
                .attr("r", 3)
                .attr("cy", d => yScale(d.age))
                .attr("cx", d => xScale(d.year))
                .style("fill", d => colorScale(d.category));

            circ.on("click", function(d) {
                divScatter .transition()
                    .duration(200)
                    .style("opacity", 1);
                if (d.motivation == "") {
                    d.motivation = "N/A"
                }
                divScatter .html(d.fullname + "<br/>"  + "Year: " + d.year + "<br/>"  + "Age: " + d.age + "<br/>"  + "Category: " + d.category + "<br/>"  + "Motivation: " + d.motivation )
                    .style("left", (d3.event.pageX - 10) + "px")
                    .style("top", (d3.event.pageY - 805) + "px");
            })
            .on("mouseout", function(d) {
                    divScatter.transition()
                        .duration(500)
                        .style("opacity", 0);
                    });
        });
    }
}
