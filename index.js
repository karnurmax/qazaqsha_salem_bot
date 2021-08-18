/**
 * This example demonstrates setting up a webook, and receiving
 * updates in your express app
 */
/* eslint-disable no-console */

const TOKEN =
  process.env.TELEGRAM_TOKEN ||
  "1748785167:AAEfjVDBAQXYBGGlMw1B_rEzuGv6FnH0Bf0";
const url = "https://qazaqsha-salem-bot.herokuapp.com";
const port = process.env.PORT || 5000;

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook. Вроде лучше устанавливать вручную через Postman
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

bot.on(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello! What Would You Like To Do ^_^", {
    reply_markup: JSON.stringify({
      keyboard: [
        [
          {
            text: "Start Test",
          },
        ],
        [
          {
            text: "My Account",
          },
        ],
        [
          {
            text: "Help",
          },
        ],
        [
          {
            text: "About",
          },
        ],
        [
          {
            text: "Donate",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true, //кнопка пропадает после нажатия
    }),
  });
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
