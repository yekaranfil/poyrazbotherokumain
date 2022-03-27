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
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();

    const city = args[0];
    var saat,dakika;
    if (!city) return message.channel.send('Şehir adı girmelisiniz.');
    axios.get(`https://api.pray.zone/v2/times/today.json?city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
            "authorization": ""
            
        }
        
    })
    
    
    .then(res => {
        

        const messageEmbed = new Discord.MessageEmbed().setDescription(`
           > **${city}** şehri için imsak saati **${res.data.result[0].time}.**
           \`\`\`Kalan Süre: ${hours} ${minutes} \`\`\`
        `);

        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
        console.log(err);
    });
}



};