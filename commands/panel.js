const discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
const disbut = require('discord-buttons');

module.exports.run = async (client, message, args) => {

  var err = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("You need the permission `KICK_MEMBERS` to use this command")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('RED')

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(err);


 
  let button = new MessageButton()
    .setStyle('gray')
    .setEmoji('🛒')
    .setID('knop');

  let button1 = new MessageButton()
    .setStyle('gray')
    .setEmoji('🤝')
    .setID('knop1');

  let button2 = new MessageButton()
    .setStyle('gray')
    .setEmoji('📘')
    .setID('knop2');

  let button3 = new MessageButton()
    .setStyle('gray')
    .setEmoji('🎉')
    .setID('knop3');

    let button4 = new MessageButton()
    .setStyle('gray')
    .setEmoji('🆘')
    .setID('knop4');
 
  let row = new disbut.MessageActionRow()
    .addComponent(button2)
    .addComponent(button)
    .addComponent(button1)
    .addComponent(button3)
    .addComponent(button4)

  var embedPrompt = new discord.MessageEmbed()
    .setTitle("Create Ticket")
    .setDescription("Click on the button(s) down below to create a ticket\n\n**Categories:**\n📘 - Support\n🎉 - Giveaway Claim\n🤝 - Partners\n🛒 - Orders\n🆘 - SOS")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#80C3FF')

  message.channel.send({
    component: row,
    embed: embedPrompt
  });

}
module.exports.help = {
  name: "panel",
  category: "Server",
  description: "Send the ticket panel",
  aliases: []
}