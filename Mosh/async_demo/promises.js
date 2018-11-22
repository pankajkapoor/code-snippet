/**
 * Promise is an object that holds the eventual result of an aynchronous operation.
 * When an asynchrnous opeartion is completed then it either results in error or result.
 * Therefore a promise promises you to give a result of an asynchronous operation.
 * A promise object can be in 3 states
 * 1) Pending
 * 2) Fulfilled---(result)
 * 3) Rejected--(error)
 */


//  const p = new Promise((resolve, reject)=>{
//      // Kick off some async work
//      // ...
//      setTimeout(()=>{
//         // resolve(1); //pending=> resolved, fulfilled
//      reject(new Error('message'));  // pending => rejected
//      },2000); 
//  })

//  p
//   .then(result => console.log('Result', result))
//   .catch(err=>console.log('Error',err.message));


  console.log('Before');
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     })
//   })
// });

getUser(1)
    .then(user=> getRepositories(user.gitHubUsername))
    .then(repos=>getCommits(repos[0]))
    .then(commits=> console.log('commits', commits))
    .catch(err =>console.log('Error', err.message));

console.log('After');


function getUser(id) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
          }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
          }, 2000);
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
          }, 2000);
    });
}