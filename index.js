const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const { BOT_TOKEN, PREFIX } = process.env;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Dynamically reading command files
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

// Runs whenever the bot is up & running
bot.on("ready", () => {
  console.log("Bot started.");
});

// Runs whenever a new user is added to the server
bot.on("guildMemberAdd", (member) => {
  console.log("New member!");
});

// Runs whenever a new message has been sent
bot.on("message", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command))
    return message.channel.send(
      "Malheureusement, je ne connais pas encore cette commande. Vous pouvez proposer votre idée dans le channel `#suggestions`!"
    );

  // Dynamically executing commands
  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("Il y a eu une erreur quand j'ai exécuté la commande!");
  }
});

bot.login(BOT_TOKEN);
