console.log('Before');
getUser(1,getRepositories);
console.log('After');

function getRepositories(user){
    getReopsitries(user.gitHubUserName,getCommits);
}
function getCommits(repos){
    getCommits(repos,displayCommits);
}
function displayCommits(commits){
    console.log(commits);
}
function getUser(id,callback1){
   setTimeout(()=>{
       console.log('Reading a user from database....');
       callback1({id:id, gitHubUserName: 'ankur'})
   },2000);
}

function getRepositories(user,callback2){
    setTimeout(()=>{
        console.log('Git Hub API calling...');
        callback2(['repo1', 'repo2','repo3'])
    },2000);
}

function getCommits(repos,callback3){
    setTimeout(()=>{
        callback3(repos);
    });
}