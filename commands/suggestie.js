const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

         const channel1 = "review_channel";
         const channel = message.guild.channels.cache.get(channel1)
            if(!channel) console.log("No channel was fount!");
    
    
            var argsBericht = args.join(" ");
            var embed1 = new discord.MessageEmbed()
            .setTitle('⚠ Error')
            .setDescription("Enter an suggestion message")
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
      
          if (!argsBericht) return message.reply(embed1)
            
    
            const embed = new discord.MessageEmbed()
            .setTitle("💡 Suggestion")
            .setDescription(argsBericht)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('#80C3FF')
            

            const embed3 = new discord.MessageEmbed()
            .setTitle("✅ Succes")
            .setDescription("Your suggestion was send")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('GREEN')

            message.channel.send(embed3)
            
            channel.send(embed).then (async (msg) => {
    
                await msg.react("✅");
                await msg.react("❌");
                message.delete();
            }).catch(err => {
                console.log(err);
            });
        }
        

module.exports.help = {
    name: "suggest",
    description: "Do a server suggestion",
    category: "Utility",
    aliases: ["suggest"]
}