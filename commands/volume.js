const { MessageEmbed } = require('discord.js')
const distube = require('distube')
module.exports.run = async (client, message, args) => {


    var embed12 = new MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Please be sure to join a voice channel")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!message.member.voice.channel) return message.reply(embed12)

    var embed1234 = new MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("You need to give a volume between 2-200")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

    var embed12345 = new MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("You need to give a volume between 2-200")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

    const queue = client.distube.getQueue(message)
    var embed123 = new MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Nothing is playing right now")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!queue) return message.channel.send(embed123)
    const volume = parseInt(args[0])
    if (!volume || volume < 2 || volume > 200) return message.channel.send(embed1234)
    if (isNaN(volume)) return message.channel.send(embed12345)
    client.distube.setVolume(message, volume)

    const embed1 = new MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription(`Volume set to ${volume}`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed1)

}
module.exports.help = {
    name: "volume",
    category: "Music",
    description: "Change the volume of the music",
    aliases: ["volume"]
}