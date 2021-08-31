const mongoose = require('mongoose');

async function connect() {
  await mongoose.connect(process.env.MONGODB_URL);
}

async function run() {
  try {
    await connect()
    console.log('mongoDb connected')
  }
  catch (err) {
    console.log(err)
  };
}

module.exports = { run }