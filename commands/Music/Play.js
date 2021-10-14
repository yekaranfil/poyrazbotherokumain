const { MessageEmbed } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const prettyMilliseconds = require("pretty-ms");


module.exports = {
    name: "play",
    description: "Ses kanalında müzik çalmak için",
    usage: "[Şarkı ismi | Şarkı URL]",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["play","P","p","ç","çal","oynat"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
      
   
      
      
      
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bir şeyler çalmak için bir ses kanalında olmalısınız!**");
        //else if(message.guild.me.voice && message.guild.me.voice.channel.id !== message.member.voice.channel.id)return client.sendTime(message.channel, "❌ | **You must be in same voice channel as the bot is in to play something!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, `❌ | ${message.guild.me.voice.channel} **:exclamation:KANALINDA AKTİFİM LÜTFEN ORADA KULLANIN YA DA \`${GuildDB.prefix}leave\` kullanın ardından şarkıyı açın.:exclamation:**- **Bir şeyler çalmak için benimle aynı ses kanalında olmalısınız! - **`);
        let SearchString = args.join(" ");
        if (!SearchString) return client.sendTime(message.channel, `**Usage - **\`${GuildDB.prefix}play [Song Name|Song URL]\``); //et Searching = await message.channel.send("<a:YklenmeGif:821076739207069706> Aranıyor...");
        
        let CheckNode = client.Manager.nodes.get(client.config.Lavalink.id);
        let Searching = await message.channel.send("<a:CWS_GoogleAssistant:853730537192947732>  Aranıyor... <:yt:853732706202288128>");
        if (!CheckNode || !CheckNode.connected) {
       return client.sendTime(message.channel,"❌ | **Lavalink node sunucuya bağlanamadı lütfen bunu *bugbildir ile bildirin**");
          }

        let SongAddedEmbed = new MessageEmbed().setColor("RED");
      
     const player = client.Manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: false,
        });

        if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
      
        if (!player.playing) await player.connect();
        if (player.state != "CONNECTED") await player.connect();
        

        try {
            if (SearchString.match(client.Lavasfy.spotifyPattern)) {
                await client.Lavasfy.requestToken();
                let node = client.Lavasfy.nodes.get(client.config.Lavalink.id);
                let Searched = await node.load(SearchString);

                if (Searched.loadType === "PLAYLIST_LOADED") {
                    let songs = [];
                    for (let i = 0; i < Searched.tracks.length; i++) songs.push(TrackUtils.build(Searched.tracks[i], message.author));
                    player.queue.add(songs);
                    if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length) player.play();
                    SongAddedEmbed.setAuthor(`Spotify Playlisti sıraya eklendi`, message.author.displayAvatarURL());
                    /*
          SongAddedEmbed.setDescription(
            `[${SearchString.name}](${SearchString})`
          );
          */
                    SongAddedEmbed.addField("Sıralanan", `\`${Searched.tracks.length}\` `, false);
                    //SongAddedEmbed.addField("Playlist duration", `\`${prettyMilliseconds(Searched.tracks.duration, { colonNotation: true })}\``, false)
                    Searching.edit(SongAddedEmbed);
                } else if (Searched.loadType.startsWith("TRACK")) {
                    player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));
                    if (!player.playing && !player.paused && !player.queue.size) player.play();
                    SongAddedEmbed.setAuthor(`Spotify™dan Plağa Ekliyorum dostum`, "https://c.tenor.com/5Jqek_mv7BEAAAAd/spotify-logo.gif");
                    //SongAddedEmbed.setDescription(`[${Searched.tracks[0].title}](${Searched.tracks[0].uri})`);
                    //SongAddedEmbed.addField("Yazar", Searched.tracks[0].author, true);
                    //SongAddedEmbed.addField("Süresi", `\`${prettyMilliseconds(Searched.tracks[0].duration, { colonNotation: true })}\``, true);
                    if (player.queue.totalSize > 1) SongAddedEmbed.addField("Sıradaki konumu", `${player.queue.size - 0}`, true);
                    Searching.edit(SongAddedEmbed);
                } else {
                    return client.sendTime(message.channel, "** Eşleşme bulunamadı - **" + SearchString);
                }
            } else {
                let Searched = await player.search(SearchString, message.author);
                if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");

                if (Searched.loadType === "NO_MATCHES") return client.sendTime(message.channel, "** Eşleşme bulunamadı - **" + SearchString);
                else if (Searched.loadType == "PLAYLIST_LOADED") {
                    player.queue.add(Searched.tracks);
                    if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length) player.play();
                    SongAddedEmbed.setAuthor(`Playlist Eklendi`, "https://media0.giphy.com/media/LP62GF82YvcuOuFJRD/giphy.gif?cid=790b761129eb31f0758dc13c30882fba07481be10cd00481&rid=giphy.gif&ct=g");
                    SongAddedEmbed.setThumbnail(Searched.tracks[0].displayThumbnail());
                    SongAddedEmbed.setDescription(`[${Searched.playlist.name}](${SearchString})`);
                    SongAddedEmbed.addField("Sıralanmış", `\`${Searched.tracks.length}\` songs`, false);
                    SongAddedEmbed.addField("Oynatma listesi süresi", `\`${prettyMilliseconds(Searched.playlist.duration, { colonNotation: true })}\``, false);
                    Searching.edit(SongAddedEmbed);
                } else {
                    player.queue.add(Searched.tracks[0]);
                    if (player.paused) await player.pause(false);

                    if (!player.playing && !player.paused && !player.queue.size) player.play();
                    SongAddedEmbed.setAuthor(`Plağı ekliyorum dostum!!`, "https://media0.giphy.com/media/LP62GF82YvcuOuFJRD/giphy.gif?cid=790b761129eb31f0758dc13c30882fba07481be10cd00481&rid=giphy.gif&ct=g");
                    SongAddedEmbed.setThumbnail(Searched.tracks[0].displayThumbnail());
                    SongAddedEmbed.setDescription(`[${Searched.tracks[0].title}](${Searched.tracks[0].uri})`);               
                    if (player.queue.totalSize > 1) SongAddedEmbed.addField("Sıradaki konumu", `${player.queue.size - 0}`, true);
                    Searching.edit(SongAddedEmbed);
                  
                }
            }
        } catch (e) {
            console.log(e);
            return client.sendTime(message.channel, "** <a:bit:821077129713680394> Bir hata ile karşılaştım LÜTFEN TEKRAR AÇINIZ. **");
        }
    },

    SlashCommand: {
        options: [
            {
                name: "song",
                value: "song",
                type: 3,
                required: true,
                description: "Ses kanalında müzik çalın",
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
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "❌ | **Bir şeyler çalmak için benimle aynı ses kanalında olmalısınız!**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, `❌ | **İçinde olmalısın ${guild.me.voice.channel} bu komutu kullanmak için.**`);
            let CheckNode = client.Manager.nodes.get(client.config.Lavalink.id);
            if (!CheckNode || !CheckNode.connected) {
              return client.sendTime(interaction,"❌ | **Lavalink serverlarıyla bağlantı yok**");
            }


            let player = client.Manager.create({
                guild: interaction.guild_id,
                voiceChannel: voiceChannel.id,
                textChannel: interaction.channel_id,
                selfDeafen: false,
            });
            if (player.state != "CONNECTED") await player.connect();
            let search = interaction.data.options[0].value;
            let res;

            if (search.match(client.Lavasfy.spotifyPattern)) {
                await client.Lavasfy.requestToken();
                let node = client.Lavasfy.nodes.get(client.config.Lavalink.id);
                let Searched = await node.load(search);

                switch (Searched.loadType) {
                    case "LOAD_FAILED":
                        if (!player.queue.current) player.destroy();
                        return interaction.send(`Arama sırasında bir hata oluştu`);

                    case "NO_MATCHES":
                        if (!player.queue.current) player.destroy();
                        return interaction.send("Hiçbir sonuç bulunamadı.");
                    case "TRACK_LOADED":
                        player.queue.add(TrackUtils.build(Searched.tracks[0], member.user));
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        return interaction.send(`**Aranan Parça** \`${Searched.tracks[0].info.title}\`.`);
 
                    case "SEARCH_RESULT":
                        player.queue.add(TrackUtils.build(Searched.tracks[0], member.user));
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        return interaction.send(`**Aranan Parça** \`${Searched.tracks[0].info.title}\`.`);

                    case "PLAYLIST_LOADED":
                        let songs = [];
                        for (let i = 0; i < Searched.tracks.length; i++) songs.push(TrackUtils.build(Searched.tracks[i], member.user));
                        player.queue.add(songs);

                        if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length) player.play();
                        return interaction.send(`**Aranan playlist**: \n **${Searched.tracks[0].info.title}** : **${Searched.tracks.length} tracks**`);
                }
            } else {
                try {
                    res = await player.search(search, member.user);
                    if (res.loadType === "LOAD_FAILED") {
                        if (!player.queue.current) player.destroy();
                        return client.sendError(interaction, `:x: | **Arama sırasında bir hata oluştu**`);
                    }
                } catch (err) {
                    return client.sendError(interaction, `**Arama sırasında bir hata oluştu**: ${err.message}`);
                }
                switch (res.loadType) {
                    case "NO_MATCHES":
                        if (!player.queue.current) player.destroy();
                        return interaction.send("No results were found.");
                    case "TRACK_LOADED":
                        player.queue.add(res.tracks[0]);
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        return interaction.send(`**Sıraya eklendi**: \`${res.tracks[0].title}\``);
                    case "PLAYLIST_LOADED":
                        player.queue.add(res.tracks);

                        if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
                        return interaction.send(`**Oynatma listesi arandı**: \n **${res.playlist.name}** : **${res.tracks.length} tracks**`);
                    case "SEARCH_RESULT":
                        const track = res.tracks[0];
                        player.queue.add(track);

                        if (!player.playing && !player.paused && !player.queue.length) {
                            interaction.send(`**Şimdi oynuyor ♪:** \`[${res.tracks[0].title}](${res.tracks[0].uri})\``);
                            player.play();
                        } else {
                            let SongAddedEmbed = new MessageEmbed();
                            SongAddedEmbed.setAuthor(`Plağı takıyorum dostum!`, client.config.IconURL);
                            SongAddedEmbed.setColor("RANDOM");
                            SongAddedEmbed.setDescription(`[${track.title}](${track.uri})`);
                            if (player.queue.totalSize > 1) SongAddedEmbed.addField("Sıradaki konumu", `${player.queue.size - 0}`, true);
                            interaction.send(SongAddedEmbed);
                        }
                }
            }
        },
    },
};