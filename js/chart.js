let dateChart;
let mediaOutletChart;
let topicChart;

let facts;
let searchDim;
let searchGroup;

let all;

let allEventCount; 

var searchTerm = "";
var cleanSearchTerm = ""


d3.json("data/stories.json", function (err, data) {
    allEventCount = data.length;
    
    data.forEach(function (d) {
        let parts = d.date.split("/");
        d.dateSort = parts[2] + "-" + parts[0].padStart(2, '0') + "-" + parts[1].padStart(2, '0');
        
        let year = Number(parts[2]);
        let month = Number(parts[0]);

        d.monthNum = ((year - 2013) * 12) + month;
    });

    //console.table(data);
    facts = crossfilter(data);

    all = facts.groupAll();
    dc.dataCount('.dc-data-count')
        .dimension(facts)
        .group(all);    
        
    searchDim = facts.dimension( d => { return d.words; });
    searchGroup = searchDim.group().reduceCount();

    let dateDim = facts.dimension(function (d) { return d.monthNum; });
    let dateGroup = dateDim.group().reduceCount(function(d) {return d.monthNum;});
    dateChart = dc.barChart("#dc-chart-date")
        .dimension(dateDim)
        .group(dateGroup)
        .x(d3.scale.linear().domain([4, (12 * 6) ]))
        //.centerBar(true)
        .width(dateChartWidth())
        .height(100)
        .margins({ top: 10, right: 20, bottom: 20, left: 30 })
        .ordinalColors(['#9ecae1'])
        .yAxisLabel('# Media Accounts')
        .on('filtered', showFilters)
        //.brushOn(false) // turns it off, but afterwards clicking doesn't filter!
        .elasticY(true)
 
    dateChart.yAxis().ticks(3);        
    dateChart.xAxis().ticks(12);    

    dateChart.xAxis().tickFormat(function (d) {
        let monthNum = d;
        // =ROUND(((C2 + 5)/12) + 2012, 0)
        let year = Math.round(((monthNum + 5)/12) + 2012);        
        // =C3-(D3-2013)*12
        let month = monthNum - (year - 2013) * 12;
        let quarter = Math.ceil(month / 12);

        return year + " Q" + quarter;
    });
    
    d3.select("#search-input").on('keyup', function (event) {
        searchTerm = document.getElementById("search-input").value;
        setWord(searchTerm);
    });

    let col1Width = 200;

    mediaOutletChart = new RowChart(facts, "mediaOutlet", col1Width, 40);
    topicChart = new RowChart(facts, "topic", col1Width, 12);
        
    dataTable = dc.dataTable("#dc-chart-dataGrid");
    let tableDim = facts.dimension(function(d) { return +d.dateSort; });
    dataTable
        .dimension(tableDim)
        .group(d => storyResult(d))
        .sortBy(d => { return d.dateSort; })
        .size(100)
        .order(d3.descending);

    dc.renderAll();
    showFilters();
});


function dateChartWidth() {
    return window.innerWidth > 1180 ? 1180 : window.innerWidth - 20
}

function resize() {
    dateChart.width(dateChartWidth());
    dc.redrawAll();
}


function setSearch(term) {
    d3.select("#search-input")
        .attr("value", term);
    setWord(term);    
}

function setWord(word) {
    searchTerm = word;
    cleanSearchTerm = word.toLowerCase();

    if (word.length < 3) {
        if (word.length == 0)
            showFilters();
        searchDim.filter(null);
        dc.redrawAll();  
        return;
    }    
    searchDim.filter( d => { return d.indexOf(cleanSearchTerm) !== -1 });

    showFilters();
    dc.redrawAll();
}

