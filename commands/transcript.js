const { MessageAttachment } = require('discord.js') // Importing discord.js Package For Sending As Attachment
const { fetchMessage } = require('tech-tip-cyber') // Importing Package
const discord = require("discord.js");


module.exports.run = async (client, message, args) => {

    var categoryID = "ticket_categorie";

    var err1 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("You are not in a ticket")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')
    
    if (message.channel.parentID != categoryID) return message.reply(err1);
    fetchMessage(message, 99).then((data) => { // fetchMessage(message, <10>) It Will Fetch 10 Messages From Channel, Can Be Any Number Less Than 100
        const file = new MessageAttachment(data,`transcript-${message.channel}.html`); // Making Attachment File
        message.channel.send(file); // Send As Attachment
        var embed = new discord.MessageEmbed()
        .setTitle(`📃 Transcript`)
        .setDescription(`Here is your transcript of ${message.channel}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('PURPLE')
        message.channel.send(embed);
    });
}
module.exports.help = {
    name: "transcript",
    category: "Tickets",
    description: "Create a ticket transcript",
    aliases: ["tc"]
}