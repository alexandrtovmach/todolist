function dbConnectionHandler() {
    const admin = require("firebase-admin"),
        serviceAccount = require("../config/serviceAccountKey.json"),
        config = require("../config/firebase");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: config.databaseURL
    });


    const database = admin.firestore();

    var docRef = database.collection('name');
    
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    // console.log(firestore.collection('name'));
    // const docRef = firestore.doc('bere')

    // const dbRef = admin.database().ref().child('text');
    // dbRef.on('value', snap => {
    //     console.log(snap.val());
    // })
}

module.exports = new dbConnectionHandler();
