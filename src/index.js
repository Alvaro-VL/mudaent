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
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let $comando = interaction.commandName;

    switch ($comando) {
        case 'bestwaifu':
            interaction.channel.send("https://tenor.com/view/oshi-no-ko-kana-arima-arima-kana-oshi-no-ko-kana-arima-oshi-no-ko-arima-kana-gif-1759838810798484675");
            break;

        case 'falso':
            let $falso = interaction.guild.members.cache.get(process.env.IdRuben);
            interaction.reply('Hacking... <:hackerman:906165083451842571>');
            $falso.setNickname('El más Falso');
            break;

        case 'morosos':
            const miembros = [
                process.env.IdLuffyRay,
                //process.env.IdCristian,
                //process.env.IdLexpiera,
                //process.env.IdBajos,
            ];
        
            let texto = "Morosos:\n";
            let monkaGun = "<:monkagun:931290838586261555>";
            let tarjeton = "<:pepotarjeton:900711012053942272>";
        
            miembros.forEach((m) => {
                const userId = m.replace(/[<@!>]/g, "");
        
                if (userId === process.env.IdCristian) {
                    texto += `${m} 8,663333333333333€ ${monkaGun}\n`;
                } else {
                    texto += `${m} 4,331666666666667€ ${monkaGun}\n`;
                }
            });
        
            // ⚡ Responder y guardar el mensaje
            const msg = await interaction.reply({ content: texto, fetchReply: true });
        
            // ⚡ Reaccionar al mensaje
            await msg.react(tarjeton);
        
            const yaPagaron = new Set();
        
            // ⚡ Crear collector de reacciones
            const collector = msg.createReactionCollector({
                filter: (reaction, user) =>
                    reaction.emoji.name === "pepotarjeton" &&
                    !user.bot &&
                    miembros.includes(`<@${user.id}>`),
                dispose: true,
            });
        
            collector.on("collect", async (reaction, user) => {
                if (yaPagaron.has(user.id)) return;
                yaPagaron.add(user.id);
        
                // Reemplazar emoji en la línea correspondiente
                let nuevasLineas = msg.content
                    .split("\n")
                    .map((linea) =>
                        linea.includes(`<@${user.id}>`)
                            ? linea.replace(monkaGun, tarjeton)
                            : linea
                    )
                    .join("\n");
        
                await msg.edit(nuevasLineas);
            });
            break;

        default:
            break;
    }
})

client.login(process.env.TOKEN);
