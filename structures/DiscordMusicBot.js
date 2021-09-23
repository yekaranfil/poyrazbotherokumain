const { Collection, Client, MessageEmbed } = require("discord.js");
const { LavasfyClient } = require("lavasfy");
const { Manager } = require("erela.js");
const { Server } = require("socket.io");
const http = require('http');
const Jsoning = require("jsoning");
const fs = require("fs");
const path = require("path");
const Express = require("express");
const app = Express();
const Logger = require("./Logger");
const prettyMilliseconds = require("pretty-ms");


//Class extending Stuff
require("./EpicPlayer")//idk why im doing but i wanna learn something new so...



class DiscordMusicBot extends Client {
  constructor(props) {
    super(props);

    this.commands = new Collection();
    this.connections = new Map();
    this.CommandsRan = 0;
    this.SongsPlayed = 0;

    this.database = {
      //Saved at jsoning node_modules directory, DOCS: https://jsoning.js.org/
      guild: new Jsoning("guild.json"), //Server Config
    };
    this.logger = new Logger(path.join(__dirname, "..", "Logs.log"));

    try {
      //Config for testing
      this.config = require("../dev-config");
    } catch {
      //Config for production
      this.config = require("../config");
    }
    if (this.config.Token === "")
      return new TypeError("Lütfen config.js dosyasındaki bilgileri doldurun.");

    this.LoadCommands();
    this.LoadEvents();

    //Web Stuff
    this.server = Express();
    this.http = http.createServer(this.server);
//    this.server.use("/", require("../api"));
    this.io = new Server(this.http);
    require("../api/socket")(this.io)

    //Utils
    this.ProgressBar = require("../util/ProgressBar");
    this.Pagination = require("../util/pagination");
    this.ParseHumanTime = (str) => {
      let Parsed;
      try {
        Parsed = require("../util/TimeString")(str);
        return Parsed;
      } catch {
        Parsed = false;
        return Parsed;
      }
    };

    this.Ready = false

    //idk where do i do it so i did it here ;-;
    this.ws.on('INTERACTION_CREATE', async interaction => {
      let GuildDB = await this.GetGuild(interaction.guild_id);

      //Initialize GuildDB
      if (!GuildDB) {
        //await this.database.guild.set(message.guild.id, {
          //prefix: prefix,
          //DJ: null,
        //});
        //GuildDB = await this.GetGuild(message.guild.id);
      }

      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;

      //Easy to send respnose so ;)
      interaction.guild = await this.guilds.fetch(interaction.guild_id)
      interaction.send = async (message) => {
        return await this.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
              type: 4,
              data: typeof message == 'string'?{ content: message }:message.type && message.type === 'rich'?{ embeds: [message] }:message
          }
       })
      }

