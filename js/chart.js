
var dateChart;

var mediaOutletChart;
var topicChart;

var facts;
var searchDim;
var searchGroup;


d3.json("data/stories.json", function (err, data) {

    data.forEach(function (d) {
        var parts = d.date.split("/");
        d.year = Number(parts[2]);
    });

    console.table(data);
    facts = crossfilter(data);

    var all = facts.groupAll();
    dc.dataCount('.dc-data-count')
        .dimension(facts)
        .group(all);    

    var dateDim = facts.dimension(function (d) { return d.year; });
    var dateGroup = dateDim.group().reduceCount(function(d) {return d.year;});
    dateChart = dc.barChart("#dc-chart-date")
        .dimension(dateDim)
        .group(dateGroup)
        .x(d3.scale.linear().domain([2012.5, 2018.5]))
        .centerBar(true)
        .width(420)
        .height(140)
        .margins({ top: 15, right: 20, bottom: 20, left: 30 })
        .ordinalColors(['#9ecae1'])
        .elasticY(true)
    dateChart.yAxis().ticks(6);

    dateChart.xAxis().tickFormat(d3.format("d")); // need "2005" not "2,005" 
    

    let col1Width = 200;

    mediaOutletChart = new RowChart(facts, "mediaOutlet", col1Width, 40);
    topicChart = new RowChart(facts, "topic", col1Width, 40);
     
    dataTable = dc.dataTable("#dc-chart-dataGrid");
    var tableDim = facts.dimension(function(d) { return +d.description; });
    dataTable
        .dimension(tableDim)
        .group(d => storyResult(d))
/*         .sortBy(function(d) {
            var pad = "0000"
            var ans = pad.substring(0, pad.length - d.stories.length) + d.stories;
            return ans;
        }) */
        .size(1000)
        .order(d3.descending);

    dc.renderAll();  
});


function storyResult(d) {
    
    return `
        <div class="story" onclick="window.open('${d.link}')">
            <img class="story-image" src="${d.image}" height="80" width="140">
            <div class="story-body">
                <h3 class="story-title">${d.date} ${d.description}</h3>
                <h5 class="story-details"><b>${d.topic}</b></h5>
                <a class="story-link" href="${d.link}" target="_blank">${d.mediaOutlet} - ${d.headline}</a>
            </div>    
        </div>
    `;
}



/*     let classes =  "class='conflict-summary' " + ans + " onclick='conflictPopup(\"" + d.slug + "\")' ";
    
    let title = "<span class='conflict-title'>" + d.name + "</span>";

    let stories = "<h5 class='conflict-stories'>No media accounts of this conflict</h5>";
    if (d.stories == 1)
        stories = "<h5 class='conflict-stories'>" + d.stories + " media account, from " + d.lastStory + "</h5>";
    if (d.stories > 1)
        stories = "<h5 class='conflict-stories'>" + d.stories + " media accounts, most recent " + d.lastStory + "</h5>";

    let description = "";
    if (d.description)
        description = "<p class='conflict-description'>" + d.description + "</p>";

    return "<div " + classes + ">" + "<div class='conflict-header'>" + familyMemberPhotos(d) + title + "</div>" + stories + description + "</div>"; */
//}


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


