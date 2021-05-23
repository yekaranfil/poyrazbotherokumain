const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');


module.exports = {
    name: "istatistik",
    description: "Botun istatistiklerini gösterir",
    usage: "istatistik",
    enabled: true,
    guildOnly: false,
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [],

run : async (bot, message, args) => {
  

  
  
  
  var m = await message.channel.send(`Lütfen bekleyiniz istatistikler alınıyor`)
  
  var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
  
    //--------------------------//
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
      
      setTimeout(() => {
        const s = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${bot.user.username} | İstatistikler`, bot.user.avatarURL)
        .addField('Gecikme süreleri', "Mesaj Gecikmesi: {ping1} milisaniye \nBot Gecikmesi: {ping2} milisaniye".replace("{ping1}", new Date().getTime() - message.createdTimestamp).replace("{ping2}", bot.ws.ping), true)
        .addField('Çalışma süresi', `${duration}`, true)
        .addField('Genel veriler', stripIndents`
        **Müzik Çalınan Sunucu Sayısı:** ${bot.voice.connections.size.toLocaleString()}
        **Kullanıcı Sayısı:**  ${bot.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
        **Sunucu Sayısı:** ${bot.guilds.cache.size.toLocaleString()}
        **Kanal Sayısı:** ${bot.channels.cache.size.toLocaleString()}
        `, true)
        .addField('Versiyonlar', stripIndents`
        **Discord.JS sürümü** v${Discord.version}
        **NodeJS sürümü** ${process.version}
        `, true)
        .addField('Kullanılan bellek boyutu', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
        .addField('İşletim sistemi', `${osType} ${osBit}`, true)
        
        .addField('İşlemci', `\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``)
        return m.edit(s)
        
        }, 3000)
        
    });
}

  
  };