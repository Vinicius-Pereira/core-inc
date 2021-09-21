module.exports = app => {
    app.listen(app.get("port"), () => { console.log("Socket API - port " + app.get("port")); })
}