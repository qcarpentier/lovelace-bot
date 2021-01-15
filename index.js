const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
const prefix = process.env.PREFIX;

const bot = new Discord.Client({
	partials: ['CHANNEL', 'MESSAGE', 'REACTION'],
});
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

// Dynamically reading command files
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// Runs whenever the bot is up & running
bot.once('ready', () => {
	console.log('Bot started.');
});

bot.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) {
		try {
			await reaction.message.fetch();
		}
		catch (error) {
			console.error('Une erreur s\'est produite lorsque j\'ai fetch la réaction ', error);
		}
	}

	if (reaction.message.id === '798821664171360289' && reaction.emoji.name === '🦾') {
		const regloRole = reaction.message.guild.roles.cache.find(
			(r) => r.name === 'Réglo',
		);
		const ptiteFrappeRole = reaction.message.guild.roles.cache.find(
			(r) => r.name === 'Ptite frappe',
		);

		const member = reaction.message.guild.members.cache.find(
			(m) => m.id === user.id,
		);

		if (member.roles.cache.find((r) => r.name === 'Ptite frappe')) {
			member.roles.remove(ptiteFrappeRole);
			member.roles.add(regloRole);
		}
	}
});

bot.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.message.partial) {
		try {
			await reaction.message.fetch();
		}
		catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
		}
	}

	if (reaction.message.id === '798821664171360289' && reaction.emoji.name === '🦾') {
		const regloRole = reaction.message.guild.roles.cache.find(
			(r) => r.name === 'Réglo',
		);
		const ptiteFrappeRole = reaction.message.guild.roles.cache.find(
			(r) => r.name === 'Ptite frappe',
		);

		const member = reaction.message.guild.members.cache.find(
			(m) => m.id === user.id,
		);

		if (member.roles.cache.find((r) => r.name === 'Réglo')) {
			member.roles.remove(regloRole);
			member.roles.add(ptiteFrappeRole);
		}
	}
});

// Runs whenever a new user is added to the server
bot.on('guildMemberAdd', (member) => {
	console.log('New member!');

	const role = member.guild.roles.cache.find(
		(r) => r.name === 'Ptite frappe',
	);
	member.roles.add(role);
});

// Runs whenever a new message has been sent
bot.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const commandName = args.shift().toLowerCase();

	// Dynamically executing commands (command can have aliases)
	const command =
		bot.commands.get(commandName) ||
		bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		return message.channel.send(
			'Malheureusement, je ne connais pas encore cette commande. Vous pouvez proposer votre idée dans le channel `#suggestions-bot`!',
		);
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply(
			'Je ne peux pas effectuer cette commande dans mes messages privés! 😵',
		);
	}

	if (command.args && !args.length) {
		let reply = `Tu ne m'as pas donné de paramètre(s), ${message.author}! 🤨`;

		if (command.usage) {
			reply += `\nIl faut utiliser la commande comme suit: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// Cooldowns feature to avoid spam
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;

			return message.reply(
				`merci d'attendre ${timeLeft.toFixed(
					0,
				)} seconde(s) avant de réutiliser la commande \`${prefix}${command.name
				}\`. 👮🏻‍♀️`,
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	// End Cooldowns

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('Il y a eu une erreur quand j\'ai exécuté la commande! 🤒');
	}
});

bot.login(token);
