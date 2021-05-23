const { MessageEmbed } = require('discord.js')
const messages = require('../../util/Messages.json')
const config = require("../../config.js")
const { TrackUtils, Player } = require("erela.js");
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
module.exports = {
    name: "join",
    description: "Botu odaya çağırır",
    usage: "",
    enabled: true,
    guildOnly: true,
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["j"],

  
  
  
  
  
  
run : async (bot, message, args,) => {
  
  const color = message.guild.me.roles.highest.color
  const { channel } = message.member.voice
  const botchannel =  message.guild.me.voice.channel;
  if (!channel) {
    let embed = new MessageEmbed()
      .setColor(color)
      .setDescription("Herhangi bir ses kanalında değilsiniz!")
    return message.channel.send(embed)
  }


  if (message.guild.me.voice.channel && message.guild.me.voice.channel.id !== channel.id) {
    let embed = new MessageEmbed()
    .setColor(color)
    .setDescription(`            ❗❗ Bot şuanda \`${message.guild.me.voice.channel.name}\`  kanalında aktif ❗❗ 

⚠️${message.author.toString()} Lütfen önce \`${config.DefaultPrefix}leave\` komutunu  ardından \`${config.DefaultPrefix}join\` komutunu çalıştırın⚠️` )
   
    return message.channel.send(embed)
  }

  if (message.guild.me.voice.channel || !message.guild.me.voice.channel)  {
    
    
    
    const player = message.client.Manager.create({
      guild: message.guild.id,
      voiceChannel: channel.id,
      textChannel: message.channel.id,
      selfDeafen: false,
      
      
    })
    
    if(message.member.voice.channel.id !== channel.id ) {
      let baglan = new MessageEmbed()
      .setColor(color)
      .setDescription("geliyorum")
      return message.channel.send(baglan)    
      player.connect();
    } 
    
    if (!channel.joinable) {
      let embed = new MessageEmbed()
        .setColor(color)
        .setTitle(messages.messages.error)
        .setDescription(messages.messages.cannotJoin)
      return message.channel.send(embed)
    }
    
    player.connect();
    return message.react("<a:GiriGif:821076751760621620>");
    
    if(!player.playing){
      await player.pause(false);
    }
    
  }   
   
 }
  
}