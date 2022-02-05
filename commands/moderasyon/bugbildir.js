const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require("../../config.js")

module.exports = {
  name: "bugbildir",
  description: ".",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["bugbildir"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
const owner = client.users.cache.get('264142213833949184');
    
    const query = args.join(" ");
    if(!query) {
      return message.reply(`Lütfen bir sorun belirtin. Doğru kullanım \`${config.DefaultPrefix}bugbildir(belirtmek istediğiniz sorun)\` `); }


    const reportEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`© Developed ${message.guild.me.displayName}`, client.user.displayAvatarURL())
    .setAuthor('Yeni Bir Bug Bildirimi!', "https://media.giphy.com/media/tHby4Q4vO9LBikyZhb/giphy.gif")
    .addField(':bust_in_silhouette: **Bildirim Yapan:**', message.author.toString(), true)
    .addField(':computer: **Sunucu:**', message.guild.name, true)
    .addField(':credit_card: **Sunucu Kimliği:**', message.guild.id, true)
    .addField(':loudspeaker: **Bildirim:**', query)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    owner.send(reportEmbed) 
    return message.reply("Mesajınız iletildi. Yetkili en kısa zamanda sorunu düzeltecektir.");

  
  },

};