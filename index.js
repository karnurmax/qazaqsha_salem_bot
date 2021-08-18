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

function generateQuestions() {
  //будущие вопросы будут генерироваться в зависимости от ответов на первые (сложность)
  for(let i = 0; i< 10 ; i++) {
    bot.sendMessage(msg.chat.id,`Question #${i}`)
  }
}

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

bot.on("Start Test", (msg) => {
  //   нужно создать функцию которая сгенерирует 10 вопросов в зависимости от уровня пользователя
  generateQuestions()
  bot.sendMessage(msg.chat.id, `First Question! What is HTML?`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Hyper Type Markup Linguistics",
            callback_data: "HTML1",
          },
        ],
        [
          {
            text: "Hyper Text Markup Language",
            callback_data: "HTML2",
          },
        ],
        [
          {
            text: "Hydro Type Marketing Language",
            callback_data: "HTML3",
          },
        ],
        [
          {
            text: "Hyper Type Mars Language",
            callback_data: "HTML4",
          },
        ],
      ],
    },
  });
  bot.on("callback_query", (callbackQuery) => {
    const msg = callbackQuery.message;
    if (msg == "HTML2") {
      bot
        .answerCallbackQuery(callbackQuery.id) //бот обязан ответить answerCallbackQuery чтобы кнопки пропали с сообщения
        .then(() => bot.sendMessage(msg.chat.id, "YOU ARE RIGHT!"));
    } else {
      bot
        .answerCallbackQuery(callbackQuery.id)
        .then(() => bot.sendMessage(msg.chat.id, "you are wrong!"));
    }
  });
});

bot.on("My Account", (msg) => {
  //generate unique ID
  //Show user's balance
  bot.sendMessage(msg.chat.id, `=============\nAccound ID: 20319\nBalance: 0 KZT`)
});

bot.on("Help", (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "There's no help available currenty, PM to @cheenv"
  );
});

bot.on("About", (msg) => {
  bot.sendMessage(msg.chat.id, "With love from KZ");
});

bot.on("Donate", (msg) => {});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});
