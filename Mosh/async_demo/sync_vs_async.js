console.log('Before');
console.log('After');
/**
 * Above code is an example of synchronous because first of all firtst console.log() will be executed then 
 * then the second one 
 */



 // Asynchrous code

 console.log('Before');
 setTimeout(()=>{
     console.log('Reading a user from database....');
 },2000);

 console.log('After');