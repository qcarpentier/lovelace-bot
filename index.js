const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();

const { BOT_TOKEN } = process.env;

bot.on('ready', () => {
    console.log("Bot started.");
});


bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.login(BOT_TOKEN);