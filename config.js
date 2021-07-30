module.exports = {
  Admins: ["785872572620734504","264142213833949184"], //Admins of the bot
  DefaultPrefix: "*", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/T5q2bcKQN5", //Support Server Link
  Token: "" || process.env.Token, //Discord Bot Token
  ClientID: "" || process.env.Discordclient, //Discord Client ID
  ClientSecret: "" || process.env.Secretclient, //Discord Client Secret
  Scopes: ["identify", "guilds"], //Discord OAuth2 Scopes
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": true,//If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is cute", //A Secret like a password
  IconURL:
    "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  Permissions: 2205280576, //Bot Inviting Permissions
  Website: "https://poyrazbotv12last.glitch.me/", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  //Lavalink - Already there is a serer to connect :)
  Lavalink: {
    id: "main",
    host: "lava.link",
    port: 80,
    pass: "80",
    
  },

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: "20928499b7e64f74b75cc4dcf0320056", //Spotify Client ID
    ClientSecret: "acc3dca1522c404991ac886ff9a1b09c", //Spotify Client Secret
  },
};
