module.exports = {
    config: {
          name: "slowmode",
          description: "Set the slowmode for the channel!",
          aliases: ['sm']
    },
  run: async (bot, message, args) => {
  
    if (!args[0])
      return message.channel.send(
        `Napisi kolku sekunde sakas da bide slowmodot na ovja channel vo sekundi!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`Toa ne e brojka!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `SlowMode: **${args[0]}**`
    );
  },
};