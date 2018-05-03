var map, infoWindow, pos;
var markers = [];
var db = require("../models");


function initMap() {
    $(".clear-button").on('click', function(e) {
        e.preventDefault();
        markers.forEach(function(m) { m.setMap(null); })
        markers = [];
    });

    map = new google.maps.Map(document.getElementById('.bg'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            onClick(pos);
            // dropPin(pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);   
            map.setCenter(pos);
            console.log('pos:  ', pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {

        handleLocationError(false, infoWindow, map.getCenter());
    }
}

        function geocoder(){
            var address = "955 Juniper St, Atlanta, GA, 30309";
            var key = "AIzaSyAo3U3-CYQSA_L--3jjHzIIqBnngBiAMEU"
            var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=1" + address + "&key=" + key;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (res) {
            let POI = res.POI.map(function(event) {
                console.log(event);
                return {
                    title: POI.name,
                    animation: google.maps.Animation.DROP,
                    map: map,
                    href: POI.link,
                    position: { lat: event.group.lat, lng: event.group.lng }
                };
            })
        })
    };

            let newMarkers = POI.map(element => {

                return new google.maps.Marker(element);
            });

            newMarkers.forEach(function (m) {
                google.maps.POI.addListener(m, 'click', function () {
                    window.location.href = this.href;
                });
            

            markers = markers.concat(newMarkers);
    
            });

    


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function constructURL( pos, geometry, location, lat, lon) {
    return qURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=1" + address + "&key=" + pos + geometry.location.lat + geometry.location.lng
};