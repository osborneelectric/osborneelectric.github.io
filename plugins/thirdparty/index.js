(function () {

  var jqPlotWidget = function (settings) {

    var self = this;    
    var currentSettings = settings;
    var htmlElement;
    var data;
    var options;
    var chartHeight = currentSettings.chartHeight;
    var chartWidth = currentSettings.chartWidth;

    //seems to be called once (or after settings change)
    this.render = function (element) {
      console.log('render');

      //add external css
      $(element).append('<link rel="stylesheet" href="https://sites.google.com/site/osborneelec/jquery.jqplot.min.css" />');      

      //add the chart div to the dom
      var chartDiv = '<div id="' + currentSettings.id + '" style="height:' + currentSettings.chartHeight + 'px;width:' + currentSettings.chartWidth + 'px;"></div>';
      console.log(chartDiv);
      htmlElement = $(chartDiv);
      $(element).append(htmlElement);
    }

    this.onSettingsChanged = function (newSettings) {
      currentSettings = newSettings;
    }

    //seems to be called after render whenever a calculated value changes
    this.onCalculatedValueChanged = function (settingName, newValue) {
      console.log('onCalculatedValueChanged for ' + settingName);
      console.log(newValue);

      if (settingName == 'data')
        data = newValue;
        
      if (settingName == 'options')
        options = newValue;

      chartHeight = currentSettings.chartHeight;
      chartWidth = currentSettings.chartWidth;

      //render the chart
      htmlElement.empty();
      $.jqplot(currentSettings.id, data, options);
    }

    this.onDispose = function () {
    }

    this.getHeight = function () {
      return Number(currentSettings.height);
    }

    this.onSettingsChanged(settings);
  };

  freeboard.loadWidgetPlugin({
    "type_name": "jqPlotWidget",
    "display_name": "jqPlot",    
    "fill_size": true,
    "external_scripts": [
      "https://sites.google.com/site/osborneelec/jquery.jqplot.min.js",
      "https://sites.google.com/site/osborneelec/jqplot.pieRenderer.min.js",
      "https://sites.google.com/site/osborneelec/jqplot.barRenderer.min.js",
      "https://sites.google.com/site/osborneelec/jqplot.categoryAxisRenderer.min.js",
      "https://sites.google.com/site/osborneelec/jqplot.pointLabels.min.js"
    ],    
    "settings": [
      {
        "name": "id",
        "display_name": "id",
        "default_value": "chart1",
        "description": "dom element id of the chart (must be unique for multiple charts)"
      },        
      {
        "name": "data",
        "display_name": "Chart Data",
        "type": "calculated",
        "description": "The data to plot"
      },    
      {
        "name": "options",
        "display_name": "Chart Options",
        "type": "calculated",
        "description": "js object containing jqPlot options for chart"
      },
      {
        "name": "chartHeight",
        "display_name": "Chart Height (px)",
        "type": "number",
        "default_value": 300,
        "description": "chart height in pixels (require freeboard config reload/refresh)"
      },
      {
        "name": "chartWidth",
        "display_name": "Chart Width (px)",
        "type": "number",
        "default_value": 300,
        "description": "chart width in pixels (require freeboard config reload/refresh)"
      },      
      {
        "name": "height",
        "display_name": "Height Blocks",
        "type": "number",
        "default_value": 5,
        "description": "A height block is around 60 pixels"
      }
    ],
    newInstance: function (settings, newInstanceCallback) {
      newInstanceCallback(new jqPlotWidget(settings));
    }
  });

}());
