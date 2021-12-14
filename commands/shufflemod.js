const discord = require('discord.js')
const distube = require('distube')
const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args) => {

    var embed12 = new MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Please be sure to join a voice channel")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!message.member.voice.channel) return message.reply(embed12)

    const queue = client.distube.getQueue(message)
    var embed13 = new MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Nothing is playing right now")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!queue) return message.channel.send('')
    client.distube.shuffle(message);

    var embede = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setColor("RED")
        .setDescription("You mention on or off")
        .setFooter('Codex', 'https://media.discordapp.net/attachments/852309361513463858/860143439521251368/Codex_Bot_Logo_Cartoon_2.png?width=814&height=814')
        .setTimestamp()

    if (!args[0]) return message.reply(embede);

    const embed1 = new discord.MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription(`Turned shufflemode ${args[0]}`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed1)

}
module.exports.help = {
    name: "shufflemode",
    category: "Music",
    description: "Turn on/off shufflemode",
    aliases: ["shufflemode"]
}