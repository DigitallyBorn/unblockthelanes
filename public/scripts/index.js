$( document ).ready(function() {
  //Sidr setup
  $('#right-menu').sidr({
    name: 'sidr-right',
    side: 'right',
    displace: false,
    onOpen: function(){
      $('#close-menu').fadeIn();
    },
    onClose: function(){
      $('#close-menu').fadeOut();
    }
  });

  //Leaflet map setup
  var map = L.map('map').setView([33.7490, -84.3880], 12);
  var southWest = L.latLng( 33.598035, -84.572754),
    northEast = L.latLng(33.946208, -84.16626),
    bounds = L.latLngBounds(southWest, northEast);

  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 18,
    minZoom: 12,
    maxBounds: bounds
  }).addTo(map);

  var customOptions =
  {
    'className' : 'custom'
  }

  var markers = L.markerClusterGroup({
    polygonOptions: {opacity: 0.3,
      weight: 3}
  });
  
  // Get the image / pin data
  $.get( "http://blocked-lane-map.herokuapp.com/api/images", function( data ) {
    var i;
    for (i=0; i < data.data.length; i++) {
      var image = data.data[i];

      var carMarker = L.AwesomeMarkers.icon({
        icon: 'car',
        markerColor: 'orange',
        prefix: 'fa'
      });
      L.marker([image.latitude, image.longitude], {icon: carMarker, image: image}).addTo(markers).on('click', onClick);
    }

    map.addLayer(markers);
  });
  
  // HTML on sidebar is set when you click a pin
  function onClick(e) {
    $('#image').html("<a href='" + this.options.image.full_url + "' target='_blank'><img src='" + this.options.image.thumb_url + "'/><i class='fa fa-search-plus fa-5x'></i></a>");
    var date = new Date(this.options.image.created_at);
    var formattedDate = moment(date).utc().format('MMMM Do YYYY, h:mm A');
    $('#time').html(formattedDate);
    $('#address').html(this.options.image.address);
    $.sidr('open', 'sidr-right');
  }
  
  $('#close-menu').click(function() {
    $.sidr('close', 'sidr-right');
  });
});