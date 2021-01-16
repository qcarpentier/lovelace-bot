module.exports = {
  name: "server",
  description: "Indique des informations sur le serveur.",
  aliases: ["server-info"],
  usage: [""],
  cooldown: 0,
  execute(message) {
    message.client.guilds.cache.forEach((guild) => {
      message.channel.send(`Le serveur a un total de **${guild.memberCount} membres**! La hype deviendrait-elle réelle? 🤩`);
    });
  },
};
