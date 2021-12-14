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

    var embed = new discord.MessageEmbed()
        .setTitle("✋ Claimed")
        .setDescription(`This ticket is claimed by <@${message.author.id}>`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('ORANGE')

    message.channel.send(embed)

}

module.exports.help = {
    name: "claim",
    category: "Tickets",
    description:"Claim a ticket",
    aliases: ["cl"]
}