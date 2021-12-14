const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var err = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("You need the permission `KICK_MEMBERS` to use this command")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('RED')

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(err);
    var categoryID = "ticket_categorie";

    var err1 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("You are not in a ticket")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')

    if (message.channel.parentID != categoryID) return message.reply(err1);

    var noticeUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var err2 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("Give a user to notice")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')
    if (!noticeUser) return message.reply(err2);

    var embed = new discord.MessageEmbed()
        .setTitle(`Hello`)
        .setDescription("Can we still help you? If you don't reactwithin 12 hours, we will close this ticket!")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#80C3FF')
        message.channel.send(`${noticeUser}`)
        message.channel.send(embed)


    };


module.exports.help = {
    name: "notice",
    category: "Tickets",
    description: "Notice a user in a ticket", 
    aliases: ["notice"]
}