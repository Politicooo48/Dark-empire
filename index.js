const Discord = require("discord.js")
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGE_TYPING",] })

client.login(process.env.token)

client.on ("ready", () =>  {
    console.log ("Il bot è online!")
})

client.on("messageCreate", (message) => {
    if(message.content == "dep!info") {
    message.author.send({ content: "Questo server nasce il 12/12/2021 e l'owner ufficiale è Shark con l'altro owner Professore!" })
}

    if(message.content == "dep!image") {
        message.channel.send("https://cdn.discordapp.com/attachments/930553618149539980/931241494990422107/IMG_2974.png")
    }

    if(message.content == "dep!server") {
        message.channel.send("__**Ecco il server Dark Empire**__: https://discord.gg/xT8xpheF")
    }
})
client.on('ready', () => {
    client.user.setActivity('dep!help', { type: 'LISTENING' }); 
    client.user.setActivity("dep!help", {
    });
    client.user.setStatus('online')
})
client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setTitle("WELCOME")
        .setDescription(`Ciao ${member.toString()}, benvenuto in ${member.guild.name}. Sei il **${member.guild.memberCount}° Membro**`)

    client.channels.cache.get("922503525924233238").send({embeds: [embed]}); 
})
client.on("guildMemberRemove", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setTitle("GOODBEY")
        .setDescription(`Ciao ${member.toString()}, ci rivediamo presto qua in ${member.guild.name}`)

    client.channels.cache.get("922503525924233238").send({embeds: [embed]}); 
    })
    client.on("messageCreate", message => {
        if (message.content.startsWith("dep!clear")) {
            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
                return message.channel.send('Non hai il permesso');
            }
            if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
                return message.channel.send('Non ho il permesso');
            }
            var count = parseInt(message.content.split(/\s+/)[1]);
            if (!count) {
                return message.channel.send("Inserisci un numero valido")
            }
            if (count > 100) {
                return message.channel.send("Non puoi cancellare più di 100 messaggi")
            }
            message.channel.bulkDelete(count, true)
            message.channel.send(count + " messaggi eliminati").then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })
        }
    })
    client.on("messageCreate", message => {
        if (message.content.startsWith("dep!avatar")) {
            if (message.content.trim() == "!avatar") {
                var utente = message.member;
            }
            else {
                var utente = message.mentions.members.first();
            }
            if (!utente) {
                return message.channel.send("Utente non trovato")
            }
            var embed = new Discord.MessageEmbed()
                .setTitle(utente.user.tag)
                .setDescription("L'avatar di questo utente")
                .setImage(utente.user.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 512
                }))
            message.channel.send({ embeds: [embed] })
        }
    })