const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Sırayı karıştırmak için",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["shuff","karıştır","çorbala","ortayakarışık"],
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
        if (!player.queue || !player.queue.length || player.queue.length === 0) return message.channel.send("Sırada karıştırmak için yeterli şarkı yok!");
        player.queue.shuffle();
        let embed = new MessageEmbed().setColor("RANDOM").setDescription(`Shuffled the queue!`);
        await message.channel.send(embed);
        await message.react("✅");
    },
    SlashCommand: {
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Bu komutu kullanmak için bir ses kanalında olmalısınız.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction.channel, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
            if (!player.queue || !player.queue.length || player.queue.length === 0) return interaction.send("Sırada karıştırmak için yeterli şarkı yok!");
            player.queue.shuffle();
            interaction.send("Sırayı karıştırdı!");
        },
    },
};
