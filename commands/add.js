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

    var addUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    var err2 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("Give a user to add")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')
    if (!addUser) return message.reply(err2);

    var embed = new discord.MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription("The person was added")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('GREEN')
        .addField("Added User:", `${addUser}`)


            message.channel.updateOverwrite(addUser, { 
                SEND_MESSAGES: true,
                READ_MESSAGES: true,       
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            });

            message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));


    };


module.exports.help = {
    name: "add",
    category: "Tickets",
    description: "Add a user to a ticket", 
    aliases: ["add"]
}