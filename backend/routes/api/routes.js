module.exports = function (app) {
    return {
        taskRoutes: require('./taskRoutes')(app)
    };
};
