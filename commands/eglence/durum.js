const Discord = require("discord.js");
const config = require('../../config.js');

module.exports = {
  name: 'durum-değiştir',
  description: 'Botun durumunu günceller(Yalnızca yetlili yapabilir)',
  usage: '',
  enabled: true,
  guildOnly: true,
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: [],

  run : async (client,message,args) => {

if(message.author.id !== "264142213833949184" ) return;

if(args[0] === "rahatsız") {
client.user.setStatus("dnd");
message.channel.send('Durumum artık **Rahatsız Etmeyin**.');
}
if(args[0] === "boşta") {
  client.user.setStatus("idle");
  message.channel.send('Durumum artık **Boşta**.');
  }
  if(args[0] === "çevrimiçi") {
    client.user.setStatus("online");
    message.channel.send('Durumum artık **Çevrimiçi**.');
    }
    if(args[0] === "çevrimdışı") {
    let a = await message.channel.send('Bot Kapanıyor...')
      setTimeout(() => {
      a.edit("Hemen Kandın")
      }, 2000)
      }
}

};
