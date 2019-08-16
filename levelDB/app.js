const db = require('./db');
const assert = require('assert');


// db.put('name', 'ankur', function(err){
//     if(err){
//         console.log(err)
//     }
// });

// db.get('name', function(err, value) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(value);
//     }
// })

// db.del('name',function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Deleted successfully')
//     }
// });

// -------------------------- Batch call ---------------------------------------------

// const batch = db.batch();
// batch.put('age', 10);
// batch.put('city', 'Delhi');
// batch.del('name');
// batch.write((err) => {
//     if(err){
//         console.error(err);
//     }
// });

// ---------------------------------------- OR  ----------------

// db.batch()
//     .put('age', 10)
//     .put('city', 'Delhi')
//     .del('name')
//     .write((err) => {
//         if(err){
//             console.error(err);
//         }
//     });

//---------------------------------------- ARRAY VERSION OF BATCH -----------------------------------

// let ops = [
//     { type: 'del', key: 'father' },
//     { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' },
//     { type: 'put', key: 'dob', value: '16 February 1941' },
//     { type: 'put', key: 'spouse', value: 'Kim Young-sook' },
//     { type: 'put', key: 'occupation', value: 'Clown' }
// ]
   
// db.batch(ops, function (err) {
//   if (err) return console.log('Ooops!', err)
//   console.log('Great success dear leader!')
// })

//--------------------------------------- Readable stream -------------------------------------------

// these emitted keys are in sorted order

// let stream = db.createReadStream();

// stream.once('end', function() {  
//     console.log('no more data');
//   });
//   stream.once('close', function() {  
//     console.log('stream closed');
//   });
//   stream.once('error', function(err) {  
//     console.error('stream emitted error:', err);
//   });

// stream.on('data', function(data) {  
//     console.log('%s = %j', data.key, data.value);
// });


// --------------------------------------- READABLE STREAM USING CONDITIONS ----------------------------

// let stream = db.createReadStream({  
//   gte: 'b',
//   lte: 'z'
// });
// stream.on('data', function(record) {  
//     // assert(record.key >= 'a' && record.key <= 'z');
//     console.log('%s = %j', record.key, record.value);
// });

//-------------------------------------------- Limiting the number of result of readable stream -----------

let stream = db.createReadStream({  
    limit: 3 // only interested in the first 10 records
  });
  var count = 0;  
  stream.on('data', 
  function(record) {  
    // assert(++ count <= 10);
    console.log('%s = %j', record.key, record.value);
});