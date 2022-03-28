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
    var saat,sayac, imsak;
    var kalansaat, kalandakika;
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    console.log(hours + ":" + minutes);

    saat = hours +3;
    //if(saat < 9) {
      //  saat = saat-24;
    //} 
    
    const city = args[0];

    if (!city) return message.channel.send('Şehir adı girmelisiniz.');
    axios.get(`https://api.collectapi.com/pray/single?ezan=Ak%C5%9Fam&data.city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
            "authorization": "apikey 1iysmakoIybrglVCfZkbDS:10KxqIwpFNuA0Q12fkHZge"
        }
    }).then(res => {

        iftar = res.data.result[0].time;

        var saat1 = iftar.split(":");
        var saatData = saat1[0];
        var dakikaData = saat1[1];
        saatData = saatData.charAt(1);

        kalansaat= parseInt(saatData)-parseInt(saat);
    
        if (dakikaData < minutes ) {
            kalandakika = 60 - parseInt(minutes);
            kalandakika = parseInt(dakikaData) + parseInt(kalandakika);
            kalansaat = parseInt(kalansaat) -1;
        } else {
             kalandakika = parseInt(dakikaData) - parseInt(minutes);
             
        }
        var sonsaat = Math.abs(kalansaat);

        const messageEmbed = new Discord.MessageEmbed().setDescription(`
           > **${city}** şehri için iftar saati **${res.data.result[0].time} - Şuan ki saat: ${saat}:${minutes}.**
           \`\`\`İftar Vaktine Kalan Süre: ${sonsaat} Saat ${kalandakika} Dakika.\`\`\`
        `);

        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
        console.log(err);
    });
}



};