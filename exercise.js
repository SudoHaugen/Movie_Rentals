/* 
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...');
      });
    });
  }
}); */

displayCostumer();  

async function displayCostumer() {
  try {
    let costumer = await getCustomer(1);
    let topMovies = await getTopMovies(costumer.isGold);
    let email = await sendEmail(costumer.email, topMovies);
    console.log(costumer, topMovies, email);
  } catch(err) {
    console.log('Error', err.message);
  }
}

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: id, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Email sendt to costumer`);  
    }, 4000);
  });
}