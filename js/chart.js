let dateChart;
let mediaOutletChart;
let topicChart;

let facts;
let searchDim;
let searchGroup;

let searchTerm = "";


d3.json("data/stories.json", function (err, data) {

    data.forEach(function (d) {
        let parts = d.date.split("/");
        d.dateSort = parts[2] + "-" + parts[0].padStart(2, '0') + "-" + parts[1].padStart(2, '0');
        
        let year = Number(parts[2]);
        let month = Number(parts[0]);

        d.monthNum = ((year - 2013) * 12) + month;
    });

    console.table(data);
    facts = crossfilter(data);

    //searchDim = facts.dimension(function (d) {
    //    return d.words;
    //});
    searchDim = facts.dimension( d => { return d.words; });
    searchGroup = searchDim.group().reduceCount();

    let all = facts.groupAll();
    dc.dataCount('.dc-data-count')
        .dimension(facts)
        .group(all);    


    let dateDim = facts.dimension(function (d) { return d.monthNum; });
    let dateGroup = dateDim.group().reduceCount(function(d) {return d.monthNum;});
    dateChart = dc.barChart("#dc-chart-date")
        .dimension(dateDim)
        .group(dateGroup)
        .x(d3.scale.linear().domain([4, (12 * 6) ]))
        //.centerBar(true)
        .width(900)
        .height(140)
        .margins({ top: 10, right: 20, bottom: 20, left: 30 })
        .ordinalColors(['#9ecae1'])
        .yAxisLabel('# Media Accounts')
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
        .size(400)
        .order(d3.descending);

    dc.renderAll();
});


function setWord(word) {
    let searchTerm = word;

    if (word.length < 3) {
        if (word.length == 0)
            showFilters();
        searchDim.filter(null);
        dc.redrawAll();  
        return;
    }    
    let s = word.toLowerCase();
    searchDim.filter( d => { return d.indexOf(s) !== -1 });

    showFilters();
    dc.redrawAll();
}

function showFilters() {
    // todo
}


function setSearch(term) {
    d3.select("#search-input")
        .attr("value", term);

    setWord(term);    
}

function storyResult(d) {
    // ${d.dateSort} thrown in at the top serves no purpose other than to get the correct sort order!
    return `
        <div class="story" ${d.dateSort} onclick="window.open('${d.link}')">
            <img class="story-image" src="${d.image}" onerror="this.style.display='none'" height="90" width="120">
            <div class="story-body"><h5 class="story-topic">${d.topic}</h5>
                <h3 class="story-title">${d.date} ${d.description}</h3>
                <p class="story-headline">${headline(d.mediaOutlet, d.headline)}</p>
                <p class="story-headline">${getSentence(d)}</p>
            </div>    
        </div>
    `; 
}


function getSentence(d) {
    let result = "Not Found";

    //console.log("Search term: " + searchTerm);
    if (searchTerm.length < 3)
        return "";

    d.sentences.forEach(function (sentence) {
        var lower = sentence.toLowerCase();
        if (lower.includes(searchTerm)) {
            let start = lower.indexOf(searchTerm);
            let answer = insert(sentence, start + searchTerm.length, "</b>");
            answer = insert(answer, start, "<b>");
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
    return     
        mediaOutlet;
}


function dateToYMD(date) {
    let d = date.getDate();
    let m = date.getMonth() + 1; // Month from 0 to 11
    let y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

function clearAll() {
    searchDim.filter(null); // clear text too?
    document.getElementById("search-input").value = "";

    dc.filterAll();
    dc.renderAll();
}

function selectedConflicts() {
    let conflicts = searchDim.top(100000);
    let set = new Set(); 
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
        //.on('filtered', showFilters)
        .label(d => d.key);

    // Hacky way to hide x-axis    
    chart.xAxis().tickFormat(function(v) {return "";});
    chart.xAxis().ticks(0);

    return chart;
}


