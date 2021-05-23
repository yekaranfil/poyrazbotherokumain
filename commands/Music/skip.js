const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "skip",
    description: "Mevcut şarkıyı atlamak için",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["s", "next","fs","geç","seri","bune aq"],
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
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");
        player.stop();
        await message.react("<a:dorulama:821077131168972821>");
    },
    SlashCommand: {
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");

            const skipTo = interaction.data.options ? interaction.data.options[0].value : null;

            let player = await client.Manager.get(interaction.guild_id);

            if (!player) return interaction.send("Şu anda hiçbir şey oynatılmıyor..");
            console.log(interaction.data);
            if (skipTo !== null && (isNaN(skipTo) || skipTo < 1 || skipTo > player.queue.length)) return interaction.send("❌ | Geçersiz numara atlanacak.");
            player.stop(skipTo);
            interaction.send("Şarkıyı atladı");
        },
    },
};