      let cmd = client.commands.get(command)
      if(cmd.SlashCommand && cmd.SlashCommand.run)cmd.SlashCommand.run(this, interaction, args, { GuildDB })
    })

    //because not worked lol ;-; 
    const client = this;

    this.Lavasfy = new LavasfyClient(
      {
        clientID: this.config.Spotify.ClientID,
        clientSecret: this.config.Spotify.ClientSecret,
      },
      [
        {
          id: this.config.Lavalink.id,
          host: this.config.Lavalink.host,
          port: this.config.Lavalink.port,
          password: this.config.Lavalink.pass,
          secure: this.config.Lavalink.secure,
        },
      ]
    );

    this.Manager = new Manager({
      nodes: [
        {
          identifier: this.config.Lavalink.id,
          host: this.config.Lavalink.host,
          port: this.config.Lavalink.port,
          password: this.config.Lavalink.pass,
          secure: this.config.Lavalink.secure,
          retryDelay: this.config.Lavalink.retryDelay,
          retryAmount: this.config.Lavalink.retryAmount
        },
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
      .on("nodeConnect", (node) =>
        this.log(`Lavalink: Node ${node.options.identifier} connected`)
      )
      .on("nodeError", (node, error) =>
        this.log(
          `Lavalink: Node ${node.options.identifier} had an error: ${error.message}`
        )
      )
      .on("trackStart", async (player, track, message) => {
        this.SongsPlayed++;
    
    let TrackStartedEmbed = new MessageEmbed()
      

      .setAuthor("Şimdi oynuyor","https://media.giphy.com/media/lNLVInp4Tx3BLnR6Nx/giphy.gif" )
      .setThumbnail(player.queue.current.displayThumbnail())
      .setDescription(`[${track.title}](${track.uri})`,"<a:dorulama:821077131168972821>")
      .addField("Talep eden", `${track.requester}`, true,)
      .addField("Süresi - Ses düzeyi", `\`${prettyMilliseconds(track.duration, {colonNotation: true})} - Volume ${player.volume}\``, true)
      .setColor("#00ced1")
      //.setFooter("Started playing at");
    let NowPlaying = await client.channels.cache.get(player.textChannel).send(TrackStartedEmbed);
    player.setNowplayingMessage(NowPlaying)
      })
    
      .on("queueEnd", async (player) => {
        
        let QueueEmbed = new MessageEmbed()
        
          .setAuthor("Sıra sona erdi", "https://media1.tenor.com/images/1ac5b668fbbda8f44b0db20dc477a379/tenor.gif?itemid=8904327")
          .setColor("RED")
          .setTimestamp()
        client.channels.cache.get(player.textChannel).send(QueueEmbed);
        
        if(!this.config["24/7"]) player.destroy()
        
      
      });
  }
  
  

  
// music commands yüklemesi  
  LoadCommands() {
    let musiccom = path.join(__dirname, "..", "commands/Music");
    fs.readdir(musiccom, (err, files) => {
      if (err) this.log(err);
      else
        files.forEach((file) => {
          let cmds = require(musiccom+ "/" + file);     
          if (!cmds.name || !cmds.description || !cmds.run)
            return this.log(
              "Komut yüklenemiyor: " +
                file.split(".")[0] +
                ", Nedeni: Dosyanın çalıştırılması / adı / açıklaması yok"
            );
          this.commands.set(file.split(".")[0], cmds);
          this.log("Komut Yüklendi: " + file.split(".")[0]);
        });
      
      
    });
  //music yüklemesi bitiş
   // moderation commands yüklemesi
  
    let moderasyoncom = path.join(__dirname, "..", "commands/moderasyon");
    fs.readdir(moderasyoncom,  (err, files) => {
      if (err) this.log(err);
      else
        files.forEach((file) => {
          let cmd = require(moderasyoncom + "/" + file);     
          if (!cmd.name || !cmd.description || !cmd.run)
            return this.log(
              "Komut yüklenemiyor: " +
                file.split(".")[0] +
                ", Nedeni: Dosyanın çalıştırılması / adı / açıklaması yok"
            );
          this.commands.set(file.split(".")[0], cmd);
          this.log("Komut Yüklendi: " + file.split(".")[0]);
        });
      
      
    });
  
//  // moderation commands yüklemesi bitiş noktası
// music commands load
  
    let eglencecom = path.join(__dirname, "..", "commands/eglence");
    fs.readdir(eglencecom,  (err, files) => {
      if (err) this.log(err);
      else
        files.forEach((file) => {
          let cmd = require(eglencecom + "/" + file);     
          if (!cmd.name || !cmd.description || !cmd.run)
            return this.log(
              "Komut yüklenemiyor: " +
                file.split(".")[0] +
                ", Nedeni: Dosyanın çalıştırılması / adı / açıklaması yok"
            );
          this.commands.set(file.split(".")[0], cmd);
          this.log("Komut Yüklendi: " + file.split(".")[0]);
        });
      
      
    });
  }

// music commands load bitişi
  
  LoadEvents() {
    let EventsDir = path.join(__dirname, "..", "events");
    fs.readdir(EventsDir, (err, files) => {
      if (err) this.log(err);
      else
        files.forEach((file) => {
          const event = require(EventsDir + "/" + file);
          this.on(file.split(".")[0], event.bind(null, this));
          this.logger.log("Olay Yüklendi: " + file.split(".")[0]);
        });
    });
  }

  async GetGuild(GuildID) {
    return new Promise(async (res, rej) => {
      let guild = await this.database.guild
        .get(GuildID)
        .catch((err) => rej(err));
      res(guild);
    });
  }

  log(Text) {
    this.logger.log(Text);
  }

  sendError(Channel, Error) {
    let embed = new MessageEmbed()
      .setTitle("An error occured")
      .setColor("RED")
      .setDescription(Error)
      .setFooter(
        "Bunun bir hata olduğunu düşünüyorsanız, lütfen bunu destek sunucusunda bildirin!"
      );

    Channel.send(embed);
  }

  sendTime(Channel, Error) {
    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(Error);

    Channel.send(embed);
  }


  
  build() {
    this.login(this.config.Token);
    this.http.listen(process.env.PORT || this.config.Port, () => this.log("Web Sunucusu başlatıldı "));
  }

  RegisterSlashCommands(){
    this.guilds.cache.forEach(guild => {
      require("../util/RegisterSlashCommands")(this, guild.id)
    })
  }
}


module.exports = DiscordMusicBot;