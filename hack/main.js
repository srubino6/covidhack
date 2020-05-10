var colkeys = ["Healthy", "Sick", "Critical", "Recovered"];
    var color = d3.scaleOrdinal()
                .domain(colkeys)
                .range(["#ffffff","#33ccff","#7b838a", "#4267d7"]);

d3.csv("Corona.csv", function(csv) {
    for (var i=0; i<csv.length; ++i) {
        csv[i].cost = Number(csv[i].cost);
        csv[i].time = Number(csv[i].time);
        csv[i].miles = Number(csv[i].miles);
        csv[i].effect = Number(csv[i].effect);
    }
    var cost = d3.extent(csv, function(row) { return row.cost; });
    var time = d3.extent(csv, function(row) { return row.time; });
    var miles = d3.extent(csv,  function(row) { return row.miles; });
    var effect = d3.extent(csv,  function(row) {return row.effect; });
})

function start() {
    // Sets color of the circles

    d3.select("#testdrop").style("display", "none");

    var graph = d3.select("#graph");

    var svg = graph.append("svg").attr("width", 850).attr("height", 590).attr("x",20).style("stroke", "black");

    var keySize = 20;
    svg.selectAll("legend")
        .data(colkeys)
        .enter()
        .append("circle")
            .attr("cx", 660)
            .attr("cy", function(d,i){ return 68 + i*(keySize+5)})
            .attr("r", keySize/2.3)
            .style("fill", function(d){ return color(d)});

    svg.selectAll("mylabels")
        .data(colkeys)
        .enter()
        .append("text")
            .attr("x", 660 + keySize*1.2)
            .attr("y", function(d,i){ return 60 + i*(keySize+5) + (keySize/2)})
            .style("fill", "black")
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

    // total count = 1025
    var count = 1;
    for (var x = 40; x < 620; x += 18.125) {
    for (var y = 10; y < 590; y += 18.125) {
        var circle = svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 5)
            .style("fill", "white");
    count = count + 1;
    }
}
}
var cost = "";
var miles = "";
var time = "";
function on1() {
    var select = d3.select('#categorySelect1').node();
    // Get current value of select element
    cost = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letter
    return cost;
}
function on2() {
    var select = d3.select('#categorySelect2').node();
    // Get current value of select element
    miles = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letter
    return miles;
}
function on3() {
    var select = d3.select('#categorySelect3').node();
    // Get current value of select element
    time = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letter
    return time;
}
function filterTests() {
    if (on1() == null) {
        var select = d3.select('#categorySelect1').node();
        // Get current value of select element
        cost = select.options[select.selectedIndex].value;
    }
    else {
        cost = on1();
    }
    if (on2() == null) {
        var select = d3.select('#categorySelect2').node();
        // Get current value of select element
        miles = select.options[select.selectedIndex].value;
    }
    else {
        miles = on2();
    }
    if (on3() == null) {
        var select = d3.select('#categorySelect3').node();
        // Get current value of select element
        time = select.options[select.selectedIndex].value;
    }
    else {
        time = on3();
    }
    console.log(cost);
    console.log(miles);
    console.log(time);
    d3.select("#testdrop").style("display", "block");
}

var test = "";

function on4() {
    var select = d3.select('#categorySelect4').node();
    // Get current value of select element
    test = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letter
    var i = 1;                  //  set your counter to 1
function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    daysim(test, i);
     //  your code here
    i++;                    //  increment the counter
    if (i < 11) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another
    }                       //  ..  setTimeout()
  }, 1000)
}
myLoop();
}

var deadpop = 0;
var recopop = 0;
var sickpop = 0;
var healthpop = 1025;
function daysim(test, days){
    var effect = 0;
    if (test == "ID NOW (Abbott)") {
        effect = .849;
    }
    if (test == "DiaSorin Simplexa") {
        effect = .893;
    }
    if (test == "Roche") {
        effect = .965;
    }
    if (test == "Cepheid") {
        effect = .982;
    }

    var graph = d3.select("#graph");
    var svg = d3.select("svg");
    svg.append("rect")
            .attr("x", 635)
            .attr("y", 300)
            .attr("width", 180)
            .attr("height",220)
            .style("fill", "white");
    svg.append("text")
            .attr("x", 660)
            .attr("y", 330)
            .style("fill", "black")
            .text("Test:")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
    svg.append("text")
            .attr("x", 660)
            .attr("y", 350)
            .style("fill", "black")
            .text(test)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
    svg.append("text")
            .attr("x", 660)
            .attr("y", 380)
            .style("fill", "black")
            .text("Reliability:")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
    svg.append("text")
            .attr("x", 660)
            .attr("y", 400)
            .style("fill", "black")
            .text(Math.round(effect*100) + "%")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
    svg.append("text")
            .attr("x", 660)
            .attr("y", 430)
            .style("fill", "black")
            .text("Day:")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
    svg.append("text")
            .attr("x", 660)
            .attr("y", 450)
            .style("fill", "black")
            .text(days*5)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
    svg.append("text")
            .attr("x", 660)
            .attr("y", 480)
            .style("fill", "black")
            .text("Critical:")
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

    // Sets color of the circles
    // total count = 1025
    var count = 1;
    var pop = 16000;
    var popscale = 16000/1025;
    recopop = (recopop + pop *.006*(1-effect)*Math.pow(2.4,days-3)*.95)/popscale;
    deadpop = (deadpop + pop *.006*(1-effect)*Math.pow(2.4,days-3)*.05)/popscale;
    sickpop = ((sickpop + pop*.006*(1-effect)*Math.pow(2.4,days))/popscale) - recopop - deadpop;
    healthpop = 1025 - sickpop - recopop- deadpop;
    console.log(days);
    console.log(recopop);
    console.log(deadpop);
    console.log(healthpop);
    console.log(sickpop);
    if (healthpop < .15 * pop/popscale) {
        healthpop = .15 * pop/popscale;
    }
    for (var x = 40; x < 620; x += 18.125) {
    for (var y = 10; y < 590; y += 18.125) {
        var circle = svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 5)
            .style("fill", function(d){
                    if (count < healthpop) {
                        return color("Healthy");
                    } else if (count < healthpop + deadpop) {
                        return color("Critical");
                    } else if (count < healthpop + recopop + deadpop) {
                        return color("Recovered");
                    } else {
                        return color("Sick")
                    }
            })
    count = count + 1;
    }
    svg.append("text")
            .attr("x", 660)
            .attr("y", 500)
            .style("fill", "black")
            .text(Math.round(deadpop*16) + "/" + pop)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");
}
}


