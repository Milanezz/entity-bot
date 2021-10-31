const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "undeafen",
        description: "Undeafen a member in a voice channel",
        usage: "Undeafen <user>",
        aliases: ["undeaf"]
       
    },

    run: async(bot, message, args) => {
     if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Nemas permisija toa da go praes! - [DEAFEN_MEMBERS]**");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Ne mozem da go najdem tagnatiot member na listata!")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided"


        try {
            member.voice.setDeaf(false, reason);
            message.channel.send("Uspesno ✅ : Memberot e undiffenat!")
        } 
        
        catch (error) {
            console.log(error)
            message.channel.send("ERROR. Probaj pokasno!")
        }

    }
}