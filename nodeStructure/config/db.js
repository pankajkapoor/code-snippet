const mongoose = require('mongoose');


function checkAndConnectDb(){
    // Connect To Database
    mongoose.connect(process.env.DB, { useNewUrlParser: true },function (err) {
        if (err) {
            console.log('Database connect error: ' + err);
        }
    });
    // On Connection
    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });
    // On Error
    mongoose.connection.on('error', (err) => {
        console.log('Database check connection error: ' + err);
    });
    // On Disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('Database connected');
    });
}

checkAndConnectDb();