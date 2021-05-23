const Discord = require('discord.js');

 module.exports = {
    name: "reboot",
    description: `Botu yeniden başlatır (Yalnızca Owner)`,
    usage: "[]",
     enabled: true,
    guildOnly: false,
     permLevel: 0,
    permissions: {
      member: [],
    },
    aliases: [],

run : (client, message, args) => {
if (message.author.id !== "264142213833949184")
  return message.channel.send("Sahibimin Komutu Bu.");
else;
message.delete();
message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Reboot;').setDescription('Eğer Kabul Ediyorsan => `onay` <=').setFooter('15 Saniye İçinde İptal!', client.user.avatarURL).setTimestamp())
.then(() => {
message.channel.awaitMessages(response => response.content === 'onay', {
max: 1,
time: 15000,
errors: ['time'],
})
.then((collected) => {
  message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Reboot;').setDescription('Onay Verildi! Yeniden Başlatılıyorum...').setFooter('TheRenk', client.user.avatarURL).setTimestamp()).then(msg => {
console.log(`BOT : Yeniden Başlatılıyor...`);
process.exit(0);
})
})
.catch(() => {
  message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setTitle('Yeniden Başlatma;').setDescription('Komut İptal Edildi!').setFooter('TheRenk', client.user.avatarURL).setTimestamp())
});
});
}
   
};