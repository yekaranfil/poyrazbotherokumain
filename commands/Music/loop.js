const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "loop",
  description: "Mevcut şarkıyı / kuyruğu döngüye almak için",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["repeat","döngü","tçal"],
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
    await message.react("<a:RainbowSonsuzGif:821076753048797257>");
    let Config = new MessageEmbed()
      .setAuthor("Sunucu Yapılandırması", "https://media.giphy.com/media/3oEduUTocFBC1VFazS/giphy.gif")
      .setColor("GREEN")
      .addField("Şarkı döngüsü", player.trackRepeat?"✅":"❌", true)
      .addField("Sıra döngüsü", player.queueRepeat?"✅":"❌", true)
      .setFooter("Aşağıdaki seçiminize tepki verin.")
      .setDescription(`
Hangi tür döngü yapmak istiyorsun?

:one: - **Şarkı Döngüsü** (Bu mevcut şarkıyı döngüye alacak)
:two: - **Kuyruk Döngüsü** (Bu, tüm kuyruğu döngüye alacak)
`);

    let LoopingMessage = await message.channel.send(Config);
    await LoopingMessage.react("1️⃣");
    await LoopingMessage.react("2️⃣");
    let emoji = await LoopingMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["1️⃣", "2️⃣"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      LoopingMessage.reactions.removeAll();
      Config.setDescription(
        "Cevap vermen çok uzun sürdü. Komutu tekrar çalıştırın!"
      );
      Config.setFooter("")
      LoopingMessage.edit(Config);
    });
    emoji = emoji.first();
    /**@type {MessageReaction} */
    let em = emoji;
    LoopingMessage.reactions.removeAll();
    let config = new MessageEmbed()

    if (em._emoji.name === "1️⃣") {
        if(player.trackRepeat){
            player.setTrackRepeat(false)
            config.setAuthor("Sunucu Yapılandırması", client.config.IconURL)
            config.setColor("GREEN")
            config.setDescription("**Döngü** \`Devredışı\`")
            config.addField("Şarkı döngüsü", player.trackRepeat?"✅":"❌", true)
            config.addField("Sıra döngüsü", player.queueRepeat?"✅":"❌", true)
            config.setTimestamp();
            LoopingMessage.edit(config);
        }else if (em._emoji.name === "1️⃣") {
            player.setTrackRepeat(true)
            config.setAuthor("Sunucu Yapılandırması", client.config.IconURL)
            config.setColor("GREEN")
            config.setDescription("**Döngü** \`Aktifleştirildi\`")
            config.addField("Song loop", player.trackRepeat?"✅":"❌", true)
            config.addField("Queue loop", player.queueRepeat?"✅":"❌", true)
            config.setTimestamp();
            LoopingMessage.edit(config);
        }
    } if (em._emoji.name === "2️⃣") {
        if(player.queueRepeat){
            player.setQueueRepeat(false)
            config.setAuthor("Sunucu Yapılandırması", client.config.IconURL)
            config.setColor("GREEN")
            config.setDescription("**Sıra döngüsü** \`Devredışı\`")
            config.addField("Şarkı döngüsü", player.trackRepeat?"✅":"❌", true)
            config.addField("Sıra döngüsü", player.queueRepeat?"✅":"❌", true)
            config.setTimestamp();
            LoopingMessage.edit(config);
        }else if (em._emoji.name === "2️⃣"){
            player.setQueueRepeat(true)
            config.setAuthor("Sunucu Yapılandırması", client.config.IconURL)
            config.setColor("GREEN")
            config.setDescription("**Sıra döngüsü** \`Aktifleştirildi\`")
            config.addField("Şarkı döngüsü", player.trackRepeat?"✅":"❌", true)
            config.addField("Sıra döngüsü", player.queueRepeat?"✅":"❌", true)
            config.setTimestamp();
            LoopingMessage.edit(config);
        }
    }
  },

  SlashCommand: {
    options: [
      {
        name: "Song",
        value: "song",
        type: 1,
        description: "Şarkıyı döngüye sokar"
      },
      {
        name: "Queue",
        value: "queue",
        type: 2,
        description: "Sırayı döngüye sokar"
      }
    ],
    
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      if (!player) return interaction.send("Şu anda hiçbir şey oynatılmıyor...");
      let loop = (args.value);
        if (loop === "song") {
          if(player.trackRepeat){
              player.setTrackRepeat(false)
              interaction.send("Döngü devre dışı")
          }else{
              player.setTrackRepeat(true)
              interaction.send("Döngü etkinleştirildi")
          }
      } else {
        if (loop === "queue") {
          if(player.queueRepeat){
              player.setQueueRepeat(false)
              interaction.send("Sıra döngüsü devre dışı bırakıldı")
          }else{
              player.setTrackRepeat(true)
              interaction.send("Kuyruk döngüsü etkinleştirildi")
          }
    }}
      console.log(interaction.data)
    }
  }
};
