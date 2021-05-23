const fs = require("fs")
const path = require("path")

/**
 * Register slash commands for a guild
 * @param {require("../structures/DiscordMusicBot")} client
 * @param {string} guild 
 */
module.exports = (client, guild) => {
    client.log("Registering slash commands for "+guild)

    let musiccom = path.join(__dirname, "..", "commands/Music")
 

    fs.readdir(musiccom, (err, files) => {
        if(err)throw err;
        files.forEach(async file => {
            let cmds = require(musiccom+'/'+ file)
          
            if(!cmds.SlashCommand || !cmds.SlashCommand.run)return
            let dataStuff = {
                name: cmds.name,
                description: cmds.description,
                options: cmds.SlashCommand.options
            }

            //Creating variables like this, So you might understand my code :)
            let ClientAPI = client.api.applications(client.user.id)
            let GuildAPI = ClientAPI.guilds(guild)
            
            client.log("[Slash Command]: [İLETİ] Guild "+guild+", Komut: "+dataStuff.name)
            try{
//                await GuildAPI.commands.post({ data: dataStuff })
            }catch(e){
                client.log("[Slash Command]: [İLETİ - BAŞARISIZ] Guild "+guild+", Komut: "+dataStuff.name)
                console.log(e)
            }
        })
    })
  
client.log("Registering slash commands for "+guild)

    
    let moderasyoncom = path.join(__dirname, "..", "commands/moderasyon")
   
    fs.readdir(moderasyoncom, (err, files) => {
        if(err)throw err;
        files.forEach(async file => {
            let cmd = require(moderasyoncom+'/'+ file)
          
            if(!cmd.SlashCommand || !cmd.SlashCommand.run)return
            let dataStuff = {
                name: cmd.name,
                description: cmd.description,
                options: cmd.SlashCommand.options
            }

            //Creating variables like this, So you might understand my code :)
            let ClientAPI = client.api.applications(client.user.id)
            let GuildAPI = ClientAPI.guilds(guild)
            
            client.log("[Slash Command]: [İLETİ] Guild "+guild+", Komut: "+dataStuff.name)
            try{
//                await GuildAPI.commands.post({ data: dataStuff })
            }catch(e){
                client.log("[Slash Command]: [İLETİ - BAŞARISIZ] Guild "+guild+", Komut: "+dataStuff.name)
                console.log(e)
            }
        })
    })

  client.log("Registering slash commands for "+guild)

    let commandsDir = path.join(__dirname, "..", "commands/eglence")
    
    fs.readdir(commandsDir, (err, files) => {
        if(err)throw err;
        files.forEach(async file => {
            let cmd = require(commandsDir+'/'+ file)
          
            if(!cmd.SlashCommand || !cmd.SlashCommand.run)return
            let dataStuff = {
                name: cmd.name,
                description: cmd.description,
                options: cmd.SlashCommand.options
            }

            //Creating variables like this, So you might understand my code :)
            let ClientAPI = client.api.applications(client.user.id)
            let GuildAPI = ClientAPI.guilds(guild)
            
            client.log("[Slash Command]: [İLETİ] Guild "+guild+", Komut: "+dataStuff.name)
            try{
//                await GuildAPI.commands.post({ data: dataStuff })
            }catch(e){
                client.log("[Slash Command]: [İLETİ - BAŞARISIZ] Guild "+guild+", Komut: "+dataStuff.name)
                console.log(e)
            }
        })
    })
  
  }

