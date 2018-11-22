
 console.log('Before');
 const user= getUser(1);
 console.log(user);
 console.log('After');


 function getUser(id){
    setTimeout(()=>{
        console.log('Reading a user from database....');
        return {id:id, gitHubUserName: 'ankur'}
    },2000);
 }

/**OUTPUT:
 * 
 * Before
 * undefined
 * After
 * Reading a user from database....
 * 
 * 
 * 
 * in this program console.log(user) gives undefined
 * In order to deal with this we can use
 * Callbacks
 * Promises
 * Async/await
 * 
 */