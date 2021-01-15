module.exports = {
    name: 'clean-channel',
    description: 'Permet de clean un channel complet.',
    aliases: ['clearchannel', 'cc', 'clean'],
    private: true,
    execute(message) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results);
            });
        }
    },
};
