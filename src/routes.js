const express = require('express');

const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/products', ProductController.store);

module.exports = routes;