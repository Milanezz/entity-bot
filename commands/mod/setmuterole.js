const db = require("quick.db");

module.exports = {
  config: {
    name: "setmuterole",
    aliases: ["setmute", "smrole", "smr"],
    description: "Sets A Mute Role For Muted Users!",
    usage: "[role name | role mention | role ID]",
  },
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**Ti nemas dovolno permisija! - [ADMINISTRATOR]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`muterole_${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send(
          `**Muterole Set In This Server Is \`${roleName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Napisi rolename/ID!**"
        );
    }

    let role =
      message.mentions.roles.first() ||
      bot.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send("**Napisi validen rolename/ID!**");

    try {
      let a = await db.fetch(`muterole_${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send(
          "**Ovoj role e vise napraen za mute!**"
        );
      } else {
        db.set(`muterole_${message.guild.id}`, role.id);

        message.channel.send(
          `**\`${role.name}\` e uspesno napraen kako muterole!**`
        );
      }
    } catch (e) {
      return message.channel.send(
        "**Error - `Nema permisija ili ne postoi rolot!`**",
        `\n${e.message}`
      );
    }
  }
};
