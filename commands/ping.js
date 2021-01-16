module.exports = {
  name: "ping",
  description: "Ping",
  usage: [""],
  cooldown: 5,
  execute(message) {
    message.channel.send("Pong!");
  },
};
