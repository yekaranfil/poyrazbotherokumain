const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "grab",
  description: "Saves the current song to your Direct Messages",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["save"],
/**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/
run: async (client, message,  args, { GuildDB }) => {
  const sv = "542443538038652928"
  let player = await client.Manager.get(message.guild.id);
  if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
  if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bir şey çalmak için bir ses kanalında olmalısınız!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
   message.author.send(new MessageEmbed()
   .setAuthor(`Saved Song:`, client.user.displayAvatarURL({
    dynamic: true
  }))
  .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
  .setURL(player.queue.current.uri)
  .setColor("RANDOM")
  .setTitle(`**${player.queue.current.title}**`)
  .addField(`⌛ Süre: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
  .addField(`🎵 Yazar: `, `\`${player.queue.current.author}\``, true)
  .addField(`▶ Oynat:`, `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
  }play ${player.queue.current.uri}\``)
  .addField(`🔎 Kaydedildi:`, `<#${message.channel.id}>`)
  .setFooter(`İsteyen: ${player.queue.current.requester.tag} | Guild: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
    dynamic: true
  }))
    ).catch(e=>{
      return message.channel.send("**:x: DM'leriniz devre dışı bırakılmış**")
    })    

    client.sendTime(message.channel, `✅ | ${message.member} **Dm'lerini kontrol et!**`)
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