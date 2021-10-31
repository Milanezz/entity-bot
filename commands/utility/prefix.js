const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "prefix",
        description: "Chnage/Know The server's Prefix or the Global Prefix",
        usage: "m/prefix <new prefix/reset>",
        example: "1) m/prefix = \n2) m/prefix reset",
        aliases: ["prefix"]
    },

    run: async (bot, message, args) => {
        let option = args[0];

            //PERMISSION
     if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("Ti nemas permisija da mi go promenis perfixot")
              }
            
            if(!option) {
                prefix = db.fetch(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**\nMoj prefix za \`${message.guild.name}\`  je  **` + `  \`${prefix}\` \n**Koristi \`${prefix}help\` za help**`)
              
              message.channel.send(prefEmbed);
            }

            if(option.toLowerCase() === "reset") {
                db.delete(`prefix_${message.guild.id}`)
                return await message.channel.send("Resetiran Prefix ✅")
            }
            
            if(args[1]) {
              return message.channel.send("You can not set prefix a double argument")
            }
            
            if(args[0].length > 4) {
              return message.channel.send("Ne mozes da napravis prefix povece od 4 karakteri!")
            }
            
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.channel.send("Resetiran Prefix ✅")
            }
            
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.channel.send(`Uspesno ✅ | Bot Prefix napraen na  ${args[0]}`)
            

        }
        
    }