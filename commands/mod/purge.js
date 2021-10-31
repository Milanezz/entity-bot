const { ownerID } = require('../../owner.json') 

module.exports = {
    config: {
        name: "clear",
        aliases: [],
        category: "moderation",
        description: "Deletes messages from a channel",
        usage: "m/clear [amount of messages]"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You Don't Have Sufficient Permissions!- [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**Napisi koliko hoces poruka da izbrises!**');

        if (args[0] > 100)
            return message.channel.send("**Mogu da izbrisem manje od 100!**");

        if (args[0] < 1)
            return message.channel.send("**Napisi vise od 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Uspesno izbrisano \`${messages.size}/${args[0]}\` poruka**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}