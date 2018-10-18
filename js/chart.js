
var dateChart;

var mediaOutletChart;
var topicChart;

var facts;
var searchDim;
var searchGroup;


d3.json("data/stories.json", function (err, data) {

    data.forEach(function (d) {
        let parts = d.date.split("/");
        let year = Number(parts[2]);;
        let month = Number(parts[0]);;
        let quarter = Math.round((month / 4)) + 1;
        
        //d.quarterNum = ((year - 2013) * 4) + quarter; 
        d.quarterNum = ((year - 2013) * 12) + month; 
        d.quarter = year + " Qtr " + quarter;   
        d.year = year;
        
        d.dateSort = parts[2] + "-" + parts[0].padStart(2, '0') + "-" + parts[1].padStart(2, '0');
    });

    console.table(data);
    facts = crossfilter(data);

    searchDim = facts.dimension(function (d) {
        return d.words;
    });
    searchGroup = searchDim.group().reduceCount();

    var all = facts.groupAll();
    dc.dataCount('.dc-data-count')
        .dimension(facts)
        .group(all);    

/*     var dateDim = facts.dimension(function (d) { return d.year; });
    var dateGroup = dateDim.group().reduceCount(function(d) {return d.year;});
    dateChart = dc.barChart("#dc-chart-date")
        .dimension(dateDim)
        .group(dateGroup)
        .x(d3.scale.linear().domain([2012.5, 2018.5]))
        .centerBar(true)
        .width(900)
        .height(140)
        .margins({ top: 15, right: 20, bottom: 20, left: 30 })
        .ordinalColors(['#9ecae1'])
        //.brushOn(false) // turns it off, but afterwards clicking doesn't filter!
        .elasticY(true)
    dateChart.yAxis().ticks(6); */

    var dateDim = facts.dimension(function (d) { return d.quarterNum; });
    var dateGroup = dateDim.group().reduceCount(function(d) {return d.quarterNum;});
    dateChart = dc.barChart("#dc-chart-date")
        .dimension(dateDim)
        .group(dateGroup)
        //.x(d3.scale.linear().domain([2012.5, 2018.5]))
        .x(d3.scale.linear().domain([1, 23 * 4]))
        .centerBar(true)
        .width(900)
        .height(140)
        .margins({ top: 15, right: 20, bottom: 20, left: 30 })
        .ordinalColors(['#9ecae1'])
        //.brushOn(false) // turns it off, but afterwards clicking doesn't filter!
        .elasticY(true)
    //dateChart.yAxis().ticks(6); 

    //dateChart.xAxis().tickFormat(d3.format("d")); // need "2005" not "2,005" 
    
    d3.select("#search-input").on('keyup', function (event) {
        searchTerm = document.getElementById("search-input").value;
        setword(searchTerm);
    });

    function setword(wd) {
        if (wd.length < 3) {
            if (wd.length == 0)
                showFilters();
            searchDim.filter(null);
            dc.redrawAll();  
            return;
        }
        
        var s = wd.toLowerCase();
        searchDim.filter(function (d) {
            return d.indexOf(s) !== -1;
        });

        //showFilters();
        dc.redrawAll();
    }

    let col1Width = 200;

    mediaOutletChart = new RowChart(facts, "mediaOutlet", col1Width, 40);
    topicChart = new RowChart(facts, "topic", col1Width, 12);
     
    dataTable = dc.dataTable("#dc-chart-dataGrid");
    var tableDim = facts.dimension(function(d) { return +d.dateSort; });
    dataTable
        .dimension(tableDim)
        .group(d => storyResult(d))
        .sortBy(d => { return d.dateSort; })
        .size(400)
        .order(d3.descending);

    dc.renderAll();
});


function storyResult(d) {
    // ${d.dateSort} thrown in at the top serves no purpose other than to get the correct sort order!
    return `
        <div class="story" ${d.dateSort} onclick="window.open('${d.link}')">
            <img class="story-image" src="${d.image}" height="80" width="120">
            <div class="story-body"><h5 class="story-topic">${d.topic}</h5>
                <h3 class="story-title">${d.date} ${d.description}</h3>
                
                <a class="story-link" href="${d.link}" target="_blank">${d.mediaOutlet} - ${d.headline}</a>
            </div>    
        </div>
    `;
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


