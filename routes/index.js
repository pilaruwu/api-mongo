const express = require("express")
const routesUsuarios = require("./routesUsuarios")
const routesRoles = require("./routesRoles")

function routerApi(app) {
    app.use('/usuarios', routesUsuarios)
    app.use('/roles', routesRoles)
}

module.exports = routerApi;