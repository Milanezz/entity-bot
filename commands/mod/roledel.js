const { MessageEmbed } = require("discord.js");
module.exports = {
  config: {
    name: "roledel",
    description: "Remove a role from a member",
    usage: "m/roledel <member mention/member id> <role mention/role id>",
    aliases: ['role del', 'role delete', 'rdel']
  },
  run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Nemas permisija ova da go napraes!")

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!rMember) return message.channel.send("Tagni go memberot sto sakas da mu go trgnes rolot!.")
    
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
    
    if(!role) return message.channel.send("Napisi koj role sakas da mu trgnes na memberot!.") 
    

    if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("Nemam permisija ova da go napraem!")

    if(!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
      .setColor(`#FF0000`)
      .setDescription(`Error ❌ | ${rMember.displayName}, go nema rolot!`);

      return message.channel.send(rolDEL_err)
    
    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))
      
      let rolDEL = new MessageEmbed()
      .setColor(`#00FF00`)
      .setDescription(`Uspesno ✅ | ${rMember} e trgnat od **${role.name}**`)

      message.channel.send(rolDEL)
    
    }

  },
};
