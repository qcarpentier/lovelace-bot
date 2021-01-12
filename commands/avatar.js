module.exports = {
  name: "avatar",
  description:
    "Obtiens l'URL de ton avatar ou celui d'un utilisateur mentionné.",
  aliases: ["icon", "pdp"],
  execute(message) {
    if (!message.mentions.users.size) {
      return message.channel.send(
        `🎭 Voici votre avatar: <${message.author.displayAvatarURL({
          dynamic: true,
        })}>`
      );
    }

    const avatarList = message.mentions.users.map((user) => {
      return `🎭 Voici l'avatar de ${user.username}: <${user.displayAvatarURL({
        dynamic: true,
      })}>`;
    });

    message.channel.send(avatarList);
  },
};
