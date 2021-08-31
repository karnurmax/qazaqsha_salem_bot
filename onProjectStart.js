const mongoose = require('mongoose');

async function connect() {
  await mongoose.connect(process.env.MONGODB_URL);
}

async function run() {
  connect().then(() => {
    console.log('mongoDb connected')
  })
    .catch(err => console.log(err));
}

module.exports = { run }