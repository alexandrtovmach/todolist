const app = require('../server'),
    bodyParser = require('body-parser'),
    path = require('path'),
    dbConnection = require('./db/pgDbConnect'),
    port = 2017;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRoutes = require('./routes/api/routes')(app);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`http://localhost:${port}`);
})
