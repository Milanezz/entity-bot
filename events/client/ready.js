const { PREFIX, LAVA_HOST, LAVA_PASSWORD, LAVA_PORT  } = require('../../config');
const { MessageEmbed } = require("discord.js")

module.exports = async bot => {
    console.log(`${bot.user.username} je upaljen!`)
    setInterval(() => bot.user.setActivity(`${PREFIX}help`, { type: "WATCHING" }),5000)
    
};
