const taskService = require('../../services/taskService'),
    baseUrl = '/api/plans/';

module.exports = app => {
    app.get(baseUrl, (req, res) => {
        // console.log('get');
        taskService.getTasks((err, data) => {
            // console.log('getRESULT', data);
            res.send(data);
        }, app.choosedDB);
    })

    app.post(baseUrl, (req, res) => {
        // console.log('post', req.body);
        taskService.addTask(req.body, (status) => {
            res.sendStatus(status);
        }, app.choosedDB);
    })

    app.put(baseUrl + ':id', (req, res) => {
        // console.log('put', req.params.id, req.body);
        taskService.updateTask(req.params.id, req.body, (status) => {
            res.sendStatus(status);
        }, app.choosedDB);
    })

    app.delete(baseUrl + ':id', (req, res) => {
        // console.log('delete', req.params.id);
        taskService.deleteTask(req.params.id, (status) => {
            res.sendStatus(status);
        }, app.choosedDB);
    })
};
