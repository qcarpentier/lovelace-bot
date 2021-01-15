require('dotenv').config();
const prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	description: 'Liste de toutes les commandes ou information sur une commande spécifique.',
	aliases: ['commands', 'commandes', 'aide'],
	usage: ['', '[nom de la commande]'],
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push(
				'Voici une liste des commandes disponibles sur le serveur de **Loosha**:',
			);
			// Get only public commands and remove " - " from the final one
			data.push(commands.map((command) => {
				if (!command.private) return `\`${prefix}${command.name}\` - `;
			}).join('').toString().slice(0, -2));
			data.push(
				`\nVous pouvez aussi utiliser \`${prefix}help [nom de la commande]\` pour avoir des informations à propos d'une commande spécifique! 😋`,
			);

			return message.author
				.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply(
						'je t\'ai envoyé un MP avec toutes les commandes disponibles sur le serveur! 😊',
					);
				})
				.catch((error) => {
					console.error(
						`Je n'ai pas su envoyer un MP à ${message.author.tag}.\n`,
						error,
					);
					message.reply(
						'apparemment je n\'ai pas su t\'envoyer un MP! Les as-tu désactivé? 😧',
					);
				});
		}

		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		if (!command || command.private) {
			return message.reply('cette commande n\'existe pas! 🥴');
		}

		data.push(`**Voici les informations de la commande \`${prefix}${command.name}\`**\n`);
		data.push(`🏷️ Nom: \`${command.name}\`\n`);

		if (command.aliases) { data.push(`💡 Alias: ${command.aliases.map(alias => `\`${prefix}${alias}\``).join(', ')}\n`); }
		if (command.description) { data.push(`📚 Description: \`${command.description}\`\n`); }
		if (command.usage) {
			// Returns multiple usages dynamically 
			data.push(`🔑 Utilisation: ${command.usage.map(u => {
				if (u) return `\`${prefix}${command.name} ${u}\``;
				return `\`${prefix}${command.name}\``;
			}).join(' ou ')}`);
		}

		data.push(
			`⏳ Délais de récupération: \`${command.cooldown || 3} seconde(s)\``,
		);

		message.channel.send(data, { split: true });
	},
};
