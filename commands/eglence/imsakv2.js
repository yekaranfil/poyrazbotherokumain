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
  aliases: [],

run : async (client, message, args) => {
    var saat,sayac, imsak;
    var kalansaat, kalandakika;
    let date_ob = new Date();
    let day = date_ob.getDay();
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
    axios.get(`https://api.pray.zone/v2/times/this_week.json?city=${city.toLowerCase()}`, {
        headers: {
            "content-type": "application/json",
        
            
        }
        
    }).then(res => {
        imsak_pazartesi = res.data.results.datetime[0].times.Imsak;
        imsak_sali= res.data.results.datetime[1].times.Imsak;
        imsak_carsamba = res.data.results.datetime[2].times.Imsak;
        imsak_persembe = res.data.results.datetime[3].times.Imsak;
        imsak_cuma = res.data.results.datetime[4].times.Imsak;
        imsak_cumartesi = res.data.results.datetime[5].times.Imsak;
        imsak_pazar = res.data.results.datetime[6].times.Imsak;

       
        var sonucsaat = parseInt(hours) + 3;
        if(sonucsaat > 23) {
            day = parseInt(day) +1 ;
        }

        if (day == 0 ) {
            var saat1 = imsak_pazar.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
            saatData = saatData.charAt(1);
        }
        if (day == 1 ) {
            var saat1 = imsak_pazartesi.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
            saatData = saatData.charAt(1);
        }
        if (day == 2 ) {
            var saat1 = imsak_sali.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
            saatData = saatData.charAt(1);
        }
        if (day == 3 ) {
            var saat1 = imsak_carsamba.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
            saatData = saatData.charAt(1);
        }
        if (day == 4 ) {
            var saat1 = imsak_persembe.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
            saatData = saatData.charAt(1);
        }
        if (day == 5 ) {
            var saat1 = imsak_cuma.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
            saatData = saatData.charAt(1);
        }
        if (day == 6 ) {
            var saat1 = imsak_cumartesi.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
            saatData = saatData.charAt(1);
        }

       


        /*if (saatData < 10) {
            saatData = saatData.charAt(1);
        } else {
            saatData = saatData;

        }
        */
       
        kalansaat= parseInt(saatData)-parseInt(saat);
        var sonsaat = Math.abs(kalansaat);

        if(saatData < saat) {
            sonsaat = 24 - parseInt(saat);
            sonsaat = parseInt(sonsaat) + parseInt(saatData);
        } else {
            sonsaat = sonsaat;
        }

        if (dakikaData < minutes ) {
            kalandakika = 60 - parseInt(minutes);
            kalandakika = parseInt(dakikaData) + parseInt(kalandakika);
            sonsaat = parseInt(sonsaat) -1;
        } else {
             kalandakika = parseInt(dakikaData) - parseInt(minutes);
             
        }
      
       

        
        sonsaat = Math.abs(sonsaat);

        const messageEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`> ${city} şehri için imsak saati ${saatData}:${dakikaData}`,"https://media2.giphy.com/media/YXrqttWfWnCiLv90c6/giphy.gif?cid=790b7611f88b09144de9f89f9725bf2d57bd556c2f64c589&rid=giphy.gif&ct=g")
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