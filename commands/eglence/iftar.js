const Discord = require("discord.js");
const axios = require('axios');

module.exports = {
  name: "iftar",
  description: "İftara kalan vakti gösterir",
  usage: "",
  enabled: true,
  guildOnly: true,
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["İftar","akşam","İftar"],

run : async (client, message, args) => {
    const city = args[0];
    if (!city) return message.channel.send('Şehir adı girmelisiniz.');
    axios.get(`https://api.collectapi.com/pray/single?ezan=Ak%C5%9Fam&data.city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
            "authorization": "apikey 1iysmakoIybrglVCfZkbDS:10KxqIwpFNuA0Q12fkHZge"
        }
    }).then(res => {
        const messageEmbed = new Discord.MessageEmbed().setDescription(`
           > **${city}** şehri için iftar saati **${res.data.result[0].time}.**
           \`\`\`Kalan Süre: ${get.data.result[0].hour} ${get.data.result[0].min}\`\`\`
        `);

        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
        console.log(err);
    });
}



};