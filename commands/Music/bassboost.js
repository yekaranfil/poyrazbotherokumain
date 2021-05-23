const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
    none: 0.0,
    low: 0.2,
    medium: 0.3,
    high: 0.35,
};
module.exports = {
    name: "bassboost",
    description: "Bas güçlendirici ses efektini etkinleştirir",
    usage: "<none|low|medium|high>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["bb", "bass"],
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
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Bir şeyler çalmak için bir ses kanalında olmalısınız!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
        
        if (!args[0]) return client.sendTime(message.channel, "**Lütfen bir bassboost seviyesi belirleyin. \n Mevcut Düzeyler: ** `none`,`low` , `medium`, `high`**"); //if the user do not provide args [arguments]

        let level = "none";
        if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

        player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

        return client.sendTime(message.channel, `✅ | **Bassboost level ayarlandı** \`${level}\``);
    },
    SlashCommand: {
        options: [
                {
                  name: "level",
                  description: `Lütfen bir bassboost seviyesi sağlayın. Mevcut Seviyeler: low, medium, high, ya da none`,
                  value: "[level]",
                  type: 3,
                  required: true,
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
          const levels = {
            none: 0.0,
            low: 0.2,
            medium: 0.3,
            high: 0.90,
        };
            
            let player = await client.Manager.get(interaction.guild_id);
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            if (!player) return client.sendTime(interaction, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(voiceChannel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
            if (!args) return client.sendTime(interaction, "**Lütfen bir bassboost seviyesi belirleyin. \n Mevcut Düzeyler: ** `none`,`low` , `medium`, `high`**"); //if the user do not provide args [arguments]

            let level = "none";
            if (args.length && args[0].value in levels) level = args[0].value;

            player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

            return client.sendTime(interaction, `✅ | **Bas artırma düzeyi şu şekilde ayarlandı:** \`${level}\``);
        },
    },
};