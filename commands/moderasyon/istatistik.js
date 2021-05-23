const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

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
    aliases: ["i","uptime","info"],

run : async (client, message, args) => {
  const seksizaman = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTimestamp()
    .setFooter("© 2020 Odinex-Coding", client.user.avatarURL())
    .addField("<a:RainbowOkGif:821076727480320070> **Botun Sahibi** <a:SolRainbowokGif:821076730823442463>", "<a:RainbowElmasGif:821076742151471104> `\`EmreeK-Odinex 🔸#5614`\` <a:RainbowElmasGif:821076742151471104> ")
    .addField("<a:RainbowOkGif:821076727480320070> **Gecikme süreleri**","Mesaj Gecikmesi: `\`{ping1}`\` ms \nBot Gecikmesi: `\`{ping2}`\` ms"
        .replace("{ping1}", new Date().getTime() - message.createdTimestamp)
        .replace("{ping2}", client.ws.ping),true)
    .addField("<a:RainbowOkGif:821076727480320070> **Bellek kullanımı**",(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",true)
    .addField("<a:RainbowOkGif:821076727480320070> **Çalışma süresi**", seksizaman, true)
    .addField("<a:RainbowOkGif:821076727480320070> **Kullanıcılar** <a:hypeshiny:821077128363638834>",`\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``, true)
    .addField("<a:RainbowOkGif:821076727480320070> **Sunucular** <a:hypeshiny:821077128363638834>", `\`${client.guilds.cache.size.toLocaleString()}\``, true)
    .addField("<a:RainbowOkGif:821076727480320070> **Kanallar** <a:hypeshiny:821077128363638834>", `\`${client.channels.cache.size.toLocaleString()}\``, true)
    .addField("<a:RainbowOkGif:821076727480320070> **Discord.JS sürüm**", "v" + Discord.version, true)
    .addField("<a:RainbowOkGif:821076727480320070> **Node.JS sürüm**", `${process.version}`, true)
    .addField("<a:RainbowOkGif:821076727480320070> **Tespit edilen hata sayısı**", client.voice.connections.size.toLocaleString(), true)
    .addField("<a:RainbowOkGif:821076727480320070> **CPU**",`\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``,true)
    .addField("<a:RainbowOkGif:821076727480320070> **Bit**", `\`${os.arch()}\``, true)
    .addField("<a:RainbowOkGif:821076727480320070> **İşletim Sistemi**", `\`\`${os.platform()}\`\``, true)
    .addField("<a:RainbowOkGif:821076727480320070> **Bot Davet** <a:SolRainbowokGif:821076730823442463>"," [Davet Et](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)");
  return message.channel.send(istatistikler);
}

};