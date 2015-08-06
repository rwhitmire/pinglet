import Chart from './chart';

export default Backbone.View.extend({
  template: require('./index.hbs'),

  events: {
    'click [data-filter=day]': 'filter',
    'click [data-filter=week]': 'filter',
    'click [data-filter=month]': 'filter',
  },

  initialize(options) {
    this.endpoints = options.endpoints;
    
    this.state = new Backbone.Model({
      filter: 'day'
    });
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
      state: this.state,
      endpoint: endpoint
    });

    view.render();
    this.$('#charts').append(view.$el);
  },

  filter(e) {
    var filter = e.target.dataset.filter;
    this.state.set('filter', filter);
    this.selectFilter(filter);
  },

  selectFilter(filter) {
    this.$('.chart-filters a').removeClass('active');
    this.$('[data-filter=' + filter + ']').addClass('active');
  }
});