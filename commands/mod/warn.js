const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "warn",
        description: "warn members",
        usage: "m/warn <mention member/member id> [reason]",
        aliases: []
    },
    run: async (bot, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Nemas permisija toa da go napraes! ❌**")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply("Tagni go memberot sto sakas da go warn!");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(No Reason Provided)";
            
            member.send(`Ti si warnat od strana na <${message.author.username}> za: ${reason}`)
            .catch(error => message.channel.send(`Sorry <${message.author}> I couldn't n't warn because of : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn__**")
            .setDescription(`**<@${member.user.id}> e warnat od strana na  <@${message.author.id}>**`)
            .addField(`**Reason:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Moderator:**`, `${message.author}`)

            message.channel.send(warnEmbed)

    }
}