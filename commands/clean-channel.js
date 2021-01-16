require("dotenv").config();
const prefix = process.env.PREFIX;

module.exports = {
  name: "clean-channel",
  description: "Permet de clean un channel complet.",
  aliases: ["clearchannel", "cc", "clean"],
  private: true,
  cooldown: 0,
  execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      if (args.length > 0) {
        const numberOfMessages = parseInt(args[0]);
        if (!Number.isNaN(numberOfMessages)) return message.channel.bulkDelete(numberOfMessages);
        else {
          const msg = [];
          msg.push(`Pour supprimer des messages dans un channel, il faut que tu me donnes le nombre de messages à supprimer.`);
          msg.push(`Si tu ne me donnes pas de paramètre, je supprimerai tous les messages du channel!`);
          msg.push(`Par exemple: \`${prefix}${this.name} 10\` (supprimer les 10 derniers messages) ou \`${prefix}${this.name}\` (tout supprimer)`);
          msg.push(`\nN'oublie pas: un grand pouvoir implique de grandes responsabilités :spider_web:`);
          message.author.send(msg);
        }
      } else {
        message.channel.messages.fetch().then((results) => {
          message.channel.bulkDelete(results);
        });
      }

      return message.delete();
    }
  },
};
