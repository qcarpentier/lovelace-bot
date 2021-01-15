module.exports = {
	name: 'say',
	description: 'Permet au Bot d\'avoir une conscience.',
	aliases: ['speak', 'parler'],
	private: true,
	args: true,
	guildOnly: true,
	usage: '<phrase que le bot va prononcer>',
	execute(message, args) {
		message.channel.send(args.join(' '));

		message.delete();
	},
};
