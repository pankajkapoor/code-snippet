
// const p=Promise.resolve({id:1});   // this is a promise that is already resolved
// p.then(result=> console.log(result));

// const pro=Promise.reject(new Error('Reason for Rejection...'));
// pro.catch(error => console.log(error))


/** 
 * Running Parallel Promises
 * In this there is no multi-threading 
 * we are still doing this using a single thread
 * Single thread is executing it almost simultaneously
*/

const p1=new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Async operation 1...");
        resolve(1);
    }, 2000);
});

const p2=new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Async operation 2...");
        resolve(2);
    }, 2000);
});

Promise.all([p1,p2])
       .then(result=>console.log(result));

//////////////////// if one of the two promise fails///////////////
/**
 * In the case if one promise fails then the resultant promise also gives error 
 */

const p3=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Async operation 1...");
        reject(new Error('Because Something failed'));
    }, 2000);
});

const p4=new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Async operation 2...");
        resolve(2);
    }, 2000);
});

Promise.all([p3,p4])
       .then(result=>console.log(result))
       .catch(err =>console.log(err.message));

////////////// If we want to do somthing as soon as one of the promise is fulfilled/////////////

const p5=new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Async operation 1...");
        resolve(1);
    }, 2000);
});

const p6=new Promise(resolve=>{
    setTimeout(()=>{
        console.log("Async operation 2...");
        resolve(2);
    }, 2000);
});

Promise.race([p5,p6])   // as soon as a promise is fulfilled it is returned
       .then(result=>console.log(result));

// in this case result is not the array but the value of first fulfilled promise