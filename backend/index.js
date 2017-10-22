const app = require('../server'),
    polifills = require('./config/polifills'),
    bodyParser = require('body-parser'),
    path = require('path'),
    dbConnection = require('./db/pgDbConnect'),
    port = 2017;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.choosedDB = 'fb';

const apiRoutes = require('./routes/api/routes')(app);

app.get('/api/changedefaultdb/:db', (req, res) => {
    if (req.params.db === 'pg' || req.params.db === 'fb') {
        app.choosedDB = req.params.db;
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`http://localhost:${port}`);
})

module.exports = app;
