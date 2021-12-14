const Discord = require('discord.js');
const { Console } = require('console');

module.exports.run = async (bot, message, args) => {

        let lockPermErr = new Discord.MessageEmbed()
        .setDescription("You don't have the permissions")
        .setTitle("⚠ Error")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')
        if(!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS") ) return message.channel.send(lockPermErr);

        let embed1 = new Discord.MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription("The channel is locked")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('GREEN')

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    VIEW_CHANNELS: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);

        }

        message.channel.send(embed1);
    }
    module.exports.help = {
        name: "lock",
        description: "Lock a channel",
        category: "Moderation",
        aliases: ["l, lock"]
    }