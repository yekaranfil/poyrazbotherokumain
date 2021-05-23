const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();
const Discord = require("discord.js")
client.build();

module.exports = client;

// bot aktif olunca dm mesaj
client.on('ready', () => {

    let id = "264142213833949184"; //Dmden Mesaj Yazılacak Kullanıcı ID
    console.log("yazı") //Botunuz Yeniden Başlayınca Konsolunda Çıkan Yazı Örn: Bot hazır , aktif VB
    client.users.cache.get(id).send("Komutlar Yüklendi Botunuz Aktif") 
    });
    // bot aktif olunca dm mesaj bitiş

//--------------------dm den hoşgeldin mesajı başlangıcı-----------------------
//client.on("guildMemberAdd", guild => {
//const embed = new Discord.MessageEmbed()
//.setColor('BLUE')
//.setAuthor(`Hey! ${guild.user.username}  Sunucuya Hoşgeldin!`,"https://media.giphy.com/media/3o7525OTEcQzSmhO5G/giphy.gif")
//.setThumbnail(guild.user.avatarURL())
//.setDescription('**Sunucuya hoşgeldin Lütfen kuralları okumayı unutma iyi eğlenceler! Genel sohbete yazı yazdığınızda ya da sesli odalarımıza girdiğinizde kuralları okumuş ve kabul etmiş sayılacaksınız.**')
//.setImage("https://media.giphy.com/media/YOT0zQXXuBfcZkA1WU/giphy.gif")
//.setTimestamp()
//.setFooter("© 2021 Developed by EmreeK-Odinex🔸#5614", client.user.avatarURL())
//guild.send(embed)
//})
//--------------------dm den hoşgeldin mesajı bitişi----------------------------

// ----------------DM den bot eklenince mesaj komutu-----------------------
//client.on("guildCreate", guild => {
//  const embed = new Discord.MessageEmbed()
//.setColor('RED')
//.setAuthor(`${guild.name} Adlı Sunucuna ${client.user.username} başarıyla eklendi`,"https://media.giphy.com/media/lNLVInp4Tx3BLnR6Nx/giphy.gif")
//.setThumbnail(client.user.avatarURL())
//.setDescription(`**Beni sunucuna eklediğin için teşekkürler! Kullanım ve komutlar için \`*help\` veya \`*yardım\` yazman yeterli iyi eğlenceler!  

//Thanks for adding me to the server! For usage and commands, just write \`*help\` or \`*yardım\` have fun!**`)
//.setTimestamp()
//.setFooter("© 2021 Developed by EmreeK-Odinex🔸#5614", client.user.avatarURL())
//.setImage("https://media.giphy.com/media/SWWR2NaACUu5qmf0Uo/giphy.gif")
//.addField(`» \`Destek için EmreeK-Odinex🔸#5614\``," [Destek sunucusu]("+ client.config.SupportServer + ")");
//guild.owner.send(embed)

   
  
 // console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
//});
 //---------------------------- DM eklenme bitiş------------------------------

// yeni sunucuya eklenince yardım mesaj 
client.on('guildCreate', guild => {
  const channel = (guild.systemChannelID) 
  const kanal = guild.channels.cache.get(channel)
  const embed = new Discord.MessageEmbed()
  .setColor('RED')
.setAuthor(`${guild.name} Adlı Sunucuya ${client.user.username} başarıyla eklendi`,"https://media.giphy.com/media/lNLVInp4Tx3BLnR6Nx/giphy.gif")
.setThumbnail(client.user.avatarURL())
.setDescription(`**Beni sunucuna eklediğin için teşekkürler! Kullanım ve komutlar için \`*help\` veya \`*yardım\` yazman yeterli iyi eğlenceler!  
Thanks for adding me to the server! For usage and commands, just write \`*help\` or \`*yardım\` have fun!**`)
.setTimestamp()
.setFooter("© 2021 Developed by EmreeK-Odinex🔸#5614", client.user.avatarURL())
.addField(`» \`Destek için EmreeK-Odinex🔸#5614\``," [Destek sunucusu]("+ client.config.SupportServer + ")");
kanal.send(embed)
 

  

});
// yeni sunucuya eklenince yardım mesaj bitiş

// Üyeye hoşgeldin mesajı 
const guildInvites = new Map();
client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
});

 client.on("guildMemberAdd", async (member) => {
 const channel = (member.guild.systemChannelID); 
 const cachedInvites = guildInvites.get(member.guild.id);
 const newInvites = await member.guild.fetchInvites();
 guildInvites.set(member.guild.id, newInvites);
 try { 
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses) || "1";
        const maze = new Discord.MessageEmbed()      
      
.setColor("GREEN")
.setTitle(`<a:GiriGif:821076751760621620> Sunucuya yeni bir üye katıldı!`)
.setThumbnail(member.user.avatarURL)
.setDescription(`** \`${member.user.username}\` Sunucuya hoş geldin <a:ElSallamaGif:821076749164871680> seninle beraber \`${member.guild.memberCount}\` kişiye ulaştık. **`)
 //        .addField(`:id: Üye ID:`, `${member.id}`, true)
.addField(` <a:raninbowp:821077131362566205> Katılan üye Adı`, `${member}`, true)
.addField(` <a:raninbowp:821077131362566205> Davet eden kişi`, `${usedInvite.inviter}`,true )
.addField(`Bu davet kodu ${usedInvite.uses} kere kullanılmış.`, `<a:Mee6LevelUpGif:821076739496738936><a:Mee6LevelUpGif:821076739496738936>`)
.setTimestamp()
.setFooter(`© 2021 ${client.user.username} Sayaç sistemi `, client.user.avatarURL())
client.channels.cache.get(channel).send(maze) 
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === 'LOG KANALI ID');
       if(welcomeChannel) {
            welcomeChannel.send(maze).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
 });
//hoşgeldin bitiş

// üyeye ayrılma mesajı
client.on("guildMemberRemove", async member => {
const channel = (member.guild.systemChannelID) 
var maze = new Discord.MessageEmbed()
 
.setColor("RED")
.setTitle("<a:kGif:821076751761014844> Sunucudan ayrıldı!")
.setThumbnail(member.user.avatarURL)
.setDescription(`** \`${member.user.username}\` Sunucudan ayrıldı, sensiz \`${member.guild.memberCount}\`  kişiyiz :( **`)
//.addField(`:id: Üye ID:`, `${member.id}`, true)
.addField(`<a:raninbowp:821077131362566205> Üye Adı`, `${member}`, true)
.setTimestamp()
.setFooter(`© 2021 ${client.user.username} Sayaç sistemi. `, client.user.avatarURL())
client.channels.cache.get(channel).send(maze) 
});
//ayrılma bitiş

// otorol 
const qdb = require("quick.db")
client.on("guildMemberAdd", member => {
    var rol = qdb.fetch(`otorol_${member.guild.id}`) 
    var rolcük = member.guild.roles.cache.get(rol)
    var kanal = qdb.fetch(`otorolkanali_${member.guild.id}`)
    var kanalcık = member.guild.channels.cache.get(kanal)
    var yazı = qdb.fetch(`otorolyazi_${member.guild.id}`)
    if(!yazı){
      var yazı = "" 
    }
  if (kanalcık == undefined) return
    const embedversion1mq = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setAuthor(`${client.user.username} Otorol Sistemi`)
    .setDescription(`**${yazı} Verilen rol: ${rolcük}**  `)
kanalcık.send(embedversion1mq)
    member.roles.add(rolcük.id)
})


//otorol bitiş 
