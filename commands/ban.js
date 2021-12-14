const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    // const args = message.content.slice(prefix.length).split(/ +/);
    
    var errorEmbed4 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("You need the permission `BAN_MEMBERS`")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(errorEmbed4);

    var errorEmbed3 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("I don't have the permissions to ban")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(errorEmbed3);

    var errorEmbed1 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("Give a person to ban")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')


    if (!args[0]) return message.reply(errorEmbed1);

    var errorEmbed2 = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("Give a reason to ban")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')

    if (!args[1]) return message.reply(errorEmbed2);

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");
    
    var errorEmbed = new discord.MessageEmbed()
    .setTitle("⚠ Error")
    .setDescription("i couldn't find this person")
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setColor('RED')

    if (!banUser) return message.reply(errorEmbed);

    var embed = new discord.MessageEmbed()
    .setThumbnail(banUser.user.displayAvatarURL)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTitle("✅ Succes")
    .setTimestamp()
    .setColor('GREEN')
    .addField("Kicked:", `${banUser} (${banUser.id})`)
    .addField("Moderator:", `${message.author} (${message.author.id})`)
    .addField("Reason:", `${reason}`)

    var embedPrompt = new discord.MessageEmbed()
        .setAuthor("⏰ Answer within 30 seconds")
        .setDescription(`Do you want to kick ${banUser}?`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('ORANGE')


    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


        if (emoji === "✅") {

            msg.delete();

            var errorEmbed5 = new discord.MessageEmbed()
            .setTitle("⚠ Error")
            .setDescription("An error occured")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('RED')


            banUser.ban({reason:reason}).catch(err => {
                if (err) return message.channel.send(errorEmbed5);
            });

            message.reply(embed);

        } else if (emoji === "❌") {

            msg.delete();

            var errorEmbed6 = new discord.MessageEmbed()
            .setTitle("⚠ Error")
            .setDescription("The ban was annulated")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
            .setColor('RED')
            
            message.reply(errorEmbed6).then(m => m.delete(5000));

        }

    });

}

async function promptMessage(message, author, time, reactions) {
    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
}

module.exports.help = {
    name: "kick",
    description: "Kick a person",
    category: "Moderation",
    aliases: ["k, kick"]
}