/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN = process.env.TELEGRAM_TOKEN;
const url = 'https://qazaqsha-salem-bot.herokuapp.com';
const port = process.env.PORT || 5000;

const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Qazaqsha telegram bot')
})
// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
  console.log(msg);
  bot.sendMessage(msg.chat.id, `Salem, @${msg.from.username}. your msg:${JSON.stringify(msg, null, '\t')}`);
});

bot.onText(/test/, msg => {
  bot.sendMessage(msg.chat.id, `cmd: ${JSON.stringify(msg, null, '\t')}`)
})
