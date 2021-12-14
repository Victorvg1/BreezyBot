
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
    var embed2 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Party is over, disconnected")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!queue) message.channel.send(embed2)
    const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
    const embed = new discord.MessageEmbed()
        .setTitle("📑 Queue")
        .setDescription(q)
        .setColor("#80C3FF")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed)

}

module.exports.help = {
    name: "queue",
    category: "Music",
    description: "See the music queue",
    aliases: ["queue"]
}