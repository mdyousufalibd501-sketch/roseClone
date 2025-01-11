const express = require("express");
const { Telegraf } = require("telegraf");
require("dotenv").config();

// Initailize our bot & SEVER
const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const username = ctx.from.username || ctx.from.first_name || "Bro";
  ctx.reply(`Welcome to my bot bro, ${username}`);
});

// Create For welcome Bot Message.

bot.on("new_chat_members", (ctx) => {
  const newMembers = ctx.message.new_chat_members;
  const chatId = ctx.message.chat.id; //SPECIFY TO KNOW WHERE WE WILL SEND BACK A MESSAGE
  newMembers.forEach((member) => {
    const username = member.username || member.first_name;
    ctx.telegram.sendMessage(
      chatId,
      `Hey there ${username}, Welcome to my humble Abode, ${username} Feel at home, Appreciate you champ`
    );
  });
});
bot.on("left_chat_member", (ctx) => {
  const leftUser =
    ctx.message.left_chat_member.username ||
    ctx.message.left_chat_member.first_name ||
    "My bro";
  const chatId = ctx.message.chat.id;
  ctx.telegram.sendMessage(
    chatId,
    `Hello, sorry you had to leave, But we expecting you back soon, ${leftUser} We'll miss you🤭`
  );
});

bot.launch().then(() => {
  console
    .log("bot is running")
    .catch((err) => console.log(`Eroor starting bot:${err}`));
});

// LISTEN FOR PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT);
