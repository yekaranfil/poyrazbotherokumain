
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Bot ve komutlar hakkında bilgi edinmek için",
  usage: "[Komut]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd","yardım"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmds) =>
        `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
          cmds.name
        }${cmds.usage ? " " + cmds.usage : ""}\` - ${cmds.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(`Tüm Komutlar ${client.user.username}`, client.config.IconURL)
      .setColor("RANDOM")
      .setTitle(
        `Her komut türü hakkında bilgi almak için ${
          GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
        }help [Komut ismi]`,
      "<a:SabitGif:821076744303935538>").setDescription(`${Commands.join("\n")}
[✨ Destek sunucusu](${client.config.SupportServer}) | [GitHub](https://github.com/yekaranfil) | Support Email - y.emrekaranfil@gmail.com  
[✨ Second Support server ](https://discord.gg/K8Szjmmucd)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmds =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmds)
        return client.sendError(message.channel, "Bu komutu bulamıyorum");

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmds.name}`, client.config.IconURL)
        .setDescription(cmds.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Alternatifler", `\`${cmds.aliases.join(", ")}\``, true)
        .addField(
          "Kullanım",
          `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmds.name
          }${cmds.usage ? " " + cmds.usage : ""}\``,
          true
        )
        .addField(
          "Yetkilendirme",
          "Üyler: " +
            cmds.permissions.member.join(", ") +
            "\nBot: " +
            cmds.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "komut",
        description: "Komut yardımı",
        value: "komut",
        type: 3,
        required: false,
        options: [],

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmds) =>
          `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmds.name
          }${cmds.usage ? " " + cmds.usage : ""}\` - ${cmds.description}`
      );
  
      let Embed = new MessageEmbed()
        .setAuthor(`Tüm Komutlar ${client.user.username}`, client.config.IconURL)
        .setColor("RANDOM")
        .setFooter(
          `Her komut türü hakkında bilgi almak için ${
            GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
          }help [Komut ismi] | İyi günler!`
        ).setDescription(`${Commands.join("\n")}
  
  Discord Music Bot Version: v${require("../../package.json").version}
  [✨ Destek sunucusu ](${
        client.config.SupportServer
      }) | [GitHub](https://github.com/yekaranfil) | By [Emre Karanfil](https://github.com/yekaranfil)`);
      if (!args[0]) interaction.send(Embed);
      else {
        let cmds =
          client.commands.get(args[0]) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
        if (!cmds)
          return client.sendError(interaction, "Bu komutu bulamıyorum");
  
        let embed = new MessageEmbed()
          .setAuthor(`Command: ${cmds.name}`, client.config.IconURL)
          //.setDescription(cmd.description)
          .setColor("GREEN")
          .addField("Name", cmds.name, true)
          .addField("Aliases", cmds.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
              cmds.name
            }\`${cmds.usage ? " " + cmds.usage : ""}`,
            true
          )
          .addField(
            "Permissions",
            "Member: " +
              cmds.permissions.member.join(", ") +
              "\nBot: " +
              cmds.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Aktif kullanım komut tuşu - ${
              GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  }},
],
}};
