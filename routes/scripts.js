module.exports = app => {
    const Scripts = app.models.script;
    app.route("/scripts")
        .post((request, response) => {

            Scripts.write(request, (script, error) => {
                if (error) {
                    console.log(error.message);
                    response.status(500).send(error.message);
                } else {
                    response.json({ script: script })
                }
            });

        });
};
