const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "volume",
    description: "Ses düzeyini Değiştirir",
    usage: "<Ses değeri>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["vol", "v","ses","versesi","kökle"],
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
         if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
        if (!parseInt(args[0])) return message.channel.send("Lütfen 1 - 100 arasında seçim yapın");
        let vol = parseInt(args[0]);
        player.setVolume(vol);
        message.channel.send(`🔉 | Ses düzeyi ayarlandı \`${player.volume}\``);
    },
    SlashCommand: {
        options: [
            {
                name: "number",
                value: "number 1 - 100",
                type: 4,
                required: true,
                description: "Sesi neye değiştirmek istersiniz?",
            },
        ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, message, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | Bu komutu kullanmak için bir ses kanalında olmalısınız.");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
            if (!args.length) return client.sendTime(message.channel, `🔉 | Mevcut hacim \`${player.volume}\`.`);
            let vol = parseInt(args[0].value);
            if (!vol || vol < 1 || vol > 100) return client.sendTime(message.channel, `Lütfen bu aralıkta girin \`1 - 100\``);
            player.setVolume(vol);
            client.sendTime(message.channel, `🔉 | Ses şu şekilde ayarlandı:\`${player.volume}\``);
        },
    },
};
