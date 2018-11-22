  
// getCustomer(1,customer);

// function customer(customer){
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies(getMovies);
//   }
// }
// function getMovies(movies){
//   console.log('Top movies: ', movies);
//   sendEmail(customer.email, movies,sendMail );
// }

// function sendMail(){
//   console.log('Email sent...')
// }


// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// getCustomer(1)
//   .then((customer)=>{
//     console.log('Customer: ',customer);
//     if(customer.isGold)
//       getTopMovies()
//       .then(movies=>{
//         console.log('Top movies:', movies);
//         sendEmail(customer.email,movies)
//       })
//       .then(()=>{
//         console.log('Email sent...');
//       })
//   })
  
async function project(){
  try{
    const customer=await getCustomer(1);
    console.log('Customer: ',customer);
    if(customer.isGold){
      const topMovies=await getTopMovies();
      console.log('Top movies:', topMovies);
      const mail=await sendEmail(customer.email,topMovies);
      console.log('Email sent...');
    }
  }catch(err){
    console.log('Error', err.message);
  }
}

project();
function getCustomer(id) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);
  })  
}

function getTopMovies() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}