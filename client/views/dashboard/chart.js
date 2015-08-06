export default Backbone.View.extend({
  template: require('./chart.hbs'),

  className: 'chart',

  initialize(options) {
    this.endpoint = options.endpoint;
    this.state = options.state;
    this.listenTo(this.state, 'change:filter', this.filterChanged, this);
    this.startDate = moment().subtract(1, 'day').toDate();
  },

  filterChanged(model, value) {
    this.startDate = moment().subtract(1, value).toDate();
    this.render();
  },

  render() {
    this.filteredData = this.endpoint.data.filter(x => {
      var foo = Date.parse(x.date) > this.startDate;
      console.log(foo);
      return foo;
    });

    console.log(this.filteredData);

    this.endpoint.avg = this.avg(this.filteredData);
    this.$el.html(this.template(this.endpoint));

    _.defer(() => {
      this.renderChart();
    });
  },

  avg(data) {
    var total = _.chain(data)
      .pluck('ms')
      .reduce((a, b) => a + b)
      .value();

    if(total === undefined) { total = 0; }
    var avg = total / (data.length === 0 ? 1 : data.length);
    return Number(avg.toFixed(2));
  },

  renderChart() {
    var data = this.filteredData.map(x => {
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
        type: 'datetime',
        labels: {
          style: {
            fontSize: '10px;'
          }
        }
      },
      yAxis: {
        title: {
          enabled: false
        },
        labels: {
          style: {
            fontSize: '10px;'
          }
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
