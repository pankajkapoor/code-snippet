const Promise = require('bluebird');
let promiseArr = [];
let ranum;

for(let i=0;i<=10;i++){
    ranum = Math.random();
    ranum = Math.trunc( ranum * 10) % 7;
   console.log('i: ',i,' ran: ', ranum);
    promiseArr.push(new Promise((resolve, reject)=>{
        setTimeout(function(){
            resolve(i)
        },ranum*1000)
    }));
}
for(let i=9;i<=0;i--){
    promiseArr[i].then(res=>{
        console.log(res);
    })
}
// Promise.map(promiseArr, (num) => {
//     console.log(num);
// })//.then(result => console.log(result)).catch(console.error)