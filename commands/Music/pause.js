const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "pause",
    description: "Mevcut şarkıyı duraklatmak için",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["duraklat","yeter","kes"],
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
        //else if(message.guild.me.voice && message.guild.me.voice.channel.id !== message.member.voice.channel.id)return client.sendTime(message.channel, `❌ | **You must be in ${guild.me.voice.channel} to use this command.**`);
        //if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");  
      if (player.paused) return message.channel.send("Müzik zaten duraklatılmış!");
        player.pause(true);
        let embed = new MessageEmbed().setAuthor(`Duraklatıldı!`, "https://media.tenor.com/images/9adc3b8fde0631c71b85733c33f85651/tenor.gif").setColor("RANDOM").setDescription(`Devam ettirmek için \`${GuildDB.prefix}resume\` yaz!`);
        await message.channel.send(embed);
        await message.react("⏸️");
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
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bu komutu kullanmak için benimle aynı ses kanalında olmalısınız!**");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "❌ | **Şu anda hiçbir şey oynatılmıyor ...**");
            if (player.paused) return client.sendTime(interaction, "Müzik zaten duraklatılmış!");
            player.pause(true);
            client.sendTime(interaction, "**⏸ Duraklatıldı!**");
        },
    },
};
