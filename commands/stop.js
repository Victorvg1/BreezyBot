const discord = require('discord.js')
const distube = require('distube')
module.exports.run = async (client, message, args) => {

    var embed1 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Please be sure to join a voice channel")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!message.member.voice.channel) return message.reply(embed1)
    let queue = await client.distube.getQueue(message)
    if (queue) {
        client.distube.stop(message)
        var embed2 = new discord.MessageEmbed()
            .setTitle("🔇 Stopped")
            .setDescription("Party is over, disconnected")
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();
        message.channel.send(embed2)
    } else if (!queue) {
        return
    }
}
module.exports.help = {
    name: "stop",
    category: "Music",
    description: "Stop the music",
    aliases: ["stop"]
}