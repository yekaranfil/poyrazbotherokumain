const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    description: "Ses kanalından çıkmak için",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["stop", "exit", "quit", "dc", "disconnect","bitir","sg","uza","l"],
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
        if (player.playing) client.sendTime(message.channel, ":notes: | **Oynatıcı durduruldu, ayrılıyorum!**");
        else { client.sendTime(message.channel,"**Ayrılıyorum!**")}
        await message.react("<a:kGif:821076751761014844>");
        player.destroy();
    },

    SlashCommand: {
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

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, `❌ | **You must be in ${guild.me.voice.channel} to use this command.**`);

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "❌ | **Şu anda hiçbir şey oynatılmıyor...**");
            player.destroy();
            client.sendTime(interaction, ":notes: | **Oyuncu durdu ve sıra temizlendi.s**");
        },
    },
};
