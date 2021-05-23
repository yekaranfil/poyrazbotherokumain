const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Beni sunucuna davet et",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["inv","davet"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let embed = new MessageEmbed()
      .setAuthor(
        "Davet et " + client.user.tag + " sunucunuza!",
        client.user.displayAvatarURL()
      )
      .setColor("BLUE")
      .addField("**» <a:SabitGif:821076744303935538> Botu davet et <a:SabitGif:821076744303935538>**"," [Botu davet etmek için tıkla](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)");
    message.channel.send(embed);
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
    let embed = new MessageEmbed()
      .setAuthor(
        "Invite " + client.user.tag + " to your server!",
        client.user.displayAvatarURL()
      )
      .setColor("BLUE")
      .setDescription(
        `Tıklayarak beni davet edebilirsiniz [here](https://discord.com/oauth2/authorize?client_id=${client.config.ClientID}&permissions=${client.config.Permissions}&scope=bot%20${client.config.Scopes.join("%20")}&redirect_uri=${client.config.Website}${client.config.CallbackURL}&response_type=code)`);
    interaction.send(embed);
  },
  },
};
