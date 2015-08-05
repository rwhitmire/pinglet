import Chart from './chart';

export default Backbone.View.extend({
  template: require('./index.hbs'),

  initialize(options) {
    this.endpoints = options.endpoints;
  },

  render() {
    var html = this.template();
    this.$el.html(html);
    this.renderCharts();
  },

  renderCharts() {
    this.endpoints.forEach(endpoint => {
      this.appendChart(endpoint);
    });
  },

  appendChart(endpoint) {
    var view = new Chart({
      endpoint: endpoint
    });

    view.render();
    this.$('#charts').append(view.$el);
  }
});