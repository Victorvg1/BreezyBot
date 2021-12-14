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
        .setDescription("The channel is unlocked")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('GREEN')

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNELS: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);

        }

        message.channel.send(embed1);
    }
    module.exports.help = {
        name: "unlock",
        description: "Unlock a channel",
        category: "Moderation",
        aliases: ["ul, unlock"]
    }