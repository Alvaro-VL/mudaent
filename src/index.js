require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildEmojisAndStickers,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
});

client.on('ready',  async() => {
    console.log('Tamos ready2');
})

//Hate a lexpiera
client.on('messageCreate' , (message) => {
    if (message.author.bot && message.author.id == process.env.Mudae) {
        let $interaction = message.interaction;
        if ($interaction != null) {
            let $autor = message.interaction.user;
            let $time = message.createdAt;
        
            if ($autor.id == process.env.IdLuffyRay) {
                if ($time.getMinutes() == 46) {
                    message.channel.send("Para de rollear a y 46 C4NC3R")
                    message.delete();
                }else if ($time.getMinutes() == 47){
                    message.channel.send("<:threw:894212990981800017>");
                }else if ($time.getMinutes() == 48) {
                    message.channel.send("<:yutapon:903385420996444221>");
                }
                
                //hasta junio
                let random = Math.floor(Math.random() * 20);
                console.log(random);
                if (random == 5) {
                    message.delete();
                    message.channel.send("https://media.discordapp.net/attachments/828667402459283497/992562462702456862/GAY.gif");
                }
            }
        }
    }
    return;
})

//Comandos
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let $comando = interaction.commandName;

    switch ($comando) {
        case 'bestwaifu':
            await interaction.channel.send("https://tenor.com/view/oshi-no-ko-kana-arima-arima-kana-oshi-no-ko-kana-arima-oshi-no-ko-arima-kana-gif-1759838810798484675");
            break;

        case 'falso':
            let $falso = interaction.guild.members.cache.get(process.env.IdRuben);
            await interaction.reply('Hacking... <:hackerman:906165083451842571>');
            $falso.setNickname('El más Falso');
            break;

        case 'morosos':
            // Lista de IDs de usuarios implicados
            const miembros = [
                process.env.IdLuffyRay,
                process.env.IdCristian,
                process.env.IdLexpiera,
                process.env.IdBajos,
            ];
        
            // Emojis
            const monkaGun = "<:monkagun:931290838586261555>"; // Emoji inicial
            const tarjetonId = "900711012053942272"; // ID del emoji custom para marcar pago
        
            // Construir el mensaje inicial con menciones
            let texto = "Morosos:\n";
            miembros.forEach(userId => {
                if (userId == process.env.IdCristian) {
                    texto += `<@${userId}> 8,663333333333333€ ${monkaGun}\n`;
                } else {
                    texto += `<@${userId}> 4,331666666666667€ ${monkaGun}\n`;
                }
            });
        
            // ⚡ Enviar el mensaje de morosos como mensaje normal
            const msg = await interaction.channel.send({ content: texto });
        
            // ⚡ Añadir reacción inicial
            await msg.react(tarjetonId);
        
            // ⚡ Conjunto para controlar quién ya reaccionó
            const yaPagaron = new Set();
        
            // ⚡ Collector de reacciones
            const collector = msg.createReactionCollector({
                filter: (reaction, user) =>
                    !user.bot &&
                    miembros.includes(user.id) &&
                    reaction.emoji.id === tarjetonId,
                dispose: true,
            });
        
            // ⚡ Al detectar una reacción
            collector.on("collect", async (reaction, user) => {
                if (yaPagaron.has(user.id)) return;
                yaPagaron.add(user.id);
        
                // Reemplazar emoji de la línea del usuario
                let nuevasLineas = msg.content
                    .split("\n")
                    .map(linea =>
                        linea.includes(`<@${user.id}>`)
                            ? linea.replace(monkaGun, `<:pepotarjeton:${tarjetonId}>`)
                            : linea
                    )
                    .join("\n");
        
                await msg.edit({ content: nuevasLineas });
            });
        
            // ⚡ Opcional: manejar cuando se quita la reacción
            collector.on("remove", async (reaction, user) => {
                if (!yaPagaron.has(user.id)) return;
        
                yaPagaron.delete(user.id);
        
                let nuevasLineas = msg.content
                    .split("\n")
                    .map(linea =>
                        linea.includes(`<@${user.id}>`)
                            ? linea.replace(`<:pepotarjeton:${tarjetonId}>`, monkaGun)
                            : linea
                    )
                    .join("\n");
        
                await msg.edit({ content: nuevasLineas });
            });
        
            // ⚡ Responder al slash command para cumplir con la interacción
            await interaction.reply({ content: "Mensaje de morosos enviado ✅", ephemeral: true });
        
            break;


        default:
            break;
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    if (!reaction.message.guild) return;

    const estado = client.morososEstado?.[reaction.message.id];
    if (!estado) return; // no es un mensaje de morosos
    if (!estado.miembros.includes(user.id)) return;
    if (estado.yaPagaron.has(user.id)) return;

    // solo custom emoji tarjeton
    if (reaction.emoji.id !== "900711012053942272") return;

    estado.yaPagaron.add(user.id);

    // Actualizar mensaje
    let nuevasLineas = reaction.message.content
        .split("\n")
        .map(linea =>
            linea.includes(`<@${user.id}>`) ? linea.replace(monkaGun, `<:pepotarjeton:900711012053942272>`) : linea
        )
        .join("\n");

    await reaction.message.edit({ content: nuevasLineas });
});

client.login(process.env.TOKEN);
