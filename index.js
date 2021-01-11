const Discord = require('discord.js');
require('dotenv').config();
const bot = new Discord.Client();

const { BOT_TOKEN, PREFIX } = process.env;

bot.on('ready', () => {
    console.log("Bot started.");
});

// Runs whenever a new user is added to the server
bot.on("guildMemberAdd", member => {
  console.log("New member!");
});

bot.on('message', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    message.reply('Pong!');
  } 
});

bot.login(BOT_TOKEN);