/**
 * Labbot main.py
 * Copyright Osian Smith 2021. All Right Reserved. 
 * MIT license - please read at https://github.com/osianSmith/Labbot
 */


//Required - dotenv 
require('dotenv').config()
//gets Enviromental Tokens
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD;
const CLIENT_ID = process.env.CLIENT;

//Time to track crash
const START_UP_TIME = Date.now()

console.log("Script passed JS init - Starting up and connecting to a bot")


const { REST } = require('@discordjs/rest');
const { Routes, GuildDefaultMessageNotifications } = require('discord-api-types/v9');

/**
 * Announces commands for discord 
 */
const commands = [{
    name: 'ping',
    description: 'Replies with Pong!'
}, {
    name: 'gethelp',
    description: 'Request help!'
}, {
    name: 'whotohelp',
    description: 'Who to help next! (teaching level only)'
},{
    name: 'labbotstatus',
    description: "Gets the status of Labbot"
}, {
    name: 'howmanypeopleneedhelp',
    description : 'returns lenght of queue for this server'
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

//Queue variables
var guildList = [];
var supportList = []

/**
 * Returns the internal working number for guilds.
 * @param {the GuildID published by Discord} guildID 
 * @returns int of internal refrence for guild
 */
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

/**
 * Handles interaction
 */
client.on('interactionCreate', async interaction => {
    //gets the guidID for the 2 d array (x axis)
    var guildID = GetGuildID(interaction.guild.id);  

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
    else if (interaction.commandName === 'labbotstatus') {
        const aliveTime = Math.floor((Date.now() - START_UP_TIME)/1000);
        await interaction.reply('Labbot BETA is currently alive and you are on server # ' + guildID + "\n " +
        "Server  has been alive for " +aliveTime+ " Seconds \n  for more status reports, check out osiansmith.com/labbot");

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
            await interaction.reply('You do not have permission for this function');

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

    else if (interaction.commandName === 'howmanypeopleneedhelp') {
        if (!hasAdminPrivlages) {
            await interaction.reply('You do not have permission for this function');

        }
        else {
            await interaction.reply('Current waiting list length: ' + supportList[guildID].length);

        }
    }


    //flush list
    else if (interaction.commandName === 'flush') {
        if (!hasAdminPrivlages) {
            await interaction.reply('You do not have permission for this function');

        }
        else {
            supportList[guildID] = [];
            await interaction.reply('List flushed');

        }
    }






});

client.login(TOKEN); // starts code