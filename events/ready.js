module.exports = async (client) => {
  client.Ready = true;
  
  client.user.setActivity("Music", { type: "PLAYING" }).then(() => {
    client.Manager.init(client.user.id);
    client.log("Successfully Logged in as " + client.user.tag);
    
    let activities = [ `${client.guilds.cache.size} Sunucuda aktif!`, `${client.channels.cache.size} Kanalda!`, `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kişi!`, `*help🔥|𝙀𝙢𝙧𝙚𝙆|™#5614` ], i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "PLAYING" }), 2500);
  });
  client.RegisterSlashCommands()
};
