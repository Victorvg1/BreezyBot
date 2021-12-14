const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const channel1 = "review_channel";
    const channel = message.guild.channels.cache.get(channel1)
    if (!channel) console.log("No channel was found!");


    const amountStars = args[0];
    var text = args.splice(1, args.length).join(" ") || 'No message specified';

    if (!amountStars || amountStars < 1 || amountStars > 5)
        var embed1 = new discord.MessageEmbed()
            .setTitle('⚠ Error')
            .setDescription("Enter an amount of stars between 1 and 5")
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()

    if (!amountStars) return message.reply(embed1)

    var stars = "";
    for (let i = 0; i < amountStars; i++) {

        stars += ":star:";

    }

    const embed = new discord.MessageEmbed()
        .setTitle("⭐ Review")
        .setDescription(`${message.author.username}'s review has succesfully arrived`)
        .addField("Stars: ", stars, true)
        .addField("Review: ", text, true)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#80C3FF')


    const embed3 = new discord.MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription("Your review was send")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('GREEN')

    message.channel.send(embed3)

    channel.send(embed).then(async (msg) => {

        await msg.react("⭐");
        message.delete();
    }).catch(err => {
        console.log(err);
    });
}


module.exports.help = {
    name: "review",
    description: "Do a server review",
    category: "Utility",
    aliases: ["review"]
}