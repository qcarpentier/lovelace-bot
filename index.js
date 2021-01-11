const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const { BOT_TOKEN, PREFIX } = process.env;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

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

  if (command === 'ping') {
		bot.commands.get('ping').execute(message, args);
	} 
});

bot.login(BOT_TOKEN);