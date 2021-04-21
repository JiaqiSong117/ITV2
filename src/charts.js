var ChartCtrl = (function () {
    var chart, title, xAxis, yAxis, plotOptions, series, json;
    json = {};
    chart = {
        type: "column",
        inverted: true,
        height: 800,
    };
    title = {
        text: " "
    };
    xAxis = {
        categories: []
    };
    yAxis = {
        min: 0,
        title: {
            text: "the number of counts"
        }
    };
    plotOptions = {
        column: {
            stacking: "normal"
        }
    };
    var credits = {
        enabled: false
    };
    series = [
        {
            name: "John",
            data: [5, 3, 0, 7, 2, 9],
            color:"#2222"
        },
        {
            name: "Jane",
            data: [2, 2, 3, 2, 12, 8]
        },
        {
            name: "Joe",
            data: [3, 4, 4, 2, 5, 6]
        },
        {
            name: "Jo8e",
            data: [3, 4, 4, 2, 5, 33]
        }
    ];
    json.chart = chart;
    json.title = title;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.plotOptions = plotOptions;
    json.credits = credits;
    json.series = series;
    return {
        updateChart: function (categories, series) {
            json.xAxis.categories = categories;
            json.series = series;
            $("#container").highcharts(json);
        },
        clearChart: function(){
            $("#container").highcharts({title:json.title,credits:json.credits});
        }
    };
})();
