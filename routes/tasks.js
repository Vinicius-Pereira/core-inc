module.exports = app => {
    const Tasks = app.models.tasks;
    app.get("/tasks", (request, response) => {
        Tasks.findAll({}, (tasks) => {
            response.json({tasks: tasks});
        });
    });
};
