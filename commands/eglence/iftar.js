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
            "authorization": "apikey 7gRVk42Dwd5XefesFuqSH8:0aXoQqqUmOFMxLYHUgFra9"
        }
    }).then(res => {

        iftar = res.data.result[0].time;

        var saat1 = iftar.split(":");
        var saatData = saat1[0];
        var dakikaData = saat1[1];

        if (saatData < 10) {
            saatData = saatData.charAt(1);
        } else {
            saatData = saatData;

        }
        

        kalansaat= parseInt(saatData)-parseInt(saat);

        if (saat > saatData  ){
            var yenikalansaat = 24 - parseInt(saat);
            kalansaat = parseInt(saatData) + parseInt(yenikalansaat);
            
        } else {
            if (saat  > saatData - 1 ) {
                if (minutes > dakikaData)  {
                    var yenikalansaat = 24 - parseInt(saat);
                    kalansaat = parseInt(saatData) + parseInt(yenikalansaat);
                } 
            } else{
                kalansaat = kalansaat;
            }
            
             
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
        .setColor("GREEN")
        .setAuthor(`> ${city} şehri için iftar saati ${res.data.result[0].time}`,"https://media2.giphy.com/media/YXrqttWfWnCiLv90c6/giphy.gif?cid=790b7611f88b09144de9f89f9725bf2d57bd556c2f64c589&rid=giphy.gif&ct=g")
        .setDescription(`
           \`\`\`İftar Vaktine Kalan Süre: ${sonsaat} Saat ${kalandakika} Dakika.\`\`\`
        `)
        .setFooter(`© 2022 ${client.user.username} Vakit  sistemi. `, client.user.avatarURL())
        .setTimestamp()
        .setImage("https://www.gelisenbeyin.net/img/ramazan-oruc.gif");
        message.channel.send(messageEmbed);
    }).catch(err => {
        message.channel.send('Lütfen Şehir İsimlerinde Türkçe Karakter Kullanmayınız (ğ, ç, ş, ü, ö, ı) Harici Yazınız');
        console.log(err);
    });
}



};