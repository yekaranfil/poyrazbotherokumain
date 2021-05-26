const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "topmusic",
  description: ".",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["t"],
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
   client.channels.cache.get("799715459473473556").send(new MessageEmbed()
   .setAuthor(`KAYDEDİLEN ŞARKI :`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setImage(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor("YELLOW")
  .setTitle(`**${player.queue.current.title}**`)
  .addField(`▶ Oynatma uzantısı(direk kopyalayın):`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
  }play ${player.queue.current.uri}\``)
  .addField(`🔎 Kaydedildiği kanal:`, `<#${message.channel.id}>`)
  .setFooter(`Ekleyen: ${player.queue.current.requester.tag} | Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
    
  })
    client.channels.cache.get("846151108027351101").send(new MessageEmbed()
   .setAuthor(`KAYDEDİLEN ŞARKI :`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setImage(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor("YELLOW")
  .setTitle(`**${player.queue.current.title}**`)
  .addField(`▶ Oynatma uzantısı(direk kopyalayın):`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
  }play ${player.queue.current.uri}\``)
  .addField(`🔎 Kaydedildiği kanal:`, `<#${message.channel.id}>`)
  .setFooter(`Ekleyen: ${player.queue.current.requester.tag} | Sunucu: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: top-musics kanalı devre dışı bırakılmış**")
    })

    client.sendTime(message.channel, `<a:SabitGif:821076744303935538> | **🎧⠂top-musics | 🎶⠂repertuar kanalınına ekledim kontrol etmeyi unutma!**`)
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
