const taskRepository = require('../../repositories/taskRepository'),
    baseUrl = '/api/plans/';

module.exports = app => {
    app.get(baseUrl, (req, res) => {
        console.log('get');
        taskRepository.getTasks((err, data) => {
            res.send(data.rows);
        });
    })

    app.post(baseUrl, (req, res) => {
        console.log('post', req.body);
        taskRepository.addTask(req.body, (err, data) => {
            res.sendStatus(200);
        });
    })

    app.put(baseUrl + ':id', (req, res) => {
        console.log('put', req.params.id, req.body);
        taskRepository.updateTask(req.params.id, req.body, (err, data) => {
            res.sendStatus(200);
        });
    })

    app.delete(baseUrl + ':id', (req, res) => {
        console.log('delete', req.params.id);
        taskRepository.deleteTask(req.params.id, (err, data) => {
            res.sendStatus(200);
        });
    })
};
