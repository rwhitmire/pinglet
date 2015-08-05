export default Backbone.View.extend({
  template: require('./chart.hbs'),

  initialize(options) {
    this.endpoint = options.endpoint;
  },

  render() {
    this.$el.html(this.template(this.endpoint));
    this.renderChart();
  },

  renderChart() {
    var data = this.endpoint.data.map(x => {
      return [Date.parse(x.date), x.ms];
    });

    this.$('[data-js=chart]').highcharts({
      title: false,
      plotOptions: {
        line: {
          animation: false,
          marker: {
            enabled: false
          }
        }
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          enabled: false
        }
      },
      series: [{
        enableMouseTracking: false,
        showInLegend: false,
        data: data
      }],
      tooltip: {
        enabled: false
      },
      credits: false
    });
  }
});
