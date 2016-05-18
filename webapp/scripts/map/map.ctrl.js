(function () {
  angular.module('app').controller('MapCtrl', ['STATES', function(STATES) {
    var vm = this;

    mapboxgl.accessToken = 'pk.eyJ1IjoibXNudHJuciIsImEiOiJjaWxpZWowMXEzMHdtdHNrcGloOWdtcHJ2In0.1zQTNDC_gK3zq1V7AuQ4qA';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [-74.50, 40],
      zoom: 3});

    vm.states = STATES;
    vm.onStateChange = onStateChange;

    function onStateChange() {
      zoomToState(vm.selectedState.name);
    }

    function zoomToState(state) {
      var featured = vm.states.filter(function (feature) {
        return feature.name === state;
      });

      map.fitBounds(new mapboxgl.LngLatBounds(featured[0].bounds.sw, featured[0].bounds.ne), {padding: 50});
    }


    map.on('style.load', function () {
      map.addSource("states", {
        "type": "geojson",
        "data": 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
      });

      map.addLayer({
        "id": "state-fills",
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
          "fill-color": "#627BC1",
          "fill-opacity": 0.5
        }
      });

      map.addLayer({
        "id": "state-borders",
        "type": "line",
        "source": "states",
        "layout": {},
        "paint": {
          "line-color": "#627BC1",
          "line-width": 1
        }
      });

      map.addLayer({
        "id": "route-hover",
        "type": "fill",
        "source": "states",
        "layout": {},
        "paint": {
          "fill-color": "#627BC1",
          "fill-opacity": 1
        },
        "filter": ["==", "name", ""]
      });

      // When the user moves their mouse over the page, we look for features
      // at the mouse position (e.point) and within the states layer (states-fill).
      // If a feature is found, then we'll update the filter in the route-hover
      // layer to only show that state, thus making a hover effect.
      map.on("mousemove", function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ["state-fills"] });
        if (features.length) {
          map.setFilter("route-hover", ["==", "name", features[0].properties.name]);
        } else {
          map.setFilter("route-hover", ["==", "name", ""]);
        }
      });

      map.on("click", function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['state-fills'] });

        if (features.length) {
          zoomToState(features[0].properties.name);
        }
      });

    });
  }]);
})();