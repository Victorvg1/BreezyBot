const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, message, args) => {


    const voiceChannel = message.member.voice.channel;
    var embed1 = new MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Please be sure to join a voice channel")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!voiceChannel) return message.channel.send(embed1);
    const channel = await voiceChannel.join()
    const embed = new MessageEmbed()
        .setTitle('✅ Succes')
        .setDescription('I joined the voicechannel')
        .setTimestamp()
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
    message.channel.send(embed)
}

module.exports.help = {
    name: "join",
    category: "Music",
    description: "Join a vc",
    aliases: ["join"]
}