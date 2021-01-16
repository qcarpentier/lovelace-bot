module.exports = {
  name: "say-dm",
  description: "Permet au Bot d'avoir une conscience.",
  aliases: ["speak-dm", "parler-mp"],
  private: true,
  cooldown: 0,
  args: true,
  usage: "<user id> <phrase que le bot va prononcer en mp>",
  execute(message, args) {
    const user = message.client.users.cache.get(args[0]);

    if (!user) return;

    user.send(args.slice(1).join(" "));
    message.delete();
  },
};
