const discord = require('discord.js');

module.exports = async client => {

  const activities_list = [
   "CEE6", "Hi@Cee6.bot", "beautiful artists", "...", "Antwerp VS Beershot", "Currently in ${client.guilds.cache.size} servers"
];


  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
client.user.setActivity(`${activities_list[index]}`, { type: 'WATCHING', url: "https://www.twitch.tv/discord"});

  }, 21000);
  console.log(`\u001b[0m`)
  console.log(`\x1b[30m\x1b[32mStarting...\x1b[37m\u001b[0m`)
  console.log(`\n\x1b[34mStatus \x1b[37m>> \x1b[33m\x1b[32mReady!\x1b[37m\u001b[0m`)
  console.log(`\u001b[0m`)
  console.log(`\x1b[33mLoaded \x1b[31m7 commands of \x1b[34mTickets \x1b[31msuccessfully \u001b[0m`)
  console.log(`\x1b[33mLoaded \x1b[31m4 commands of \x1b[34mRadio \x1b[31msuccessfully \u001b[0m`)
  console.log(`\x1b[33mLoaded \x1b[31m1 events of \x1b[34mEvent \x1b[31msuccessfully \u001b[0m\n`)
  console.log(`\x1b[31m${client.user.username} \x1b[37m>> \x1b[33m\x1b[32mIs now \x1b[37monline`)
};

