const { MessageEmbed } = require("discord.js");
const _ = require("lodash");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
  name: "queue",
  description: "Sunucu kuyruğu",
  usage: "",
  category:"müzik",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["q","sıra","kuyruk"],
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

    if (!player.queue || !player.queue.length || player.queue === 0) {
      let QueueEmbed = new MessageEmbed()
        .setAuthor("Çalmakta", client.config.IconURL)
        .setColor("RANDOM")
        .setDescription(`[${player.queue.current.title}](${player.queue.current.uri})`)
        .addField("Tarafından talep edildi", `${player.queue.current.requester}`, true)
        .addField(
          "Süresi",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`[${prettyMilliseconds(player.position, {colonNotation: true})} / ${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}]\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());
      return message.channel.send(QueueEmbed);
    }

    let Songs = player.queue.map((t, index) => {
      t.index = index;
      return t;
    });

    let ChunkedSongs = _.chunk(Songs, 10); //How many songs to show per-page

    let Pages = ChunkedSongs.map((Tracks) => {
      let SongsDescription = Tracks.map(
        (t) => `\`${t.index + 1}.\` [${t.title}](${t.uri}) \n\`${prettyMilliseconds(t.duration, {colonNotation: true})}\` **|** Requested by: ${t.requester}\n`
      ).join("\n");

      let Embed = new MessageEmbed()
        .setAuthor("Kuyruk", client.config.IconURL)
        .setColor("RANDOM")
        .setDescription(`**Currently Playing:** \n[${player.queue.current.title}](${player.queue.current.uri}) \n\n**Up Next:** \n${SongsDescription}\n\n`)
        .addField("Toplam şarkı: \n", `\`${player.queue.totalSize - 1}\``, true)
        .addField("Toplam uzunluk: \n", `\`${prettyMilliseconds(player.queue.duration, {colonNotation: true})}\``, true)
        .addField(
          "Talep eden:",
          `${player.queue.current.requester}`,
          true
        )
        .addField(
          "Mevcut şarkı süresi:",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`${prettyMilliseconds(player.position, {colonNotation: true})} / ${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``
        )
        .setThumbnail(player.queue.current.displayThumbnail())
        

      return Embed;
    });

    if (!Pages.length || Pages.length === 1)
      return message.channel.send(Pages[0]);
    else client.Pagination(message, Pages);
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
    if (!player) return interaction.send("❌ | **Şu anda hiçbir şey oynatılmıyor ...**");

    if (!player.queue || !player.queue.length || player.queue === 0) {
      let QueueEmbed = new MessageEmbed()
        .setAuthor("Çalmakta", client.config.IconURL)
        .setColor("RANDOM")
        .setDescription(`[${player.queue.current.title}](${player.queue.current.uri})`)
        .addField("Tarafından talep edildi", `${player.queue.current.requester}`, true)
        .addField(
          "Süresi",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`[${prettyMilliseconds(player.position, {colonNotation: true})} / ${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}]\``
        )
        .setThumbnail(player.queue.current.displayThumbnail());
      return interaction.send(QueueEmbed);
    }

    let Songs = player.queue.map((t, index) => {
      t.index = index;
      return t;
    });

    let ChunkedSongs = _.chunk(Songs, 10); //How many songs to show per-page

    let Pages = ChunkedSongs.map((Tracks) => {
      let SongsDescription = Tracks.map(
        (t) => `\`${t.index + 1}.\` [${t.title}](${t.uri}) \n\`${prettyMilliseconds(t.duration, {colonNotation: true})}\` **|** Requested by: ${t.requester}\n`
      ).join("\n");

      let Embed = new MessageEmbed()
        .setAuthor("Kuyruk", client.config.IconURL)
        .setColor("RANDOM")
        .setDescription(`**Currently Playing:** \n[${player.queue.current.title}](${player.queue.current.uri}) \n\n**Up Next:** \n${SongsDescription}\n\n`)
        .addField("Toplam şarkı: \n", `\`${player.queue.totalSize - 1}\``, true)
        .addField("Toplam uzunluk: \n", `\`${prettyMilliseconds(player.queue.duration, {colonNotation: true})}\``, true)
        .addField(
          "Tarafından talep edildi:",
          `${player.queue.current.requester}`,
          true
        )
        .addField(
          "Mevcut şarkı süresi:",
          `${
            client.ProgressBar(
              player.position,
              player.queue.current.duration,
              15
            ).Bar
          } \`[${prettyMilliseconds(player.position, {colonNotation: true})} / ${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}]\``
        )
        .setThumbnail(player.queue.current.displayThumbnail())
        

      return Embed;
    });

    if (!Pages.length || Pages.length === 1)
      return interaction.send(Pages[0]);
    else client.Pagination(interaction, Pages);
  },
  }
};
