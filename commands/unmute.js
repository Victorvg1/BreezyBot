const discord = require('discord.js');

    
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
        .setDescription("Give a user to unmute")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')
       
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send(errorEmbed3)

       let role = message.guild.roles.cache.find(role => role.id === 'mute_role_id');
        
        await Member.roles.remove(role)

        var errorEmbed6 = new discord.MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription(`<@${Member.id}> is unmuted`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('GREEN')

        message.channel.send(errorEmbed6)
        
        message.delete();
    }


module.exports.help = {
    name: "unmute",
    description: "Unmute an user",
    category: "Moderation",
    aliases: ["unmute"]
}