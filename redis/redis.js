const redis = require('redis');

const redisUrl = 'redis://127.0.0.1:6379';
const  client = redis.createClient(redisUrl);

client.on('error', (err) => {
    console.log("Error " + err)
});

let keyNumber = 1
client.set(keyNumber, JSON.stringify({name: 'ankur'}), redis.print);

client.get(keyNumber, function(error, result) {
    if (error) throw error;

     console.log('GET result ->', JSON.parse(result))
});


// let arrOfObj = [{
//     name: 'abc',
//     age: 10
// },{
//     name: 'xyz',
//     age: 12
// }];
// client.set('key', JSON.stringify(arrOfObj), redis.print);
// client.get('key', (err, result) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(JSON.parse(result));
//         // console.log('---------------------------------------------------------')

//     }
// });


// client.hset('HSET record', 'key', 'value', redis.print);
// client.hset('HSET record', 'second key', 'second value', redis.print);
// client.hgetall('HSET record', function(err, result) {
//   console.log(result);
// });
