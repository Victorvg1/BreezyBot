const discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {


    var member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]));
    if (!member) member = message.member;

    var argsBericht = args.join(" ");

    var embed12 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Mention a user to get info of")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!argsBericht) return message.reply(embed12)

    var roles = member.roles.cache.size - 1;
    var roleNames = member.roles.cache.map(r => r).join(" ").replace("@everyone", "");
    if (roles == 0) roleNames = "No roles";

    //var status = member.presence.status;

    var nickName = member.nickname;
    if (nickName == null || undefined) nickNames = "No nickname";

    var embed = new discord.MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ size: 4096 }))
        .setTitle(`📘 ${member.user.tag}`)
        .addField("🆔 ID:", `${member.id}`, true)
        .addField("💬 Nickname:", `${nickName}`, true)
        //.addField("Status:", `${status}`, true)
        .addField("🎮 Game:", `${member.presence.activities[0] ? member.presence.activities[0].name : 'None'}`, true)
        .addField("💻 Account created at:", `${moment(member.user.createdAt).format("LL")}`, true)
        .addField("🔧 Server joined at:", `${moment(member.joinedAt).format("LL")}`, true)
        .addField(`🧻 Roles: [${roles}]`, `${roleNames}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#80C3FF');

    message.channel.send(embed)


}

module.exports.help = {
    name: "userinfo",
    description: "See info about a user",
    category: "Utility",
    aliases: ["ui"]
}