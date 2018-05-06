// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our map model folder
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    // Add sequelize code to find all posts, and return them to the user with res.json
    db.poi.findAll({}).then( function (results ) {
      res.json( results );
    }) 
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", function(req, res) {
    // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    db.poi.findAll({
      where: {
        category: req.params.category
      }
    }).then( function ( results ) {
      res.json( results );
      
  });
});

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    // return the result to the user with res.json

    db.poi.findOne({
        where: {
            id: req.params.id
        }
    }).then( function ( results ) {
        res.json( results );
  });
});

  // POST route for saving a new post
  app.post("/api/posts", function (req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json

    var key = "AIzaSyAo3U3-CYQSA_L--3jjHzIIqBnngBiAMEU"
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.address + "&key=" + key;
    axios = require('axios');
    axios.get(queryURL).then(function (response) {
        var locationData = response.data.results[0].geometry.location;
        db.poi.create({
            title: req.body.title,
            address: req.body.address,
            category: req.body.category,
            body: req.body.body,
            lat: locationData.lat,
            lng: locationData.lng,
        }).then(function (newPOI) {
            res.json(newPOI);
        })
    });
    
});

};



  
