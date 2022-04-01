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
    let date_ob = new Date();
    let gun = date_ob.getDay();
    let ay = date_ob.getMonth();
    let yıl = date_ob.getFullYear();

    

  const messageEmbed = new Discord.MessageEmbed().setDescription(`
    >  ** 2022 yılı tyt tarihi  18 Haziran 2022 **.**
    \`\`\`Kalan Süre: ${18-gun} ${6-ay} ${yıl}\`\`\`
 `);

 message.channel.send(messageEmbed);

}

};
