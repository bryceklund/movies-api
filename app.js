require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const MOVIES = require('./movies-data.json');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_KEY;
    const authToken = req.get('Authorization');
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next();
})

app.get('/movie', (req, res) => {
    const { genre, country, avg_rating } = req.query;
    let response = MOVIES;
    if (genre) {
        response = response.filter(movie => {
            return movie.genre.toLowerCase().includes(genre.toLowerCase())
        });
    }
    if (country) {
        response = response.filter(movie => {
            return movie.country.toLowerCase().includes(country.toLowerCase())
        });
    }
    if (avg_rating) {
        response = response.filter(movie => {
            return movie.avg_vote >= Number(avg_rating)
        });
    }
    res.json(response);
});


module.exports = app;