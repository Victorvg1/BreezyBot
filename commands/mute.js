const ms = require('ms');
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var errorEmbed4 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("You need the permission `KICK_MEMBERS`")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(errorEmbed4);

    var errorEmbed3 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("I don't have the permissions to kick")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(errorEmbed3);
    const target = message.mentions.users.first();
    if (target) {


        let muteRole = message.guild.roles.cache.find(role => role.id === 'mute_role_id');

        let memberTarget = message.guild.members.cache.get(target.id);

        if (!args[1]) {

            memberTarget.roles.add(muteRole.id);
            var errorEmbed6 = new discord.MessageEmbed()
            .setTitle("✅ Succes")
            .setDescription(`<@${memberTarget.user.id}> is muted`)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('GREEN')
            message.channel.send(errorEmbed6)
            return
        }

        memberTarget.roles.add(muteRole.id);
        var errorEmbed7 = new discord.MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription(`<@${memberTarget.user.id}> is muted for \`${ms(ms(args[1]))}\``)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('GREEN')
        message.channel.send(errorEmbed6)

        setTimeout(function () {
            memberTarget.roles.remove(muteRole.id);

        }, ms(args[1]));
    } else {
        var errorEmbed = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("i couldn't find this person")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')
    
        message.reply(errorEmbed);
    }
}



module.exports.help = {
    name: "mute",
    description: "Mute a person",
    category: "Moderation",
    aliases: ["mute"]
}