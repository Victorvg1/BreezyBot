const Discord = require('discord.js');
const client = new Discord.Client();
const botconfig = require("./botconfig.json");
const db = require(`quick.db`)

module.exports = client;
// Command handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})

require("./handlers/loadEvents")(client);

const disbut = require("discord-buttons");
disbut(client);
const { MessageButton } = require('discord-buttons');

client.on("guildMemberAdd", async member => {

  const channel = member.guild.channels.cache.get('welcome_channel')

  if (!channel) return console.log("I cannot find a welcome channel");

  let joinEmbed = new Discord.MessageEmbed()
    .setTitle("Welcome")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`Welcome <@!${member.user.id}> in **${member.guild.name}**, you are member #${member.guild.memberCount}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#80C3FF')

  let msg = await channel.send(joinEmbed);
  await msg.react('👋');
});

client.on("guildMemberRemove", async member => {

  const channel = member.guild.channels.cache.get('leave_channel')

  if (!channel) return console.log("I cannot find a leave channel");

  let joinEmbed = new Discord.MessageEmbed()
    .setTitle("Left")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`<@!${member.user.id}> sadly left us :(`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('RED')

  let msg = await channel.send(joinEmbed);
  await msg.react('👋');
});

client.on("guildMemberBoost", async member => {

  const channel = member.guild.channels.cache.get('boost_channel')

  if (!channel) return console.log("I cannot find a boost channel");

  let boostEmbed = new Discord.MessageEmbed()
    .setTitle("Boosted")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`<@!${member.user.id}> Boosted the server`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('#80C3FF')

  let msg = await channel.send(boostEmbed);
  await msg.react('🚀');
});

client.on('clickButton', async button => {
  await button.clicker.fetch()

  var tickets = "ticket_category";
  button.guild.channels.cache.find(c => c.id === tickets)

  if (button.id === 'knop') {

    button.guild.channels.create("🛒・Order" + "-" + button.clicker.user.username, {
      type: 'text',
      parent: tickets
    }).then(
      (createdChannel) => {
        createdChannel.setParent(tickets).then(
          (settedParent) => {

            settedParent.updateOverwrite(button.guild.roles.cache.find(x => x.name === '@everyone'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            });

            settedParent.updateOverwrite(button.clicker.user, {
              CREATE_INSTANT_INVITE: false,
              READ_MESSAGES: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
              READ_MESSAGE_HISTORY: true
            });


            let claimButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('✋')
              .setID('claimButton');

            let closeButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('🔒')
              .setID('closeButton');

            let row = new disbut.MessageActionRow()
              .addComponent(claimButton)
              .addComponent(closeButton)

            var modlogChannel = client.channels.cache.get(db.get(`ticketlog_${button.guild.id}`))
            if (modlogChannel) {
              var embed = new Discord.MessageEmbed()
                .setTitle(`🎫 New Ticket`)
                .addField("Creator", `<@${button.clicker.user.id}>`)
                .addField("Creator ID", `${button.clicker.user.id}`)
                .addField("Channel", `<#${settedParent.id}>`)
                .addField("Channel ID", `${settedParent.id}`)
                .setDescription(`A new ticket was created`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('GREEN')
              modlogChannel.send(embed)
            }

            settedParent.send(`<@${button.clicker.user.id}>, <@&support_role_id>`)
            var embedParent = new Discord.MessageEmbed()
              .setTitle(`Ticket ${button.clicker.user.username}`)
              .setDescription(`Welcome in your ticket!\n\nClaim the ticket by clicking ✋\nClose the ticket by clicking 🔒`)
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTimestamp()
              .setColor('#80C3FF')
            settedParent.send({
              component: row,
              embed: embedParent
            });
          });
      }
    ).catch(err => {
      console.log(err);
    });
  }
})
client.on('clickButton', async button => {
  await button.clicker.fetch()

  var tickets = "ticket_category";

  button.guild.channels.cache.find(c => c.id === tickets)

  if (button.id === 'knop1') {

    button.guild.channels.create("🤝・Partners" + "-" + button.clicker.user.username, {
      type: 'text',
      parent: tickets
    }).then(
      (createdChannel) => {
        createdChannel.setParent(tickets).then(
          (settedParent) => {

            settedParent.updateOverwrite(button.guild.roles.cache.find(x => x.name === '@everyone'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            });

            settedParent.updateOverwrite(button.clicker.user, {
              CREATE_INSTANT_INVITE: false,
              READ_MESSAGES: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
              READ_MESSAGE_HISTORY: true
            });
            let claimButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('✋')
              .setID('claimButton');

            let closeButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('🔒')
              .setID('closeButton');

            let row = new disbut.MessageActionRow()
              .addComponent(claimButton)
              .addComponent(closeButton)

            var modlogChannel = client.channels.cache.get(db.get(`ticketlog_${button.guild.id}`))
            if (modlogChannel) {
              var embed = new Discord.MessageEmbed()
                .setTitle(`🎫 New Ticket`)
                .addField("Creator", `<@${button.clicker.user.id}>`)
                .addField("Creator ID", `${button.clicker.user.id}`)
                .addField("Channel", `<#${settedParent.id}>`)
                .addField("Channel ID", `${settedParent.id}`)
                .setDescription(`A new ticket was created`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('GREEN')
              modlogChannel.send(embed)
            }

            settedParent.send(`<@${button.clicker.user.id}>, <@&support_role_id>`)
            var embedParent = new Discord.MessageEmbed()
              .setTitle(`Ticket ${button.clicker.user.username}`)
              .setDescription(`Welcome in your ticket!\n\nClaim the ticket by clicking ✋\nClose the ticket by clicking 🔒`)
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTimestamp()
              .setColor('#80C3FF')
            settedParent.send({
              component: row,
              embed: embedParent
            });
          });
      }
    ).catch(err => {
      console.log(err);
    });
  }
})

client.on('clickButton', async button => {
  await button.clicker.fetch()

  var tickets = "ticket_category";

  button.guild.channels.cache.find(c => c.id === tickets)

  if (button.id === 'knop2') {

    button.guild.channels.create("📘・Support" + "-" + button.clicker.user.username, {
      type: 'text',
      parent: tickets
    }).then(
      (createdChannel) => {
        createdChannel.setParent(tickets).then(
          (settedParent) => {

            settedParent.updateOverwrite(button.guild.roles.cache.find(x => x.name === '@everyone'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            });


            settedParent.updateOverwrite(button.clicker.user, {
              CREATE_INSTANT_INVITE: false,
              READ_MESSAGES: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
              READ_MESSAGE_HISTORY: true
            });
            let claimButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('✋')
              .setID('claimButton');

            let closeButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('🔒')
              .setID('closeButton');

            let row = new disbut.MessageActionRow()
              .addComponent(claimButton)
              .addComponent(closeButton)

            var modlogChannel = client.channels.cache.get(db.get(`ticketlog_${button.guild.id}`))
            if (modlogChannel) {
              var embed = new Discord.MessageEmbed()
                .setTitle(`🎫 New Ticket`)
                .addField("Creator", `<@${button.clicker.user.id}>`)
                .addField("Creator ID", `${button.clicker.user.id}`)
                .addField("Channel", `<#${settedParent.id}>`)
                .addField("Channel ID", `${settedParent.id}`)
                .setDescription(`A new ticket was created`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('GREEN')
              modlogChannel.send(embed)
            }

            settedParent.send(`<@${button.clicker.user.id}>, <@&support_role_id>`)
            var embedParent = new Discord.MessageEmbed()
              .setTitle(`Ticket ${button.clicker.user.username}`)
              .setDescription(`Welcome in your ticket!\n\nClaim the ticket by clicking ✋\nClose the ticket by clicking 🔒`)
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTimestamp()
              .setColor('#80C3FF')
            settedParent.send({
              component: row,
              embed: embedParent
            });
          });
      }
    ).catch(err => {
      console.log(err);
    });
  }
})

client.on('clickButton', async button => {
  await button.clicker.fetch()

  var tickets = "ticket_category";

  button.guild.channels.cache.find(c => c.id === tickets)

  if (button.id === 'knop3') {

    button.guild.channels.create("🎉・Giveaway-Claim" + "-" + button.clicker.user.username, {
      type: 'text',
      parent: tickets
    }).then(
      (createdChannel) => {
        createdChannel.setParent(tickets).then(
          (settedParent) => {

            settedParent.updateOverwrite(button.guild.roles.cache.find(x => x.name === '@everyone'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            });


            settedParent.updateOverwrite(button.clicker.user, {
              CREATE_INSTANT_INVITE: false,
              READ_MESSAGES: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
              READ_MESSAGE_HISTORY: true
            });
            let claimButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('✋')
              .setID('claimButton');

            let closeButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('🔒')
              .setID('closeButton');

            let row = new disbut.MessageActionRow()
              .addComponent(claimButton)
              .addComponent(closeButton)

            var modlogChannel = client.channels.cache.get(db.get(`ticketlog_${button.guild.id}`))
            if (modlogChannel) {
              var embed = new Discord.MessageEmbed()
                .setTitle(`🎫 New Ticket`)
                .addField("Creator", `<@${button.clicker.user.id}>`)
                .addField("Creator ID", `${button.clicker.user.id}`)
                .addField("Channel", `<#${settedParent.id}>`)
                .addField("Channel ID", `${settedParent.id}`)
                .setDescription(`A new ticket was created`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('GREEN')
              modlogChannel.send(embed)
            }

            settedParent.send(`<@${button.clicker.user.id}>, <@&support_role_id>`)
            var embedParent = new Discord.MessageEmbed()
              .setTitle(`Ticket ${button.clicker.user.username}`)
              .setDescription(`Welcome in your ticket!\n\nClaim the ticket by clicking ✋\nClose the ticket by clicking 🔒`)
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTimestamp()
              .setColor('#80C3FF')
            settedParent.send({
              component: row,
              embed: embedParent
            });
          });
      }
    ).catch(err => {
      console.log(err);
    });
  }
})

client.on('clickButton', async button => {
  await button.clicker.fetch()

  var tickets = "categorie_id";

  button.guild.channels.cache.find(c => c.id === tickets)

  if (button.id === 'knop4') {

    button.guild.channels.create("🆘・sos" + "-" + button.clicker.user.username, {
      type: 'text',
      parent: tickets
    }).then(
      (createdChannel) => {
        createdChannel.setParent(tickets).then(
          (settedParent) => {

            settedParent.updateOverwrite(button.guild.roles.cache.find(x => x.name === '@everyone'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false
            });


            settedParent.updateOverwrite(button.clicker.user, {
              CREATE_INSTANT_INVITE: false,
              READ_MESSAGES: true,
              SEND_MESSAGES: true,
              ATTACH_FILES: true,
              CONNECT: true,
              ADD_REACTIONS: true,
              VIEW_CHANNEL: true,
              READ_MESSAGE_HISTORY: true
            });
            let claimButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('✋')
              .setID('claimButton');

            let closeButton = new MessageButton()
              .setStyle('gray')
              .setEmoji('🔒')
              .setID('closeButton');

            let row = new disbut.MessageActionRow()
              .addComponent(claimButton)
              .addComponent(closeButton)

            var modlogChannel = client.channels.cache.get(db.get(`ticketlog_${button.guild.id}`))
            if (modlogChannel) {
              var embed = new Discord.MessageEmbed()
                .setTitle(`🎫 New Ticket`)
                .addField("Creator", `<@${button.clicker.user.id}>`)
                .addField("Creator ID", `${button.clicker.user.id}`)
                .addField("Channel", `<#${settedParent.id}>`)
                .addField("Channel ID", `${settedParent.id}`)
                .setDescription(`A new ticket was created`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('GREEN')
              modlogChannel.send(embed)
            }

            settedParent.send(`<@${button.clicker.user.id}>, <@&support_role_id>`)
            var embedParent = new Discord.MessageEmbed()
              .setTitle(`Ticket ${button.clicker.user.username}`)
              .setDescription(`Welcome in your ticket!\n\nClaim the ticket by clicking ✋\nClose the ticket by clicking 🔒`)
              .setFooter(client.user.username, client.user.displayAvatarURL())
              .setTimestamp()
              .setColor('#80C3FF')
            settedParent.send({
              component: row,
              embed: embedParent
            });
          });
      }
    ).catch(err => {
      console.log(err);
    });
  }
})

client.on('clickButton', async button => {
  await button.clicker.fetch()

  if (button.id === 'claimButton') {

    var modlogChannel = client.channels.cache.get(db.get(`ticketlog_${button.guild.id}`))
    if (modlogChannel) {
      var embed = new Discord.MessageEmbed()
        .setTitle(`✋🏻 Ticket Clained`)
        .addField("Moderator", `<@${button.clicker.user.id}>`)
        .addField("Moderator", `${button.clicker.user.id}`)
        .addField("Channel", `<#${button.channel.id}>`)
        .addField("Channel ID", `${button.channel.id}`)
        .setDescription(`A ticket was claimed`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('ORANGE')
      modlogChannel.send(embed)
    }

    var embed = new Discord.MessageEmbed()
      .setTitle("✋ Claimed")
      .setDescription(`This ticket is claimed by <@${button.clicker.user.id}>`)
      .setColor("ORANGE")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()

    button.message.channel.send(embed)
  }

  if (button.id === 'closeButton') {

    var modlogChannel = client.channels.cache.get(db.get(`ticketlog_${button.guild.id}`))
    if (modlogChannel) {
      var embed = new Discord.MessageEmbed()
        .setTitle(`🔒 Ticket Closed`)
        .addField("Moderator", `<@${button.clicker.user.id}>`)
        .addField("Moderator ID", `${button.clicker.user.id}`)
        .addField("Channel", `<#${button.channel.id}>`)
        .addField("Channel ID", `${button.channel.id}`)
        .setDescription(`A ticket was closed`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('RED')
      modlogChannel.send(embed)
    }

    var embed = new Discord.MessageEmbed()
      .setTitle("🔒 Closing")
      .setColor("RED")
      .setDescription("This ticket is closing in `5 SECONDS`")
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
    button.message.channel.send(embed);


    setTimeout(() => {
      button.message.channel.delete();
    }, 5000);
  }
});

client.on("message", async (message, guild) => {

  db.set(`guild`, message.guild)

  if (message.author.bot) return;

  if (message.channel.type == "dm") return;

  var messageArray = message.content.split(" ");
  var command = messageArray[0];
  var prefix = botconfig.prefix

  if (!message.content.startsWith(prefix)) return;

  var arguments = messageArray.slice(1);
  var commands = client.commands.get(command.slice(prefix.length));

  if (commands) commands.run(client, message, arguments);
});

const DisTube = require('distube')

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: false });

client.distube

  .on("playSong", (message, queue, song) => {
    let playingEmbed = new Discord.MessageEmbed()
      .setColor("#80C3FF")
      .setTitle(`🎵 Playing`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`[${song.name}](${song.url})`)
      .addField("Requested by:", `<@${song.user.id}>`, true)
      .addField("Duration:", `\`${song.formattedDuration}\``, true)
      .addField("Volume:", `\`${queue.volume}%\``, true)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())

    message.channel.send(playingEmbed)
  })
  .on("addSong", (message, queue, song) => {
    let queueEmbed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(`✅ Added to the Queue`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`[${song.name}](${song.url})`)
      .addField("Requested by:", `<@${song.user.id}>`, true)
      .addField("Duration:", `\`${song.formattedDuration}\``, true)
      .addField("Volume:", `\`${queue.volume}%\``, true)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
    message.channel.send(queueEmbed)
  })
  .on("playList", (message, queue, playlist, song) => {

    let ListEmbed = new Discord.MessageEmbed()
      .setColor("#80C3FF")
      .setTitle(`🎵 Playing`)
      .setDescription(`[${playlist.name}](${playlist.url})`)
      .addField("Requested by:", `<@${playlist.user.id}>`, true)
      .addField("Songs:", `\`${playlist.songs.length}\``, true)
      .addField("Volume:", `\`${queue.volume}%\``, true)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
    message.channel.send(ListEmbed)
  })
  .on("addList", (message, queue, playlist) => {

    let addListEmbed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(`✅ Added to the Queue`)
      .setDescription(`[${playlist.name}](${playlist.url})`)
      .addField("Requested by:", `<@${playlist.user.id}>`, true)
      .addField("Songs:", `\`${playlist.songs.length}\``, true)
      .addField("Volume:", `\`${queue.volume}%\``, true)
      .setTimestamp()
      .setFooter(client.user.username, client.user.displayAvatarURL())
    message.channel.send(addListEmbed)
  })
  // DisTubeOptions.searchSongs = true
  .on("searchCancel", (message) => message.channel.send(`**Searching canceled!**`))
  .on("error", (message, e) => {
    console.error(e)
    message.channel.send("An error encountered: " + e);
  });

client.on("roleCreate", (roleCreate) => {
  if (roleCreate.author === 'bot') return;
  var modlog = db.get(`moderatielog_${roleCreate.guild.id}`)
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🧻 Role Added")
    .addField("Action", "Role Added")
    .addField("Role", `${roleCreate}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("GREEN")
  channel.send(embed)
});
client.on("roleDelete", (roleDelete) => {
  if (roleDelete.author === 'bot') return;
  var modlog = db.get(`moderatielog_${roleDelete.guild.id}`)
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🧻 Role Deleted")
    .addField("Action", "Role Deleted")
    .addField("Role", `${roleDelete}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("RED")
  channel.send(embed)
});
client.on("roleUpdate", (roleUpdate) => {
  if (roleUpdate.author === 'bot') return;
  var modlog = db.get(`moderatielog_${roleUpdate.guild.id}`)
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🧻 Role Updated")
    .addField("Action", "Role Updated")
    .addField("Role", `${roleUpdate}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("ORANGE")
  channel.send(embed)
});

client.on("channelCreate", (channelCreate) => {
  var modlog = db.get(`moderatielog_${channelCreate.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🧩 Channel Create")
    .addField("Action", "Channel Create")
    .addField("Channel", `<#${channelCreate.id}>`)
    .addField("Channel ID", `${channelCreate.id}\n`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("GREEN")
  channel.send(embed)
});
client.on("channelDelete", (channelDelete) => {
  var modlog = db.get(`moderatielog_${channelDelete.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🗑 Channel Delete")
    .addField("Action", "Channel Delete")
    .addField("Channel", `<#${channelDelete.id}>`)
    .addField("Channel ID", `${channelDelete.id}\n`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("RED")
  channel.send(embed)
});
client.on("channelUpdate", (channelUpdate) => {
  var modlog = db.get(`moderatielog_${channelUpdate.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🔧 Channel Update")
    .addField("Action", "Channel Update")
    .addField("Channel", `<#${channelUpdate.id}>`)
    .addField("Channel ID", `${channelUpdate.id}\n`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("ORANGE")
  channel.send(embed)
});
client.on("botAdd", (botAdd) => {
  var modlog = db.get(`moderatielog_${botAdd.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🤖 Bot Added")
    .addField("Action", "Bot Added")
    .addField("Added Bot", `${botAdd}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("ORANGE")
  channel.send(embed)
});
client.on("emojiCreate", (emojiCreate) => {
  var modlog = db.get(`moderatielog_${emojiCreate.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("😊 Emoji Added")
    .addField("Action", "Emoji Added")
    .addField("Added Emoji", `${emojiCreate}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("GREEN")
  channel.send(embed)
});
client.on("emojiDelete", (emojiDelete) => {
  var modlog = db.get(`moderatielog_${emojiDelete.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("😊 Emoji Deleted")
    .addField("Action", "Emoji Deleted")
    .addField("Deleted Emoji", `${emojiDelete}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("RED")
  channel.send(embed)
});
client.on("emojiUpdate", (emojiUpdate) => {
  var modlog = db.get(`moderatielog_${emojiUpdate.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("😊 Emoji Updated")
    .addField("Action", "Emoji Updated")
    .addField("Updated Emoji", `${emojiUpdate}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("ORANGE")
  channel.send(embed)
});
client.on("stickerUpdate", (stickerUpdate) => {
  var modlog = db.get(`moderatielog_${stickerUpdate.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🟧 Sticker Updated")
    .addField("Action", "Sticker Updated")
    .addField("Updated Sticker", `${stickerUpdate}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("ORANGE")
  channel.send(embed)
});
client.on("stickerCreate", (stickerUpdate) => {
  var modlog = db.get(`moderatielog_${stickerUpdate.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🟩 Sticker Create")
    .addField("Action", "Sticker Create")
    .addField("Created Sticker", `${stickerUpdate}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("GREEN")
  channel.send(embed)
});
client.on("stickerDelete", (stickerDelete) => {
  var modlog = db.get(`moderatielog_${stickerDelete.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("🟥 Sticker Deleted")
    .addField("Action", "Sticker Deleted")
    .addField("Deleted Sticker", `${stickerDelete}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("RED")
  channel.send(embed)
});
client.on("guildMemberAdd", (guildMemberAdd) => {
  var modlog = db.get(`moderatielog_${guildMemberAdd.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("👥 New Member")
    .addField("Action", "New Member")
    .addField("Member", `${guildMemberAdd}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("GREEN")
  channel.send(embed)
});
client.on("guildMemberRemove", (guildMemberRemove) => {
  var modlog = db.get(`moderatielog_${guildMemberRemove.guild.id}`);
  if (!modlog) return;
  var channel = client.channels.cache.get(modlog)
  if (!channel) return;

  var embed = new Discord.MessageEmbed()
    .setTitle("👥 Leaved Member")
    .addField("Action", "Leaved Member")
    .addField("Member", `${guildMemberRemove}`)
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor("RED")
  channel.send(embed)
});
client.login(process.env.token);