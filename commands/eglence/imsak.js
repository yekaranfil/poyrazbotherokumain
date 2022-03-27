 const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
  name: "İmsak",
  description: "İmsaka kalan vakti gösterir",
  usage: "",
  enabled: true,
  guildOnly: true,
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["sahur","Sahur","imsak","İmsak"],

run : async (client, message, args) => {
    const city = args[0];
    var saat,dakika;
    if (!city) return message.channel.send('Şehir adı girmelisiniz.');
    axios.get(`https://api.collectapi.com/pray/single?ezan=%C4%B0msak&data.city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
            "authorization": "apikey 1iysmakoIybrglVCfZkbDS:10KxqIwpFNuA0Q12fkHZge"
            
        }
        
    }).then(res => {
        saat = `${res.data.result[0].hour}`;
        dakika =`${res.data.result[0].min }`;
        var x = saat.toString();
        var y = dakika.toString();
        const messageEmbed = new Discord.MessageEmbed().setDescription(`
           > **${city}** şehri için imsak saati **${res.data.result[0].time}.**
           \`\`\`Kalan Süre: ${x} ${y} \`\`\`
        `);

        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
        console.log(err);
    });
}



};