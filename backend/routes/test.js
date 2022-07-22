const express = require("express");
const routes = express.Router();

// Get Routes 

const setSession = require("../set_session");

const getSession = require("../get_session");

const destroySession = require("../destroysession");

// Use Routes

routes.use(setSession);

routes.use(getSession);

routes.use(destroySession);

module.exports = routes;
