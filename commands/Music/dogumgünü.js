const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "duyuru",
  description: ".",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["d"],
/**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/

run: async (client, message, args, { GuildDB }) => {
  let player = await client.Manager.get(message.guild.id);
  if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
  if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bir şey çalmak için bir ses kanalında olmalısınız!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
   
  //city of
  client.channels.cache.get("675680828893954053").send("<a:RainbowOkGif:821076727480320070> @everyone 🎉POYRAZ BOT İLE 1. YIL!!!🎉 @here <a:SolRainbowokGif:821076730823442463>")
  client.channels.cache.get("675680828893954053").send(new MessageEmbed()
   .setAuthor(`🎉POYRAZ BOT 1. YILINI KUTLUYOR!!🎉:`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setImage(`https://images-ext-1.discordapp.net/external/nt-lc1sgUKQQw8BEiDmUwewZ9FHK713NhL3XGpdg0LI/https/media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif`)
  
  .setColor("BLUE")
  .setTitle(`📅 8.12.2020 Tarihinde ilk yayınlamasını yaptığımız Poyraz bot bugün 1. yılını kutluyor!`)
  .addField(`Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte  Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum.💙`, `\`${player.queue.current.requester.tag}\``)
  .setFooter(`Sahip: ${player.queue.current.requester.tag} | Doğduğu Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
      
  })
  
  //city of
  client.channels.cache.get("675680828893954053").send("<a:RainbowOkGif:821076727480320070> @everyone 🎉POYRAZ BOT İLE 1. YIL!!!🎉 @here <a:SolRainbowokGif:821076730823442463>")
  client.channels.cache.get("675680828893954053").send(new MessageEmbed()
   .setAuthor(`🎉POYRAZ BOT 1. YILINI KUTLUYOR!!🎉:`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setImage(`https://images-ext-1.discordapp.net/external/nt-lc1sgUKQQw8BEiDmUwewZ9FHK713NhL3XGpdg0LI/https/media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif`)
  
  .setColor("BLUE")
  .setTitle(`📅 8.12.2020 Tarihinde ilk yayınlamasını yaptığımız Poyraz bot bugün 1. yılını kutluyor!  `)
  //.addField("Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙")
  .addField(`Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte  Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum.💙`, `\`${player.queue.current.requester.tag}\``)
  .setFooter(`Sahip: ${player.queue.current.requester.tag} | Doğduğu Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
      //  Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙
  })
  
  //cityof bitiş
  
  
  
  // lamartune 
  client.channels.cache.get("751127807182241952").send("<a:RainbowOkGif:821076727480320070> @everyone 🎉POYRAZ BOT İLE 1. YIL!!!🎉 @here <a:SolRainbowokGif:821076730823442463>")
  client.channels.cache.get("751127807182241952").send(new MessageEmbed()
   .setAuthor(`🎉POYRAZ BOT 1. YILINI KUTLUYOR!!🎉:`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setImage(`https://images-ext-1.discordapp.net/external/nt-lc1sgUKQQw8BEiDmUwewZ9FHK713NhL3XGpdg0LI/https/media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif`)
  
  .setColor("BLUE")
  .setTitle(`📅 8.12.2020 Tarihinde ilk yayınlamasını yaptığımız Poyraz bot bugün 1. yılını kutluyor!  `)
  //.addField("Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙")
  .addField(`Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte  Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum.💙`, `\`${player.queue.current.requester.tag}\``)
  .setFooter(`Sahip: ${player.queue.current.requester.tag} | Doğduğu Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
      //  Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙
  })
  //lamartune bitiş
  
  
  
  //fight club
  client.channels.cache.get("619077735226146827").send("<a:RainbowOkGif:821076727480320070> @everyone 🎉POYRAZ BOT İLE 1. YIL!!!🎉 @here <a:SolRainbowokGif:821076730823442463>")
  client.channels.cache.get("619077735226146827").send(new MessageEmbed()
   .setAuthor(`🎉POYRAZ BOT 1. YILINI KUTLUYOR!!🎉:`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setImage(`https://images-ext-1.discordapp.net/external/nt-lc1sgUKQQw8BEiDmUwewZ9FHK713NhL3XGpdg0LI/https/media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif`)
  
  .setColor("BLUE")
  .setTitle(`📅 8.12.2020 Tarihinde ilk yayınlamasını yaptığımız Poyraz bot bugün 1. yılını kutluyor!  `)
  //.addField("Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙")
  .addField(`Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte  Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum.💙`, `\`${player.queue.current.requester.tag}\``)
  .setFooter(`Sahip: ${player.queue.current.requester.tag} | Doğduğu Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
      //  Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙
  })
  //fightclubbitiş
  

  //anka 

  client.channels.cache.get("758599517346988032").send("<a:RainbowOkGif:821076727480320070> @everyone 🎉POYRAZ BOT İLE 1. YIL!!!🎉 @here <a:SolRainbowokGif:821076730823442463>")
  client.channels.cache.get("758599517346988032").send(new MessageEmbed()
   .setAuthor(`🎉POYRAZ BOT 1. YILINI KUTLUYOR!!🎉:`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setImage(`https://images-ext-1.discordapp.net/external/nt-lc1sgUKQQw8BEiDmUwewZ9FHK713NhL3XGpdg0LI/https/media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif`)
  
  .setColor("BLUE")
  .setTitle(`📅 8.12.2020 Tarihinde ilk yayınlamasını yaptığımız Poyraz bot bugün 1. yılını kutluyor!  `)
  //.addField("Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙")
  .addField(`Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte  Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum.💙`, `\`${player.queue.current.requester.tag}\``)
  .setFooter(`Sahip: ${player.queue.current.requester.tag} | Doğduğu Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
      //  Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙
  })
// anka bitiş
  
// rynestia

client.channels.cache.get("767826296558190603").send("<a:RainbowOkGif:821076727480320070> @everyone 🎉POYRAZ BOT İLE 1. YIL!!!🎉 @here <a:SolRainbowokGif:821076730823442463>")
client.channels.cache.get("767826296558190603").send(new MessageEmbed()
 .setAuthor(`🎉POYRAZ BOT 1. YILINI KUTLUYOR!!🎉:`, client.user.displayAvatarURL({
  dynamic: true
}))
.setImage(`https://images-ext-1.discordapp.net/external/nt-lc1sgUKQQw8BEiDmUwewZ9FHK713NhL3XGpdg0LI/https/media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif`)

.setColor("BLUE")
.setTitle(`📅 8.12.2020 Tarihinde ilk yayınlamasını yaptığımız Poyraz bot bugün 1. yılını kutluyor!  `)
//.addField("Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙")
.addField(`Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte  Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum.💙`, `\`${player.queue.current.requester.tag}\``)
.setFooter(`Sahip: ${player.queue.current.requester.tag} | Doğduğu Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
  dynamic: true
}))
  ).catch(e=>{
    return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
    //  Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙
})

// rynesita bitiş

//coding odi
client.channels.cache.get("845606630866419722").send("<a:RainbowOkGif:821076727480320070> @everyone 🎉POYRAZ BOT İLE 1. YIL!!!🎉 @here <a:SolRainbowokGif:821076730823442463>")
client.channels.cache.get("845606630866419722").send(new MessageEmbed()
 .setAuthor(`🎉POYRAZ BOT 1. YILINI KUTLUYOR!!🎉:`, client.user.displayAvatarURL({
  dynamic: true
}))
.setImage(`https://images-ext-1.discordapp.net/external/nt-lc1sgUKQQw8BEiDmUwewZ9FHK713NhL3XGpdg0LI/https/media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif`)

.setColor("BLUE")
.setTitle(`📅 8.12.2020 Tarihinde ilk yayınlamasını yaptığımız Poyraz bot bugün 1. yılını kutluyor!  `)
//.addField("Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙")
.addField(`Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte  Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum.💙`, `\`${player.queue.current.requester.tag}\``)
.setFooter(`Sahip: ${player.queue.current.requester.tag} | Doğduğu Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
  dynamic: true
}))
  ).catch(e=>{
    return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
    //  Gün geçtikce daha da geliştirdiğimiz Poyraz bot şu an v7 sürümü ile en stabil hali ile çalışmakta, ve her geçen gün de geliştirilmeye devam etmekte sizlerin de destekleriyle bu günlere bu başarıyla gelen Poyraz bota verdiğiniz destekler için teşekkürlerimi sunuyorum. BİRLİKTE DAHA GELİŞMİŞ VE DAHA GÜÇLÜ! 💙
})
//coding odi bitiş
  
  
  
  

 client.sendTime(message.channel, `<a:SabitGif:821076744303935538> | **ekledim kontrol etmeyi unutma!**`)
},


  SlashCommand: {
/**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/
  run: async (client, interaction, args, { GuildDB }) => {
    const guild = client.guilds.cache.get(interaction.guild_id);
    const user = client.users.cache.get(interaction.member.user.id);
    const member = guild.members.cache.get(interaction.member.user.id);
    let player = await client.Manager.get(interaction.guild_id);
    if (!player) return client.sendTime(interaction, "❌ | **Şu anda hiçbir şey oynatılmıyor ..**");
    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmanız gerekir.**");
    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
    try{
    let embed = new MessageEmbed()
      .setAuthor(`Saved Song: `, client.user.displayAvatarURL())
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
      .setURL(player.queue.current.uri)
      .setColor("RANDOM")
      .setTimestamp()
      .setTitle(`**${player.queue.current.title}**`)
      .addField(`⌛ Süre: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
      .addField(`🎵 Yazar: `, `\`${player.queue.current.author}\``, true)
      .addField(`▶ Oynatılan:`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
        }play ${player.queue.current.uri}\``)
      .addField(`🔎 Kaydedildi:`, `<#${interaction.channel_id}>`)
      .setFooter(`İsteyen: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
        dynamic: true
      }))
      user.send(embed);
    }catch(e) {
      return client.sendTime(interaction, "**:x: Dm'lerin devredışı*")
    }

    client.sendTime(interaction, "✅ | **DM'lerini kontrol et yolladım!**")
  },
  },
};