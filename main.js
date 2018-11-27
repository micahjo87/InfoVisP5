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
    var graph = document.getElementById('graph');

    d3.csv('nobel_laureates.csv', function(d) {
        return {
            name : d.fullname,
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
        sortByYear(data);
        console.log(data);
    });

    function sortByYear(data) {
        data.sort(function(x, y) {
            return d3.ascending(x.born, y.born);
        });
    }
}
