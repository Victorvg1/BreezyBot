const discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async (client, message, args, prefix) => {

  try {

    var embed1 = new discord.MessageEmbed()
      .setTitle('⚠ Error')
      .setDescription("You have to give a log channel")
      .setColor("RED")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()

    if (!args[0]) return message.reply(embed1)
    let channel = message.mentions.channels.first();

    db.set(`ticketlog_${message.guild.id}`, channel.id)

    var embed = new discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("✅ Succes")
      .setDescription(`The ticket log channel was set`)
      .addField("Channel", `${channel}`)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed)


  } catch (e) {
    console.log(e)
  }
}
module.exports.help = {
  name: "setticketlog",
  category: "Radio",
  aliases: ["setticketlog"]
}