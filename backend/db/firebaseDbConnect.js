function dbConnectionHandler() {
    const admin = require("firebase-admin"),
        serviceAccount = require("../config/serviceAccountKey.json"),
        config = require("../config/firebase");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: config.databaseURL,
        databaseAuthVariableOverride: {
            uid: config.uid
        }
    });

    this.ref = admin.database().ref("tasks");
    this.test = () => {
        return this.ref = admin.database().ref("test");
    }

    // connecting request
    this.ref.once('value')
    .then(() => {
        console.log('\n============================\n=== Firebase connected ===\n============================\n');
    })
    .catch((errorObject) => {
        console.log('\n!!!!Firebase CONNECTION ERROR!!!!\n', errorObject.code);
    });
}

module.exports = new dbConnectionHandler();
