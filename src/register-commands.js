require('dotenv').config();
const {REST, Routes} = require('discord.js');

const commands = [
    {
        name: 'bestwaifu',
        description: 'Confirma la best waifu',
    },
    {
        name: 'falso',
        description: 'Cambia el nombre al falso',
    },
    {
        name: 'morosos',
        description: 'Crea mensaje de morosos',
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.IdBot,
                process.env.Aloha,
            ),
            {body: commands}
        )
    } catch (errror){
        console.log('Error: ${error}');
    }
})();
