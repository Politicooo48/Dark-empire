const Discord = require("discord.js")
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGE_TYPING",] })

client.login(process.env.token)

client.on ("ready", () =>  {
    console.log ("Il bot è online!")
})

client.on("messageCreate", (message) => {
    if(message.content == "dep!help") {
    message.author.send({ content: "`Ecco i comandi di questo bot: dep!image - Per l'immagine del bot, dep!server - Per il link del server, dep!clear [NUMERO] - Per cancellare i messaggi, dep!ban - Per bannare i membri, dep!unban - Per sbannare qualche membro, dep!kick - Per kickare i membri, dep!userinfo [ID] - Per le info di quella persona, dep!serverinfo - Per le info del server`.  __**Questi sono i comandi creati fin'ora sicuramente ne verranno creati altri a breve!!**__" })
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
    client.user.setStatus('idle')
})
client.on("guildMemberAdd", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setTitle("BENVENUTO")
        .setDescription(`Ciao ${member.toString()}, benvenuto in ${member.guild.name}. Sei il **${member.guild.memberCount}° Membro**`)

    client.channels.cache.get("922503525924233238").send({embeds: [embed]}); 
})
client.on("guildMemberRemove", member => {
    if (member.user.bot) return
    var embed = new Discord.MessageEmbed()
        .setTitle("ARRIVEDERCI")
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
    client.on("messageCreate", message => {
    if (message.content.startsWith("dep!ban")) {
        var utente = message.mentions.members.first();
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('Non hai il permesso');
        }
        if (!utente) {
            return message.channel.send('Non hai menzionato nessun utente');
        }
        if (!utente.bannable) {
            return message.channel.send('Io non ho il permesso');
        }
        utente.ban()
            .then(() => {
                var embed = new Discord.MessageEmbed()
                    .setTitle(`${utente.user.username} bannato`)
                    .setDescription(`Utente bannato da ${message.author.toString()}`)

                message.channel.send({ embeds: [embed] })
            })
            client.on("messageCreate", async message => {
                if (message.content.startsWith("dep!unban")) {
                    if (!message.member.permissions.has('BAN_MEMBERS')) {
                        return message.channel.send('Non hai il permesso');
                    }
            
                    var args = message.content.split(/\s+/);
                    var idUtente = args[1]
            
                    if (!idUtente) {
                        return message.channel.send("Non hai scritto l'id di nessun utente");
                    }
            
                    message.guild.members.unban(idUtente)
                        .then(() => {
                            var embed = new Discord.MessageEmbed()
                                .setTitle("Utente sbannato")
                                .setDescription("Questo utente è stato sbannato")
            
                            message.channel.send({ embeds: [embed] })
                        })
                        .catch(() => { message.channel.send("Utente non valido o non bannato") })
                }
            })
            client.on("messageCreate", message => {
                if (message.content.startsWith("dep!kick")) {
                    var utente = message.mentions.members.first();
                    if (!message.member.permissions.has('KICK_MEMBERS')) {
                        return message.channel.send('Non hai il permesso');
                    }
                    if (!utente) {
                        return message.channel.send('Non hai menzionato nessun utente');
                    }
                    if (!utente.kickable) {
                        return message.channel.send('Io non ho il permesso');
                    }
                    utente.kick()
                        .then(() => {
                            var embed = new Discord.MessageEmbed()
                                .setTitle(`${utente.user.username} kickato`)
                                .setDescription(`Utente kickato da ${message.author.toString()}`)
            
                            message.channel.send({ embeds: [embed] })
                        })
                }
            })
    }
})
client.on("messageCreate", message => {
    if (message.content.startsWith("dep!userinfo")) {
        if (message.content == "dep!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            return message.channel.send("Non ho trovato questo utente")
        }
        var elencoPermessi = "";
        if (utente.permissions.has("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "REQUEST_TO_SPEAK", "MANAGE_THREADS", "CREATE_PUBLIC_THREADS", "CREATE_PRIVATE_THREADS", "USE_EXTERNAL_STICKERS", "SEND_MESSAGES_IN_THREADS", "START_EMBEDDED_ACTIVITIES"]
            for (var i = 0; i < permessi.length; i++)
                if (utente.permissions.has(permessi[i]))
                    elencoPermessi += `- ${permessi[i]}\r`
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("User id", utente.user.id, true)
            .addField("Status", utente.presence ? utente.presence.status : "offline", true)
            .addField("Is a bot?", utente.user.bot ? "Yes" : "No", true)
            .addField("Account created", utente.user.createdAt.toDateString(), true)
            .addField("Joined this server", utente.joinedAt.toDateString(), true)
            .addField("Permissions", elencoPermessi, false)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
        message.channel.send({ embeds: [embed] })
    }
})
client.on("messageCreate", message => {
    if (message.content == "!comando") {
        var button1 = new Discord.MessageButton()
            .setLabel("Apri ticket")
            .setCustomId("apriTicket")
            .setStyle("PRIMARY")

        var row = new Discord.MessageActionRow()
            .addComponents(button1)
        var embed = new Discord.MessageEmbed()
            .setTitle(`**Verifica**`)
            .setDescription(`__**CLICCA SUL BOTTONE PER VERIFICARTI!**__`)
            
                            message.channel.send({ embeds: [embed] })

    }
})