function showFilters() {
    let filterStrings = [];
    let charts = dc.chartRegistry.list();
    charts.forEach(function (chart) {
        chart.filters().forEach(function (filter) {
            // Ugh, don't include date range for now, because I can't figure out how to get to underlying dates
            if (!Array.isArray(filter))
                filterStrings.push(filter);
        })
    })

    let search = document.getElementById("search-input").value;
    if (search.length < 4)
        search = "";
    else
        search =  ' containing "' + search + '"';

    let filterString = filterStrings.join(', ') + " " + search;
    if (filterString.trim() == "")
        filterString = "None";
    
    d3.select("#current-filters").text(filterString);
    d3.select("#selected-events").text(all.value());
    d3.select("#all-events").text(allEventCount);
}


function storyResult(d) {
    // ${d.dateSort} thrown in at the top serves no purpose other than to get the correct sort order!
    return `
        <div class="story" ${d.dateSort} onclick="window.open('${d.link}')">
            <img class="story-image" src="${d.image}" onerror="this.style.display='none'" height="90" width="120">
            <div class="story-body"><h5 class="story-topic">${d.topic}</h5>
                <h3 class="story-title">${d.date} ${d.description}</h3>
                <p class="story-headline">${headline(d.mediaOutlet, d.headline)}</p>
                <p class="story-excerpt">${getSentence(d)}</p>
            </div>    
        </div>
    `; 
}


function getExampleTerms() {
    let examples = 
        ["Mandiant", "Goldstone", "Kaspersy", "Comey", "CrowdStrike", "McGahn", "Helsinki", "Sater", "Butina", "Veselnitskaya",
        "Guccifer", "Prague", "Kislyak", "Wikileaks", "Magnitsky", "Lewandowski", "Podesta", "McCaskill", "Nunes", "Akhmetshin"]

    let picked = new Set();
    while (picked.size < 3 )
        picked.add(examples[Math.floor(Math.random() * examples.length)]);    
    let terms = Array.from(picked);

    document.getElementById("examples-div").innerHTML = `
    <span class="example-label">Click an example: </span>
    <span><a class="search-example" href="javascript:setSearch('${terms[0]}')">${terms[0]}</a></span>
    <span><a class="search-example" href="javascript:setSearch('${terms[1]}')">${terms[1]}</a></span>
    <span><a class="search-example" href="javascript:setSearch('${terms[2]}')">${terms[2]}</a></span>
    `;
}


function getSentence(d) {
    let result = "Not Found";

    //console.log("Search term: " + searchTerm);
    if (searchTerm.length < 3)
        return "";

    d.sentences.forEach(function (sentence) {
        var lower = sentence.toLowerCase();
        if (lower.includes(cleanSearchTerm)) {
            let start = lower.indexOf(cleanSearchTerm);
            let answer = insert(sentence, start + searchTerm.length, "</span>");
            answer = insert(answer, start, "<span class='selected-term'>");
            result = '"' + answer + '"';
        } 
    });
    return result;
}

function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

function headline(mediaOutlet, headline) {
    if (headline != "") 
        return mediaOutlet + " - " + headline;
    else    
        return mediaOutlet;
}

function clearAll() {
    searchDim.filter(null); // clear text too?
    document.getElementById("search-input").value = "";

    dc.filterAll();
    dc.renderAll();
}

var RowChart = function (facts, attribute, width, maxItems, height) {
    // If height is supplied (very few items) use it, otherwise calculate
    if (!height)
        height = maxItems * 22;
    this.dim = facts.dimension(dc.pluck(attribute));
    let chart = dc.rowChart("#dc-chart-" + attribute)
        .dimension(this.dim)
        .group(this.dim.group().reduceCount())
        .data(function (d) { return d.top(maxItems); })
        .width(width)
        .height(height)
        .margins({ top: 0, right: 0, bottom: 10, left: 20 })
        .elasticX(true)
        .ordinalColors(['#9ecae1']) // light blue
        .labelOffsetX(5)
        .on('filtered', showFilters)
        .label(d => d.key);

    // Hacky way to hide x-axis    
    chart.xAxis().tickFormat(function(v) {return "";});
    chart.xAxis().ticks(0);

    return chart;
}


