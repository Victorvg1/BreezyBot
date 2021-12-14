const DJR = require("dotwood.js-radio");
const Discord = require("discord.js");
const db = require('quick.db');
module.exports.run = async (client, message, args) => {

    try {
        var channel24 = db.get(`radiochannel_${message.guild.id}`)

        let Radio = new DJR.Client({
            radio: "https://21253.live.streamtheworld.com/RADIO538.mp3", // Radio stream URL or Youtube stream URL
            channel: `${channel24}`, // Default voice channel id
            client: client // Your bot client
        })
        var embed200 = new Discord.MessageEmbed()
            .setTitle('⚠ Error')
            .setDescription("You need to do the radio setup")
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
        if (!channel24) {
            return (message.channel.send(embed200));
        }

        const voiceChannel = message.member.voice.channel;
        var embed2 = new Discord.MessageEmbed()
            .setTitle('⚠ Error')
            .setDescription("You have to join a vc to use this command")
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
        if (!voiceChannel) return message.channel.send(embed2);
        const channel = await voiceChannel.leave()

        let embed = new Discord.MessageEmbed()
            .setTitle('🔴 Radio Destroy')
            .setDescription("The radio was destroyed")
            .addField("Person:", `<@${message.author.id}>`)
            .addField("Channel:", `<#${channel24}>`)
            .setColor("RED")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
        message.channel.send(embed)

    } catch (e) {
        console.log(e)
    }
}
module.exports.help = {
    name: "rdestroy",
    category: "Radio",
    aliases: ["rdestroy"]
}