const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const discord = require("discord.js");
     
            var argsBericht = args.join(" ");

            var embed1 = new discord.MessageEmbed()
            .setTitle('⚠ Error')
            .setDescription("Enter an embed message")
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
      
          if (!argsBericht) return message.reply(embed1)

            const embed = new discord.MessageEmbed()
            .setDescription(argsBericht)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('#80C3FF')

            message.channel.send(embed)
}
module.exports.help = {
    name: "embed",
    description: "Create an embed",
    category: "Utility",
    aliases: ["say"]
}