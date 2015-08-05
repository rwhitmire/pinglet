import Dashboard from './views/dashboard';

var app = {
  renderDashboard(options) {
    var view = new Dashboard(options);
    view.render();
  }
};

window.app = app;
export default app;
