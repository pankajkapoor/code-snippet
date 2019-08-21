// let promise1 = new Promise(
//     function(resolve, reject) {
//         setTimeout(
//             function() {
//                 resolve('hello');
//             }, 1000);
//   });

//   let promise2 = new Promise(
//     function(resolve, reject) {
//         setTimeout(
//             function() {
//                 resolve('hi');
//             }, 5000);
//   });

//   Promise.all([promise1, promise2]).then((data)=> console.log(data))

// Promise.reject(new Error('fail'))
//     .then((result) =>{
//         console.log(result);
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// -------------------------------------------------------------------------------------------------------------------.

const request = require('request');

(async function google(){
    search()
        .then(data => console.log(data))
        .catch(err => console.log(err));

})();


function search(){
    return new Promise(function(resolve, reject){
        request('https://www.google.com', function(err, res, body){
            console.log('err: ', err)
            console.log('res: ', res)
            console.log('body: ', body)
        })
    })
}