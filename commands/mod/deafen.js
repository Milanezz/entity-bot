const { ownerID } = require("../../owner.json")

module.exports = {
    config: {
    
        name: "deafen",
        description: "Deafen a member in a voice channel",
        usage: "deafen <user>",
        aliases: ["deaf"]
       
    },

    run: async(bot, message, args) => {
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**Nemas dovolno permisija za da go napraes toa! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());

        if(!member) return message.channel.send("Ne mogu da ga nadjem!")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided"


        try {
            member.voice.setDeaf(true, reason);
            message.channel.send("Success ✅ : Member je deffenat")
        } 
        
        catch(error) {
            console.log(error)
            message.channel.send("Oops! An unknown error occured. Please try again later.")
        }

    }
}