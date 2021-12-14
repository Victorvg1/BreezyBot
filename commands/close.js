const discord = require("discord.js");
module.exports.run = async (client, message) => {
    var categoryID = "ticket_categorie";

    var embed1 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("You are not in a ticket")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')

if (message.channel.parentID != categoryID) return message.reply(embed1);

    
    var embed2 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("You need the permission `KICK_MEMBERS` to use this command")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('RED')

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(embed2);


            var embed = new discord.MessageEmbed()
                .setTitle("🔒 Closing Ticket")
                .setDescription("This ticket is closed in `5 SECONDES`")
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('RED')
            message.channel.send(embed);

        setTimeout(() => {
            message.channel.delete();
        }, 5000);
    

    }


module.exports.help = {
    name: "close",
    category: "Tickets",
    description: "Close a ticket",
    aliases: ["close"]
}