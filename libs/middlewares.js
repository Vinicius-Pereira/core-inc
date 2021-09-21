module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'ejs');

}