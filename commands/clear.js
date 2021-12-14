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

    var errorEmbed3 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Give an amount to delete")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')

    if (!args[0]) return message.reply(errorEmbed3);
    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {
            var embed = new discord.MessageEmbed()
                .setTitle("⚠ Error")
                .setDescription("I cannot delete 0 messages")
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('RED')

            var embed1 = new discord.MessageEmbed()
                .setTitle("✅ Succes")
                .setDescription("I deleted 1 message")
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('GREEN')

            var embed2 = new discord.MessageEmbed()
                .setTitle("✅ Succes")
                .setDescription(`I deleted ${args[0]} messages`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('GREEN')

            if (args[0] <= 0) {
                message.reply(embed).then(msg => msg.delete({ timeout: 5000 }));
            } else if (args[0] == 1) {
                message.reply(embed1).then(msg => msg.delete({ timeout: 5000 }));
            } else {
                message.reply(embed2).then(msg => msg.delete({ timeout: 5000 }));
            }
        })
    }
}
module.exports.help = {
    name: "clear",
    description: "Delete some messages",
    category: "Moderation",
    aliases: ["cle"]
}