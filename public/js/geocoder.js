// function geocoder(){
var address = "955 Juniper St, Atlanta, GA, 30309";
var key = "AIzaSyAo3U3-CYQSA_L--3jjHzIIqBnngBiAMEU"
var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + key;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response.geometry.location.lat);
    console.log(response.geometry.location.lng);
})
// }