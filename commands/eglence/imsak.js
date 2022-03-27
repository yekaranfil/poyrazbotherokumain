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
    var saat,sayac, imsak;
    var kalansaat, kalandakika;
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    console.log(hours + ":" + minutes);

    saat = hours +3;
    if(saat > 24) {
        saat = saat-24;
    } 


    const city = args[0];
    var saat,dakika;
    if (!city) return message.channel.send('Şehir adı girmelisiniz.');
    axios.get(`https://api.collectapi.com/pray/single?ezan=%C4%B0msak&data.city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
            "authorization": "apikey 1iysmakoIybrglVCfZkbDS:10KxqIwpFNuA0Q12fkHZge"
            
        }
        
    })
    
    
    .then(res => {


        imsak = res.data.result[0].time;

        var saat = imsak.split(":");
        var saatData = saat[0];
        var dakikaData = saat[1];
        saatData = saatData.charAt(1)
       
        parseInt(kalansaat)= parseInt(saatData)-parseInt(saat);
        parseInt(kalansaat) = parseInt(kalansaat)-1;
        parseInt(kalandakika) = 60 - parseInt(minutes);
        parseInt(kalandakika)= parseInt(dakikaData) + parseInt(kalandakika);

        

           


        const messageEmbed = new Discord.MessageEmbed().setDescription(`
           > **${city}** şehri için imsak saati **${res.data.result[0].time}.**
           \`\`\`Kalan Süre: ${toString.kalansaat}:${toString.kalandakika} \`\`\`
        `);

        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
        console.log(err);
    });
}



};