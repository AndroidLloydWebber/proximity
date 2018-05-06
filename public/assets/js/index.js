

var App = {
  map: null,
  init: function () {
    $('.sidenav').sidenav();
    $('#slide-out-events').sidenav({
      edge: 'right'
    })
    $('select').formSelect({

    });
    $('input#input_text, textarea#textarea2').characterCounter();


    google.maps.event.addDomListener(window, 'load', this.initMap);
    this.bindListeners();
    this.getMarkers();

  },

  bindListeners() {

    $('#event-form').submit(function (e) {
      e.preventDefault();
      var data = $(this).serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});

      $.post('/api/posts', data, function(data){
        var marker = new google.maps.Marker({
          position: {
            lat: Number(data.lat),
            lng: Number(data.lng)
          },
          map: this.map,
          title: data.title,
          animation: google.maps.Animation.DROP,
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        });
        $('.sidenav').sidenav("close");
        map.setZoom(10);
        map.panTo(marker.position);
      })
    })

    $('#search-form').submit(function (e) {
      e.preventDefault();
      var data = $(this).serializeArray().reduce(function (obj, item) {
        if (item.name === 'category') {
          if (obj['category']) {
            obj['category'].push(item.value);
          } else {
            obj['category'] = [item.value];
          }
          
        } else {
          obj[item.name] = item.value;
        }
        
        return obj;
      }, {});
      $('.sidenav').sidenav("close");

      console.log(data)
    })
  },

  getMarkers: function () {
    $.get('/api/posts', function (markers) {
      markers.forEach(function (marker) {
        var marker = new google.maps.Marker({
          position: {
            lat: Number(marker.lat),
            lng: Number(marker.lng)
          },
          map: this.map,
          title: marker.title,
          animation: google.maps.Animation.DROP,
          icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        });
      })
    });
  },

  initMap: function () {
    var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
      (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
    if (isMobile) {
      var viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
    }
    var mapDiv = document.getElementById('googft-mapCanvas');
    mapDiv.style.width = isMobile ? '100%' : '100%';
    mapDiv.style.height = isMobile ? '100%' : '100%';
    this.map = new google.maps.Map(mapDiv, {
      center: new google.maps.LatLng(38.775618, -100.396285),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.HYBRID
    });

    if (isMobile) {
      var legend = document.getElementById('googft-legend');
      var legendOpenButton = document.getElementById('googft-legend-open');
      var legendCloseButton = document.getElementById('googft-legend-close');
      legend.style.display = 'none';
      legendOpenButton.style.display = 'block';
      legendCloseButton.style.display = 'block';
      legendOpenButton.onclick = function () {
        legend.style.display = 'block';
        legendOpenButton.style.display = 'none';
      }
      legendCloseButton.onclick = function () {
        legend.style.display = 'none';
        legendOpenButton.style.display = 'block';
      }
    }
  }
};

$(document).ready(function () {
  App.init();

  // $("form").submit(function(e){
  //   e.preventDefault();
  // })
});