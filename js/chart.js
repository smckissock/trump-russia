
var mediaOutletChart;
var topicMemberChart;

var facts;
var searchDim;
var searchGroup;


d3.json("data/stories.json", function (err, data) {

    console.table(data);
    facts = crossfilter(data);

    var all = facts.groupAll();
    dc.dataCount('.dc-data-count')
        .dimension(facts)
        .group(all);    

    /* var changeDateDim = facts.dimension(function (d) { return d.sourceDate; });
    var changeDateGroup = changeDateDim.group(d3.time.day);
    changeDateChart = dc.barChart("#dc-chart-changeDate")
        .dimension(changeDateDim)
        .group(changeDateGroup)
        //.x(d3.time.scale().domain([new Date(2013, 2, 15), new Date(2018, 3, 31)]))
        .x(d3.time.scale().domain([new Date(2016, 2, 15), new Date(2018, 6, 15)]))
        .xUnits(d3.time.day)
        .width(leftWidth)
        .height(140)
        .margins({ top: 15, right: 20, bottom: 20, left: 40 })
        .elasticY(true)
        .filter([new Date(2016, 2, 25), new Date(2018, 6, 10)]) // Months are zero based
    changeDateChart.yAxis().ticks(5);
    changeDateChart.xAxis().ticks(5); */
    
    let col1Width = 200;

    mediaOutletChart = new RowChart(facts, "mediaOutlet", col1Width, 40);
    topicChart = new RowChart(facts, "topic", col1Width, 40);
     
/*     dataTable = dc.dataTable("#dc-chart-dataGrid");
    var tableDim = facts.dimension(function(d) { return +d.Id; });
    dataTable
        .dimension(tableDim)
        .group(d => conflictResult(d))
        .sortBy(function(d) {
            var pad = "0000"
            var ans = pad.substring(0, pad.length - d.stories.length) + d.stories;
            return ans;
        })
        .size(1000)
        .order(d3.descending); */

    dc.renderAll();  
});


function conflictResult(d) {
    let pad = "0000"
    let ans = pad.substring(0, pad.length - d.stories.length) + d.stories;

    let classes =  "class='conflict-summary' " + ans + " onclick='conflictPopup(\"" + d.slug + "\")' ";
    
    let title = "<span class='conflict-title'>" + d.name + "</span>";

    let stories = "<h5 class='conflict-stories'>No media accounts of this conflict</h5>";
    if (d.stories == 1)
        stories = "<h5 class='conflict-stories'>" + d.stories + " media account, from " + d.lastStory + "</h5>";
    if (d.stories > 1)
        stories = "<h5 class='conflict-stories'>" + d.stories + " media accounts, most recent " + d.lastStory + "</h5>";

    let description = "";
    if (d.description)
        description = "<p class='conflict-description'>" + d.description + "</p>";

    return "<div " + classes + ">" + "<div class='conflict-header'>" + familyMemberPhotos(d) + title + "</div>" + stories + description + "</div>";
}


function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; // Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function clearAll() {
    searchDim.filter(null); // clear text too?
    document.getElementById("search-input").value = "";

    dc.filterAll();
    dc.renderAll();
}


function selectedConflicts() {
    var conflicts = searchDim.top(100000);
    var set = new Set(); 
    conflicts.forEach(function(conflict) {
        set.add(conflict.name)
    });
    return set.size;
}


var RowChart = function (facts, attribute, width, maxItems, height) {
    // If height is supplied (very few items) use it, otherwise calculate
    if (!height)
        height = maxItems * 22;
    this.dim = facts.dimension(dc.pluck(attribute));
    var chart = dc.rowChart("#dc-chart-" + attribute)
        .dimension(this.dim)
        .group(this.dim.group().reduceCount())
        .data(function (d) { return d.top(maxItems); })
        .width(width)
        .height(height)
        .margins({ top: 0, right: 0, bottom: 10, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(5)
        //.on('filtered', showFilters)
        .label(d => d.key);

    // Hacky way to hide x-axis    
    chart.xAxis().tickFormat(function(v) {return "";});
    chart.xAxis().ticks(0);

    return chart;
}


