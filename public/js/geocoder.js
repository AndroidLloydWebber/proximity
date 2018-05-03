// function geocoder(){
var address = "955 Juniper St, Atlanta, GA, 30309";
var key = "AIzaSyAo3U3-CYQSA_L--3jjHzIIqBnngBiAMEU"
var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + key;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    db.POI.create({
        title: "form title field",
        address: "form address field",
        lat: response.results["0"].geometry.location.lat,
        lng: response.results["0"].geometry.location.lng,
        link: "form link field",
        category: "form category field",
        body: "form body field"
    }).then(function(dbPOI){
        res.json(dbPOI);
    })
    
    console.log(response.results["0"].geometry.location.lat)
    console.log(response.results["0"].geometry.location.lng)

})

// }