const Discord = require('discord.js');

module.exports = {
    name: "Role",
    description: "Mevcut sunucudaki rolleri sıralar",
    usage: "",
    enabled: true,
    guildOnly: false,
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["devam"],

run : async (client, message, args) => {

  if(message.guild.roles.cache.size == 0) return;

  function e(content) {
    var sliceLength = content.split('\n').length;
    if(content.length > 2000) {
      for(var number = 0; number < content.split('\n').length; number++) {
        if(content.split('\n').slice(0, number).join('\n').length > 2000 && content.split('\n').slice(0, number-1).join('\n').length < 2000) sliceLength = number-1;
      };
    };
    var desc = content.split('\n').slice(sliceLength, content.split('\n').length).join('\n');
    message.channel.send('```\n'+content.split('\n').slice(0, sliceLength).join('\n')+'```');
    message.channel.send('```\n'+desc+'```').catch(() => {
      e(content);
    });
  };

  message.channel.send('```'+message.guild.roles.cache.sort((a, b) => b.position-a.position).map(data => `${data.name} ${" ".repeat(Number((21-data.name.length) <= 0 ? 1 : Number((21-data.name.length))))} ${data.members.size} Members`).join('\n')+'```').catch(() => {
      var roles = message.guild.roles.cache.sort((a, b) => b.position-a.position).map(data => `${data.name} ${" ".repeat(Number((21-data.name.length) <= 0 ? 1 : Number((21-data.name.length))))} ${data.members.size} Members`).join('\n');
      e(roles);
  });

}

};