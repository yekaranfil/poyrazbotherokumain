const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: "config",
  description: "Sunucuya özel ayarlarınızı yapmak için",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["conf","sunucuayar","ayar"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    await message.react("<a:AyarGif:821076742047137803>")
    let Config = new MessageEmbed()
      .setAuthor("Server için özel ayarlar","https://media.giphy.com/media/5xtDarBFszThqQF1o6A/giphy.gif")
      .setColor("RANDOM")
      .addField("Bot Komut tuşu", GuildDB.prefix, true)
      .addField("DJ Rolü", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Not Set", true)
      .setDescription(`
Neyi düzenlemek istersiniz?

:one: - Server için Bot Komut tuşu
:two: - DJ Rolü ayarlaması
`);

    let ConfigMessage = await message.channel.send(Config);
    await ConfigMessage.react("1️⃣");
    await ConfigMessage.react("2️⃣");
    let emoji = await ConfigMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["1️⃣", "2️⃣"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      ConfigMessage.reactions.removeAll();
      Config.setDescription(
        "Cevap vermen çok uzun sürdü. Ayarları düzenlemek için komutu tekrar çalıştırın."
      );
      ConfigMessage.edit(Config);
    });
    let isOk = false;
    try{
      emoji = emoji.first();
    }catch{
      isOk = true;
    }
    if(isOk)return//im idiot sry ;-;
    /**@type {MessageReaction} */
    let em = emoji;
    ConfigMessage.reactions.removeAll();
    if (em._emoji.name === "1️⃣") {
      await message.channel.send("Onu neye değiştirmek istiyorsun?");
      let prefix = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!prefix.first()) return message.channel.send("Cevap vermen çok uzun sürdü.");
      prefix = prefix.first();
      prefix = prefix.content;
      
      await client.database.guild.set(message.guild.id, {
        prefix: prefix,
        DJ: GuildDB.DJ,
      });

      message.channel.send(
        "bot komut öneki olarak başarıyla kaydedildi `" + prefix + "`"
      );
    } else {
      await message.channel.send("Lütfen DJ'lerin sahip olmasını istediğiniz rolü belirtin.");
      let role = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!role.first()) return message.channel.send("Cevap vermen çok uzun sürdü.");
      role = role.first();
      if (!role.mentions.roles.first())
        return message.channel.send("Lütfen sadece DJ'ler için istediğiniz rolü belirtin.");
      role = role.mentions.roles.first();

      await client.database.guild.set(message.guild.id, {
        prefix: GuildDB.prefix,
        DJ: role.id,
      });

      message.channel.send(
        "Lonca öneki olarak başarıyla kaydedildi <@&" + role.id + ">"
      );
    }
  },

  SlashCommand: {
    options: [
      {
        name: "Prefix",
        description: "Botun Komut tuşunu kontrol edin",
        type: 1,
        required: false,
        options: [
          {
            name: "symbol",
            description: "Botun Komut tuşunu kontrol edin",
            type: 3,
            required: true,
          }
        ]
      },
      {
        name: "DJRole",
        description: "DJ rolünü kontrol edin",
        type: 1,
        required: false,
        options: [
          {
            name: "role",
            description: "DJ rolünü ayarlayın",
            type: 8,
            required: true
          }
        ]
      }
    ],
    
    run: async (client, interaction, args, { GuildDB }) => {
      let config = interaction.data.options[0].name
      let member = await interaction.guild.members.fetch(interaction.user_id)
      //TODO: if no admin perms return...
      if(config === "prefix"){
        //prefix stuff
        if(interaction.data.options[0].options && interaction.data.options[0].options[0]){
          //has prefix
          let prefix = interaction.data.options[0].options[0].value
          await client.database.guild.set(interaction.guild.id, {
            prefix: prefix,
            DJ: GuildDB.DJ,
          });
          interaction.send(`The prefix has now been set to \`${prefix}\``)
        }else{
          //has not prefix
          interaction.send(`Prefix of the server is \`${GuildDB.prefix}\``)
        }
      }else if(config === "djrole"){
        //DJ role
        if(interaction.data.options[0].options && interaction.data.options[0].options[0]){
          let role = interaction.guild.roles.cache.get(interaction.data.options[0].options[0].value)
          await client.database.guild.set(interaction.guild.id, {
            prefix: GuildDB.prefix,
            DJ: role.id,
          });
          interaction.send(`Successfully changed DJ role of this server to ${role.name}`)
        }else{
          /**
           * @type {require("discord.js").Role}
           */
          let role = interaction.guild.roles.cache.get(GuildDB.DJ)
          interaction.send(`DJ Role of the server is ${role.name}`)
        }
      }
    }
  }
};
