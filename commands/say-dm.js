module.exports = {
  name: "say-dm",
  description: "Permet au Bot d'avoir une conscience.",
  aliases: ["speak-dm", "parler-mp"],
  args: true,
  guildOnly: true,
  usage: "<user id> <phrase que le bot va prononcer en mp>",
  execute(message, args) {
    const user = message.client.users.cache.get(args[0]);

    console.log(user);
    if (!user) return;

    const messageToSend = args.shift();

    user.send(args.join(" "));

    message.delete();
  },
};
