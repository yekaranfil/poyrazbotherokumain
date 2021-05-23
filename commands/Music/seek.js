const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "seek",
    description: "Mevcut şarkıyı aramak için",
    usage: "<time s/m/h>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["forward"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
        if (!player.queue.current.isSeekable) return message.channel.send("Bu şarkıyı arayamıyor.");
        let SeekTo = client.ParseHumanTime(args.join(" "));
        if (!SeekTo) return message.channel.send("Lütfen aramak için bir zaman girin!");
        player.seek(SeekTo * 1000);
        message.react("✅");
    },

    SlashCommand: {
        options: [
            {
                name: "time",
                description: "Bir şarkının herhangi bir bölümünü ara",
                value: "time",
                type: 1,
                required: true,
                options: [],
                run: async (client, interaction, args, { GuildDB }) => {
                    const guild = client.guilds.cache.get(interaction.guild_id);
                    const member = guild.members.cache.get(interaction.member.user.id);

                    if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız.**");
                    if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, `❌ | **You must be in ${guild.me.voice.channel} to use this command.**`);

                    let player = await client.Manager.get(interaction.guild_id);
                    if (!player) return interaction.send("❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
                    if (!player.queue.current.isSeekable) return interaction.send("Bu şarkıyı arayamıyor.");
                    let SeekTo = client.ParseHumanTime(interaction.data.options[0].value);
                    if (!SeekTo) return interaction.send("Lütfen aramak için bir zaman girin!");
                    player.seek(SeekTo * 1000);
                    interaction.send("Şarkı başarıyla şuraya taşındı: ", Seekto);
                },
            },
        ],
    },
};
