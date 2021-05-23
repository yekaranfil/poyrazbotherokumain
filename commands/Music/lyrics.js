const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
  name: "lyrics",
  description: "Bir şarkının sözlerini almak ve aramak için",
  usage: "[Şarkı ismi]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["ly","şarkısözü"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    let SongTitle = args.join(" ");
    if (!args[0] && !player)
      return message.channel.send("❌ | **Şu anda hiçbir şey oynatılmıyor...**");
    if (!args[0]) SongTitle = player.queue.current.title;
    

    let lyrics = await lyricsFinder(SongTitle);
    if (!lyrics)
      return message.channel.send(`**No lyrics found for -** \`${SongTitle}\``);
    lyrics = lyrics.split("\n"); //spliting into lines
    let SplitedLyrics = _.chunk(lyrics, 45); //45 lines each page

    let Pages = SplitedLyrics.map((ly) => {
      let em = new MessageEmbed()
        .setAuthor(`Lyrics for: ${SongTitle}`, client.config.IconURL)
        .setColor("RANDOM")
        .setDescription(ly.join("\n"));

      if (args.join(" ") !== SongTitle)
        em.setThumbnail(player.queue.current.displayThumbnail());

      return em;
    });

    if (!Pages.length || Pages.length === 1)
      return message.channel.send(Pages[0]);
    else return client.Pagination(message, Pages);
  },

  SlashCommand: {
    options: [

      {
        name: "song",
        value: "song",
        type: 3,
        description: "Bir şarkının sözlerini alın",
        required: false,
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
      let SongTitle = interaction.data.options[0].value
      if (!SongTitle && !player)
        return interaction.send("Şu anda hiçbir şey oynatılmıyor ...");
      if (!SongTitle) SongTitle = player.queue.current.title;

      let lyrics = await lyricsFinder(SongTitle);
      if (!lyrics)
        return interaction.send("İçin şarkı sözü bulunamadı " + SongTitle);
      lyrics = lyrics.split("\n"); //spliting into lines
      let SplitedLyrics = _.chunk(lyrics, 45); //45 lines each page

      let Pages = SplitedLyrics.map((ly) => {
        let em = new MessageEmbed()
          .setAuthor(SongTitle + "  — Şarkı sözü", client.config.IconURL)
          .setColor("RANDOM")
          .setDescription(ly.join("\n"));

        if (SongTitle !== SongTitle)
          em.setThumbnail(player.queue.current.displayThumbnail());

        return em;
      });

        return interaction.send(Pages[0]);
    }
  }
}
