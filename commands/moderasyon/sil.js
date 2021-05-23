const Discord = require("discord.js");
module.exports = {
  name: "sil",
  description: "istenilen miktarda mesaj silmek için ",
  usage: "sil (miktar)",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: [],

run : async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Yetkin yok")
        if (!message.member.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Yetkim yok")

        if (!args[0]) return message.channel.send("Silinecek mesajın miktarını yaz!");
        message.channel.bulkDelete(args[0]).then(() => {
          message.channel.send(`:white_check_mark: ${args[0]} tane mesaj silindi`)
        })
}
  

};