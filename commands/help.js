require('dotenv').config();
const config = require('../config.json');

module.exports = {
	name: 'help',
	description:
    'Liste de toutes les commandes ou information sur une commande spécifique.',
	aliases: ['commands, commandes, aide'],
	usage: '[nom de la commande]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push(
				'Voici une liste des commandes disponible sur le serveur de **Loosha**:',
			);
			data.push(commands.map((command) => command.name).join(', '));
			data.push(
				`\nVous pouvez aussi utiliser \`${config.prefix}help [nom de la commande]\` pour avoir des informations à propos d'une commande spécifique!`,
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

		if (!command) {
			return message.reply('cette commande n\'existe pas! 🥴');
		}

		data.push(`🏷️ Nom: \`${command.name}\`\n`);

		if (command.aliases) {data.push(`💡 Alias: \`${command.aliases.join(', ')}\`\n`);}
		if (command.description) {data.push(`📚 Description: \`${command.description}\`\n`);}
		if (command.usage) {
			data.push(
				`🔑 Utilisation: \`${config.prefix}${command.name} ${command.usage}\`\n`,
			);
		}

		data.push(
			`⏳ Délais de récupération: \`${command.cooldown || 3} seconde(s)\``,
		);

		message.channel.send(data, { split: true });
	},
};
