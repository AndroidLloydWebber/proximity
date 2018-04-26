var map, infoWindow, pos;
var markers = [];

function initMap() {
    $(".clear-button").on('click', function(e) {
        e.preventDefault();
        markers.forEach(function(m) { m.setMap(null); })
        markers = [];
    });

    map = new google.maps.Map(document.getElementById('maps'), {
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

function onClick(pos) {
    $(".buttons").on("click", function () {
        console.log("Button clicked");
        let sportName = $(this).attr("data-name");
        console.log("sportName: ", sportName);
        // console.log("This: ", $(this));
        $.ajax({
            url: constructURL(sportName, pos),
            method: "GET",
        }).then(function (res) {
            let events = res.events.map(function(event) {
                console.log(event);
                return {
                    title: event.name,
                    animation: google.maps.Animation.DROP,
                    map: map,
                    href: event.link,
                    position: { lat: event.group.lat, lng: event.group.lon }
                };
            })


            let newMarkers = events.map(element => {

                return new google.maps.Marker(element);
            });

            newMarkers.forEach(function (m) {
                google.maps.event.addListener(m, 'click', function () {
                    window.location.href = this.href;
                });
            })

            markers = markers.concat(newMarkers);
        })


    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function constructURL(sport, lat, lon) {
    return qURL = "https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/upcoming_events?&key=34305b6a752276562604f306a51d76&sign=true&photo-host=public&page=10&text=" + sport + "&lat=" + pos.lat + "&lon=" + pos.lng
};