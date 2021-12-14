const discord = require('discord.js')
const distube = require('distube')
module.exports.run = async (client, message, args) => {

    var embed122 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("Mention on or off")
    .setColor("RED")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();

    var embed12 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("Please be sure to join a voice channel")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

        var embed123 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Nothing to play right now")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if(!message.member.voice.channel) return message.reply(embed12)

const queue = client.distube.getQueue(message)
var volume = args[0]
if (!queue) return message.channel.send(embed123)
if (isNaN(volume)) return message.channel.send(embed122)
let mode = distube.toggleAutoplay(message);

const embed1 = new discord.MessageEmbed()
.setTitle("✅ Succes")
.setDescription("Set autoplay mode to `" + (mode ? "On" : "Off") + "`")
.setColor("GREEN")
.setFooter(client.user.username, client.user.displayAvatarURL())
.setTimestamp
if (!mode) return message.channel.send(embed1)

}
module.exports.help = {
    name: "autoplay",
    category: "Music",
    description: "Autoplay the music", 
    aliases: ["autoplay"]
}