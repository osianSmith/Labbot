require('dotenv').config()
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD;
const CLIENT_ID = process.env.CLIENT;
console.log(TOKEN)
console.log(GUILD_ID)
console.log(CLIENT_ID)

const { REST } = require('@discordjs/rest');
const { Routes, GuildDefaultMessageNotifications } = require('discord-api-types/v9');

const commands = [{
    name: 'ping',
    description: 'Replies with Pong!'
}, {
    name: 'gethelp',
    description: 'Request help!'
}, {
    name: 'whotohelp',
    description: 'Who to help next! (teaching level only)'
}];

const rest = new REST({ version: '9' }).setToken(TOKEN);
// Starts program 
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

//Queue stuff
var guildList = [];
var supportList = []

function GetGuildID(guildID) {
    if (guildList.includes(guildID)) {
        console.log("Gild does exist")
        //finds the index that this belongs to
        return guildList.indexOf(guildID);

    }
    else {
        console.log("Gild does not exist")
        //pushes to server
        guildList.push(guildID);
        supportList.push([]); //appends new server
        console.log("pushed new server");
    
        //returns location
        console.log(guildID);
        return guildList.indexOf(guildID);

    }
}

const { Client, Intents, Message, Guild } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    //gets the guidID for the 2 d array (x axis)
    var guildID = GetGuildID(interaction.guild.id);

    console.log("\n\n\n\ supportList: \n" + supportList[guildID]);
  

    //handle permission
    var hasAdminPrivlages = false;
    if (interaction.member.roles.cache.find(r => r.name === "admin")) {
        hasAdminPrivlages = true;
    }


    console.log("hasRole = " + hasAdminPrivlages + ". guildID = " + guildID + " interaction.commandName = " + interaction.commandName  + " guildID; " + guildID);
    if (!interaction.isCommand()) return;
    (interaction.commandName);
    //gets username
    var username = (interaction.user.username);
    //test code
    if (interaction.commandName === 'ping') {

        await interaction.reply('Pong!');
    }
    //gets help 
    else if (interaction.commandName === 'gethelp') {
        console.log(supportList[guildID])
        if (!supportList[guildID].includes(username)) {
            supportList[guildID].push(username);
            await interaction.reply('Getting Help!');
        }
        else {
            await interaction.reply('You are already on the list!');
        }
    }
    else if (interaction.commandName === 'nohelpneeded') {
        const id = supportList.indexOf(username);
        if (id >= 0) {
            console.log("Removing user from the list")
            supportList[guildID].splice(id, 1); //shift does not work here - the reason being is because if it is empty it will deinit the list
        }
        await interaction.reply('You have been removed from the list!');

    }


    // whotohelp
    else if (interaction.commandName === 'whotohelp') {
        if (!hasAdminPrivlages) {
            await interaction.reply('You do not have permission');

        }
        else {
            var whotohelp = supportList[guildID][0];
            if (whotohelp != null) {
                supportList[guildID] = supportList[guildID].splice(1, 1);
                await interaction.reply('Next in line: ' + whotohelp);
            }
            else {
                await interaction.reply('Nobody in line');

            }
        }
    }


    //flush list
    else if (interaction.commandName === 'flush') {
        if (!hasAdminPrivlages) {
            await interaction.reply('You do not have permission');

        }
        else {
            supportList[guildID] = [];
            await interaction.reply('List flushed');

        }
    }






});

client.login(TOKEN); // starts code