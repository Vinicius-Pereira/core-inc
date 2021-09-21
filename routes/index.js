const { response } = require("express");

module.exports = app =>{
    app.get("/", (request, response) =>{
        response.render("index");
    });

    app.get("/how-to-use", (request, response) =>{
        response.render("how-to-use");
    });

    app.get("/about", (request, response) =>{
        response.render("about");
    });

    app.get("/for-devs", (request, response) =>{
        response.render("for-devs");
    });

    app.get("/documentation", (request, response) =>{
        response.render("documentation");
    });
};