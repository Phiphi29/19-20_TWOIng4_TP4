var express = require('express');
var _ = require('lodash');
var router = express.Router();
const axios = require('axios').default;

var tabMovies = [];

// CRUD Requests

/* GET the movies table */
router.get('/', (req, res) => {
    // Get Tab of movies and return JSON
    res.status(200).json({
        tabMovies
    });
});
  
/* GET one movie */
router.get('/:id', (req, res) => {
    // Get id in params
    const { id } = req.params ;
    // Find user in DB
    const movie = _.find(tabMovies, ['id', id]);
    // Return user
    res.status(200).json({
        message: 'Movie found!',
        movie
    });
})

/* PUT a new movie */
router.put('/', (req, res) => {
    // Get the data from request from request
    const { movie } = req.body;
    // Create new unique id
    const id = _.uniqueId();
    // Insert it in table
    axios({
        method: 'get',
        url: 'http://www.omdbapi.com/?t=${name}&apikey=56d06498',
        responseType: 'json'
    })
    .then(function(response) {
        const data = response.data;
        tabMovies.push({ data, id });
        // Return message
        res.status(200).json({
            message: 'Just added ${id}',
            movie: { data, id }
        });
    });
});
  
/* DELETE a movie */
router.delete('/:id', (req, res) => {
    // Get the :id of the user we want to delete from the params of the request
    const { id } = req.params;
    // Remove from "DB"
    _.remove(tabmovies, ["id", id]);
    // Return message
    res.status(200).json({
        message: 'Just removed ${id}'
    });
});
  
/* UPDATE a movie */
router.post('/:id', (req, res) => {
    // Get the :id of the user we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the user we want to update from the body of the request
    const { movie } = req.body;
    // Find in DB
    const movieToUpdate = _.find(tabMovie, ["id", id]);
    // Update data with new data (js is by address)
    movieToUpdate.movie = movie;
    // Return message
    res.status(200).json({
        message: 'Just updated ${id} with ${movie}'
    });
});
  
module.exports = router;