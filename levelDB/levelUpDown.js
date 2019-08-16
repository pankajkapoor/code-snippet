const leveldown = require("leveldown");
const levelup = require("levelup");
// const level = require('level');
// const db = level("./../DatabaseBlockchainMonitor/EOSdb");

const db = levelup(leveldown("./../DatabaseBlockchainMonitor/EOSdb"));

// db.put('name','ankur', (err) => {
//     if(err) console.log(err)
//     else console.log('saved successfylly saved');
// })


// db.get('name', (err, result) => {
//     if(err) console.log('-----------')
//     else console.log(result.toString());
// })