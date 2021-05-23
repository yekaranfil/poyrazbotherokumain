const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Bu sunucudaki kuyruğu temizlemek için",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls","temizle"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor...**");

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("TSırada temizlenecek şarkı yok!");
    player.queue.clear();
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription("✅ | **Sırayı temizledim!**");
    await message.channel.send(embed);
  },

  SlashCommand: {
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      if (!player) return interaction.send("❌ | **Şu anda hiçbir şey oynatılmıyor...**");
  
      if (!player.queue || !player.queue.length || player.queue.length === 0)return interaction.send("Sırada temizlenecek şarkı yok!");
      player.queue.clear();
      let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription("✅ | **Sırayı temizledim!**");
      await interaction.send(embed);
    },
  }
};
