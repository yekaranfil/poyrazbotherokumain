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
    let day = date_ob.getDay();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    console.log(hours + ":" + minutes);

    saat = hours +3;
    //if(saat < 9) {
      //  saat = saat-24;
    //} 
    
    const city = args[0];

    let one = `https://api.pray.zone/v2/times/today.json?city=${city.toLowerCase()}`;
    let two = `https://api.pray.zone/v2/times/this_week.json?city=${city.toLowerCase()}`;
    const istek1 = axios.get(one);
    const istek2 = axios.get(two);


    if (!city) return message.channel.send('Şehir adı girmelisiniz.');

        istek1.then(res => {
            
              iftar_bugun = res.data.results.datetime[0].times.Sunset;   
              var saat2 = iftar_bugun.split(":");
              var saatDatabg = saat2[0];
              var dakikaDatabg = saat2[1];
    
        }).catch(err => {
        message.channel.send('Bir sorun ortaya çıktı2. Komudu doğru kullandığınızdan emin olun.');
        console.log(err);
        });



    
    

    
    
    istek2.then(res => {
        iftar_pazartesi = res.data.results.datetime[0].times.Sunset;
        iftar_sali= res.data.results.datetime[1].times.Sunset;
        iftar_carsamba = res.data.results.datetime[2].times.Sunset;
        iftar_persembe = res.data.results.datetime[3].times.Sunset;
        iftar_cuma = res.data.results.datetime[4].times.Sunset;
        iftar_cumartesi = res.data.results.datetime[5].times.Sunset;
        iftar_pazar = res.data.results.datetime[6].times.Sunset;

        var sonucsaat = parseInt(hours) + 3;
        if(sonucsaat > saatDatabg) {
            day = parseInt(day) +1 ;
        }




        if (day == 0 ) {
            var saat1 = iftar_pazar.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
        }
        if (day == 1 ) {
            var saat1 = iftar_pazartesi.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
        }
        if (day == 2 ) {
            var saat1 = iftar_sali.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
        }
        if (day == 3 ) {
            var saat1 = iftar_carsamba.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
        }
        if (day == 4 ) {
            var saat1 = iftar_persembe.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
        }
        if (day == 5 ) {
            var saat1 = iftar_cuma.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
        }
        if (day == 6 ) {
            var saat1 = iftar_cumartesi.split(":");
            var saatData = saat1[0];
            var dakikaData = saat1[1];
        }


        //iftar = res.data.result[].time;



        if (saatData < 10) {
            saatData = saatData.charAt(1);
        } else {
            saatData = saatData;

        }
        

        kalansaat= parseInt(saatData)-parseInt(saat);


        if (saat > saatData ) {
            var yenikalansaat = 24 - parseInt(saat);
            kalansaat = parseInt(saatData) + parseInt(yenikalansaat);   
        } else {
            kalansaat = kalansaat;
        }
    
        if (dakikaData < minutes ) {
            kalandakika = 60 - parseInt(minutes);
            kalandakika = parseInt(dakikaData) + parseInt(kalandakika);
            kalansaat = parseInt(kalansaat) -1;

         
            
            
        } else {
             kalandakika = parseInt(dakikaData) - parseInt(minutes);
             
        }

      
        
        var sonsaat = Math.abs(kalansaat);

        const messageEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`> ${city} şehri için iftar saati ${saatData}:${dakikaData}`,"https://media2.giphy.com/media/YXrqttWfWnCiLv90c6/giphy.gif?cid=790b7611f88b09144de9f89f9725bf2d57bd556c2f64c589&rid=giphy.gif&ct=g")
        .setDescription(`
           \`\`\`İftar Vaktine Kalan Süre: ${sonsaat} Saat ${kalandakika} Dakika.\`\`\`
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