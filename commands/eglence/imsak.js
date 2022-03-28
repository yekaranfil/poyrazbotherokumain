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

        var saat1 = imsak.split(":");
        var saatData = saat1[0];
        var dakikaData = saat1[1];
        saatData = saatData.charAt(1);


        /*if (saatData < 10) {
            saatData = saatData.charAt(1);
        } else {
            saatData = saatData;

        }
        */
       
        kalansaat= parseInt(saatData)-parseInt(saat);
        var sonsaat = Math.abs(kalansaat);

        if (dakikaData < minutes ) {
            kalandakika = 60 - parseInt(minutes);
            kalandakika = parseInt(dakikaData) + parseInt(kalandakika);
            sonsaat = parseInt(sonsaat) -1;
        } else {
             kalandakika = parseInt(dakikaData) - parseInt(minutes);
             
        }
        if(saat > 17 ) {
            sonsaat = parseInt(sonsaat) - 24;
        } else {
            sonsaat = sonsaat;
        }

        
        sonsaat = Math.abs(sonsaat);

        const messageEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`> ${city} şehri için imsak saati ${res.data.result[0].time}`,"https://media2.giphy.com/media/YXrqttWfWnCiLv90c6/giphy.gif?cid=790b7611f88b09144de9f89f9725bf2d57bd556c2f64c589&rid=giphy.gif&ct=g")
        .setDescription(`
           \`\`\`İmsak Vaktine Kalan Süre: ${sonsaat} Saat ${kalandakika} Dakika.\`\`\`
        `)
        .setFooter(`© 2022 ${client.user.username} Vakit  sistemi. `, client.user.avatarURL())
        .setTimestamp()
        .setImage("https://www.gelisenbeyin.net/img/ramazan-oruc.gif");

        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı. Komudu doğru kullandığınızdan emin olun.');
        console.log(err);
    });
}



};