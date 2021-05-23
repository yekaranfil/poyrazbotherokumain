const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

  module.exports = {
    name: "remove",
    description: `Sıradan bir şarkıyı kaldırın`,
    usage: "[Numara]",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["rm","kaldır","düzenle"],

    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1); 
    if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor...**");
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bir şeyler çalmak için bir ses kanalında olmalısınız!**");
    //else if(message.guild.me.voice && message.guild.me.voice.channel.id !== message.member.voice.channel.id)return client.sendTime(message.channel, `❌ | **You must be in ${guild.me.voice.channel} to use this command.**`);
        
    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("Kuyrukta kaldırılacak hiçbir şey yok");
    let rm = new MessageEmbed()
      .setDescription(`✅ **|** Parça kaldırıldı **\`${Number(args[0])}\`** from the queue!`)
      .setColor("GREEN")
      if (isNaN(args[0]))rm.setDescription(`**Kullanım - **${client.config.prefix}\`remove [number]\``);
      if (args[0] > player.queue.length)
      rm.setDescription(`Sırada yalnızca ${player.queue.length} songs!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
          name: "remove",
          value: "[number]",
          type: 4,
          required: true,
          description: "Sıradan bir şarkıyı kaldırın",
      },
  ],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      const song = player.queue.slice(args[0] - 1, 1);
      if (!player) return client.sendTime("❌ | **Şu anda hiçbir şey oynatılmıyor...**");
      if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız.**");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, `❌ | **You must be in ${guild.me.voice.channel} to use this command.**`);
  
      if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime("❌ | **Şu anda hiçbir şey oynatılmıyor...**");
    let rm = new MessageEmbed()
      .setDescription(`✅ **|** Removed track **\`${Number(args[0])}\`** from the queue!`)
      .setColor("GREEN")
      if (isNaN(args[0]))rm.setDescription(`Usage: ${client.config.prefix}\`remove [number]\``);
      if (args[0] > player.queue.length)
      rm.setDescription(`The queue has only ${player.queue.length}!`);
    await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  }
};