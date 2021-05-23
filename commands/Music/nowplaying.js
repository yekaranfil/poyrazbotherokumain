const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "nowplaying",
  description: "Şu anda hangi şarkının çaldığını görün",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["np", "nowplaying", "now playing","oynatılan","çalan"],
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
    await message.react("<a:RainbowElmasGif:821076742151471104>")

    let song = player.queue.current
      let QueueEmbed = new MessageEmbed()
        .setAuthor("Çalmakta", client.config.IconURL)
        .setColor("RANDOM")
        .setDescription(`[${song.title}](${song.uri})`)
        .addField("Tarafından talep edildi", `${song.requester}`, true)
        .addField("Sıradaki konumu", `${player.queue.size - 0}`, true)
        .addField(
          "Süre",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`${prettyMilliseconds(player.position, {colonNotation: true})} / ${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());
    
      return message.channel.send(QueueEmbed);
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
      let player = await client.Manager.get(interaction.guild_id);
      if (!player) return client.sendTime(interaction, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
  
      let song = player.queue.current
        let QueueEmbed = new MessageEmbed()
          .setAuthor("Çalmakta", client.config.IconURL)
          .setColor("RANDOM")
          .setDescription(`[${song.title}](${song.uri})`)
          .addField("Tarafından talep edildi", `${song.requester}`, true)
          .addField(
            "Süresi",
            `${
              client.ProgressBar(
                player.position,
                player.queue.current.duration,
                15
              ).Bar
            } \`${prettyMilliseconds(player.position, {colonNotation: true})} / ${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``
          )
          .setThumbnail(player.queue.current.displayThumbnail());
        return interaction.send(QueueEmbed);
      }
  }
};