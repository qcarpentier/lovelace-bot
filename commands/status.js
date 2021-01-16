require("dotenv").config();
const prefix = process.env.PREFIX;

module.exports = {
  name: "status",
  description: "Change the bot status.",
  aliases: ["botstatus"],
  private: true,
  cooldown: 0,
  args: true,
  execute(message, args) {
    const activityTypes = ["PLAYING", "STREAMING", "LISTENING", "WATCHING", "COMPETING"];

    if (!activityTypes.includes(args[0])) {
      const msg = [];
      msg.push(`Je ne reconnais pas l'activité que tu m'as donnée... 😯\n`);
      msg.push(`Les activités que je peux reconnaître sont les suivantes:`);
      msg.push(
        activityTypes
          .map((activity) => `\`${activity}\` - `)
          .join("")
          .toString()
          .slice(0, -2)
      );
      msg.push(`Par exemple: \`${prefix}${this.name} PLAYING Among Us\``);
      msg.push(`\nEssaie de mettre l'activité en majuscule. 😄`);

      message.author.send(msg);
      return message.delete();
    }

    const activityType = args.shift();
    message.client.user.setPresence({
      activity: {
        name: args.join(" "),
        type: activityType,
      },
    });

    return message.delete();
  },
};
