const mongoose = require('mongoose');
const NewChatMember = require('./db/models/NewChatMember')
async function connect() {
  await mongoose.connect(process.env.MONGODB_URL);
}

async function run() {
  try {
    await connect()
    const newChatMember = new NewChatMember({userId:'testUserId', questionText: 'what is your name ?', expiredAt: new Date()});
    newChatMember.save(function (err) {
      if (err){
        console.log('error on creating test rows:',err)
      }else{
        console.log('successful craeted new test rows')
      }
      
    })
    console.log('mongoDb connected')
  }
  catch (err) {
    console.log(err)
  };
}

module.exports = { run }