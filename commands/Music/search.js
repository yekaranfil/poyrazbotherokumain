const { MessageEmbed, Message } = require("discord.js");
const { TrackUtils } = require("erela.js");
const _ = require("lodash");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: "search",
    description: "Bir şarkı / çalma listesi arayın",
    usage: "[Şarkı ismi | Şarkı URL]",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["se","ara","a","bul"],
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
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
        let SearchString = args.join(" ");
        if (!SearchString) return client.sendTime(message.channel, `**Kullanım - **\`${GuildDB.prefix}search [Şarkı ismi | Şarkı URL]\``);

        let Searching = await message.channel.send("<a:CWS_GoogleAssistant:853730537192947732>  Aranıyor... <:yt:853732706202288128>");
            let CheckNode = client.Manager.nodes.get(client.config.Lavalink.id);
        if (!CheckNode || !CheckNode.connected) {
        return client.sendTime(
        message.channel,
        "❌ | **Lavalink node not connected**"
        );
        }
        const player = client.Manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: false,
        });

        if (player.state != "CONNECTED") await player.connect();

        let Searched = await player.search(SearchString, message.author);
        if (Searched.loadType == "NO_MATCHES") return client.sendTime(message.channel, "Eşleşme bulunamadı " + SearchString);
        else {
            Searched.tracks = Searched.tracks.map((s, i) => {
                s.index = i;
                return s;
            });
            let songs = _.chunk(Searched.tracks, 4);
            let Pages = songs.map((songz) => {
                let MappedSongs = songz.map((s) => `\`${s.index + 1}.\` [${s.title}](${s.uri}) \nDuration: \`${prettyMilliseconds(s.duration, { colonNotation: true })}\``);

                let em = new MessageEmbed()
                    .setAuthor("Arama Sonuçları " + SearchString, client.config.IconURL)
                    .setColor("RANDOM")
                    .setDescription(MappedSongs.join("\n\n"));
                return em;
            });

            if (!Pages.length || Pages.length === 1) return message.channel.send(Pages[0]);
            else client.Pagination(message, Pages);

            let w = (a) => new Promise((r) => setInterval(r, a));
            await w(500); //waits 500ms cuz needed to wait for the above song search embed to send ._.
            let msg = await message.channel.send("**Şarkının numarasını yazın!(Emojilere basarak sayfa değiştirebilirsiniz.)(30 saniye` içinde sona eriyor. <a:SayGif:821076736703725599>**");

            let er = false;
            let SongID = await message.channel
                .awaitMessages((msg) => message.author.id === msg.author.id, { max: 1, errors: ["time"], time: 30000 })
                .catch(() => {
                    er = true;
                    msg.edit("**Cevap vermen çok uzun sürdü. Bir şey oynamak istiyorsanız komutu tekrar çalıştırın!**");
                });
            if (er) return;
            /**@type {Message} */
            let SongIDmsg = SongID.first();

            if (!parseInt(SongIDmsg.content)) return client.sendTime("Lütfen doğru şarkı  numarasını gönderin");
            let Song = Searched.tracks[parseInt(SongIDmsg.content) - 1];
            if (!Song) return message.channel.send("Verilen numara için şarkı bulunamadı");
            player.queue.add(Song);
            if (!player.playing && !player.paused && !player.queue.size) player.play();
            let SongAddedEmbed = new MessageEmbed();
            SongAddedEmbed.setAuthor(`Sıraya ekliyorum!`,"https://media0.giphy.com/media/LP62GF82YvcuOuFJRD/giphy.gif?cid=790b761129eb31f0758dc13c30882fba07481be10cd00481&rid=giphy.gif&ct=g");
            SongAddedEmbed.setThumbnail(Song.displayThumbnail());
            SongAddedEmbed.setColor("RANDOM");
            SongAddedEmbed.setDescription(`[${Song.title}](${Song.uri})`);
            SongAddedEmbed.addField("Yazar", `${Song.author}`, true);
            SongAddedEmbed.addField("Süresi", `\`${prettyMilliseconds(player.queue.current.duration, { colonNotation: true })}\``, true);
            if (player.queue.totalSize > 1) SongAddedEmbed.addField("Sıradaki konumu", `${player.queue.size - 0}`, true);
            message.channel.send(SongAddedEmbed);
        }
    },

    SlashCommand: {
        options: [
            {
                name: "song",
                value: "song",
                type: 3,
                required: true,
                description: "Bir şarkı / çalma listesi arayın",
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
  
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
                  let CheckNode = client.Manager.nodes.get(client.config.Lavalink.id);
          if (!CheckNode || !CheckNode.connected) {
          return client.sendTime(
            interaction,
            "❌ | **Lavalink serverlarına eşleşme yok**"
            );
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
                        return client.sendError(interaction, `:x: | **Arama sırasında bir hata oluştu **`);

                    case "NO_MATCHES":
                        if (!player.queue.current) player.destroy();
                        return interaction.send("No results were found.");
                    case "TRACK_LOADED":
                        player.queue.add(TrackUtils.build(Searched.tracks[0], member.user));
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        return client.sendTime(interaction, `**Sıraya eklendi!:** \`[${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri}}\`.`);

                    case "PLAYLIST_LOADED":
                        let songs = [];
                        for (let i = 0; i < Searched.tracks.length; i++) songs.push(TrackUtils.build(Searched.tracks[i], member.user));
                        player.queue.add(songs);

                        if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length) 
                          player.play();
                        return client.sendTime(interaction, `**Playlist sıraya eklendi**: \n**${Searched.playlist.name}** \nEnqueued: **${Searched.playlistInfo.length} songs**`);
                }
            } else {
                try {
                    res = await player.search(search, member.user);
                    if (res.loadType === "LOAD_FAILED") {
                        if (!player.queue.current) player.destroy();
                        throw new Error(res.exception.message);
                    }
                } catch (err) {
                    return client.sendTime(interaction, `Arama sırasında bir hata oluştu: ${err.message}`);
                }
                switch (res.loadType) {
                    case "NO_MATCHES":
                        if (!player.queue.current) player.destroy();
                        return interaction.send("No results were found.");
                    case "TRACK_LOADED":
                        player.queue.add(res.tracks[0]);
                        if (!player.playing && !player.paused && !player.queue.length) 
                          player.play();
                        return client.sendTime(interaction,`**Sıraya eklendi:** \`[${res.tracks[0].title}](${res.tracks[0].uri})\`.`);
                    case "PLAYLIST_LOADED":
                        player.queue.add(res.tracks);

                        if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
                        return client.sendTime(`**Sıraya eklenen oynatma listesi**: \n**${res.playlist.name}** \nEnqueued: **${res.playlistInfo.length} songs**`);
                    case "SEARCH_RESULT":
                        let max = 10,
                            collected,
                            filter = (m) => m.author.id === interaction.member.user.id && /^(\d+|end)$/i.test(m.content);
                        if (res.tracks.length < max) max = res.tracks.length;

                        const results = res.tracks
                            .slice(0, max)
                            .map((track, index) => `\`${++index}\` - [${track.title}](${track.uri}) \n\t\`${prettyMilliseconds(track.duration, { colonNotation: true })}\`\n`)
                            .join("\n");

                        const resultss = new MessageEmbed().setDescription(`${results}\n\n\t**Çalmak istediğiniz şarkının numarasını yazın!**\n`).setColor("RANDOM").setAuthor(`Search results for ${search}`, client.config.IconURL);
                        interaction.send(resultss);
                        try {
                            collected = await awaitchannel.awaitMessages(filter, { max: 1, time: 30e3, errors: ["time"] });
                        } catch (e) {
                            if (!player.queue.current) player.destroy();
                            return awaitchannel.send("❌ | **Bir seçim sağlamadınız**");
                        }

                        const first = collected.first().content;

                        if (first.toLowerCase() === "cancel") {
                            if (!player.queue.current) player.destroy();
                            return awaitchannel.send("Arama iptal edildi.");
                        }

                        const index = Number(first) - 1;
                        if (index < 0 || index > max - 1) return awaitchannel.send(`The number you provided was greater or less than the search total. Usage - \`(1-${max})\``);
                        const track = res.tracks[index];
                        player.queue.add(track);

                        if (!player.playing && !player.paused && !player.queue.length) {
                            player.play();
                        } else {
                            let SongAddedEmbed = new MessageEmbed();
                            SongAddedEmbed.setAuthor(`Added to queue`, client.config.IconURL);
                            SongAddedEmbed.setThumbnail(track.displayThumbnail());
                            SongAddedEmbed.setColor("RANDOM");
                            SongAddedEmbed.addField("Şarkı", `[${track.title}](${track.uri})`, true);
                            SongAddedEmbed.addField("Yazar", track.author, true);
                            SongAddedEmbed.addField(("Süresi",`\`${prettyMilliseconds(track.duration, {colonNotation: true,})}\``,true));
                            awaitchannel.send(SongAddedEmbed);
                        }
                }
            }
        },
    },
};
