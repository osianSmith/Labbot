/**
 * Labbot main.py
 * Copyright Osian Smith 2021. All Right Reserved. 
 * MIT license - please read at https://github.com/osianSmith/Labbot
 */

// flag whether script is being debugged or not
const DEBUG = false;
const VERSION = "Labbot 1.0.1"

//Required - dotenv 
require('dotenv').config()
//gets hash
var CryptoJS = require("crypto-js");

//gets Enviromental Tokens
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD; //useful for debug 
const CLIENT_ID = process.env.CLIENT;

//Time to track crash
const START_UP_TIME = new Date().getTime();

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
    name: 'nohelpneeded',
    description: 'Removes you from the list'
}, {
    name: 'whotohelp',
    description: 'Who to help next! (teaching level only)'
}, {
    name: 'labbotstatus',
    description: "Gets the status of Labbot"
}, {
    name: 'howmanypeopleneedhelp',
    description: 'Returns lenght of queue for this server (teaching level only)'
},
{
    name: 'flush',
    description: 'Clears the queue (teaching level only)'
},
{
    name: 'howtouse',
    description: 'Gives a helpful guide to labbout'
}];

const rest = new REST({ version: '9' }).setToken(TOKEN);
// Starts program 
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        if (DEBUG) {
            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands },
          );
        } else {
       
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands },
        );
        }

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
// handles discord code
const { Client, Intents, Message, Guild } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

/**
 * Checks if the user has admin privlages
 * @param {The interaction recived from discord} interaction 
 * @returns true if user is detected with admin privlages, false otherwise
 */
function hasTeachingPrivlages(interaction) {
    const teachingPrilages = ["Lab Demonstrator", "lab demonstrator", "staff", "teaching-assistant", "lecturers", "admin", "Admin"]
    for (var i = 0; i < teachingPrilages.length; i++) {
        if (interaction.member.roles.cache.find(r => r.name === teachingPrilages[i])) {
            return true;
        }

    }
    return false; //if does not have any prilvages return false
}

/**
 * Handles interaction
 */
client.on('interactionCreate', async interaction => {
    //get guild ID
    var guild = CryptoJS.MD5(interaction.guild.id).toString();
    //get channel number
    var channelID = CryptoJS.MD5(interaction.channel.id).toString();
    
    var channelHash = CryptoJS.MD5(guild + channelID).toString();
    console.log("Hash details");
    
    //Gets how long server been on for
    var now = new Date().getTime(); //gets now
    const diff =   now - START_UP_TIME; //gets time different in seconds

    //divids diff by 1000 (microseconds), rounds it to 60 and then convernts it to minutes
    var aliveTime = Math.floor(( diff / 1000 % 60) / 60);

    // check to see if there has been a restart recently.
    var recentlyRestartMessage = "";
    if(aliveTime < 120){
        recentlyRestartMessage = ` Note: Labbot has recently been restarted ${aliveTime} minutes ago. Not all students may be in the list. Sorry!`;
    }


    //gets the guidID for the 2 d array (x axis)
    var guildID= GetGuildID(channelHash);
    console.log(guildID);
    //handle permission
    const hasAdminPrivlages = hasTeachingPrivlages(interaction);
    //debugging code
    console.log(" Debug = " + DEBUG + "Interaction detected. hasRole = " + hasAdminPrivlages + ". guildID = " + guildID + " interaction.commandName = " + interaction.commandName + " guildID; " + guildID);
    //gets username
    //Gets nickname OR Username. it will defalt to nickname first but if nil will return username
    const username = interaction.member.nickname || interaction.user.username;
    
    
    
    //handles interactions below 

    //if not a command don't do anything
    if (!interaction.isCommand()){ 
        return;
    }
    
    
    //test code
    if (interaction.commandName === 'ping') {

        await interaction.reply('Pong!');
    
    }
    
    else if (interaction.commandName === 'howtouse') {
        if (hasAdminPrivlages) {
            await interaction.reply('\`/gethelp\` to get help \n ' +
            '\`/nohelpneeded\` to remove yourself from the list \n' +
            '\`/status\` to gets server status \n' +
            '\`/ping \`pong \n' +
            '\`/whotohelp\` to get the indivudal who next to help (person is removed from list) \n' +
            '\`/flush flushes\` list');
        }
        else {
            await interaction.reply('\`/gethelp\` to get help \n ' +
            '\`/nohelpneeded\` to remove yourself from the list \n' +
            '\`/status\` to gets server status \n');
        }
    
    }

    else if (interaction.commandName === 'labbotstatus') {
        var alivemessage = "minutes"
        await interaction.reply('Labbot is currently alive and you are on channel # ' + guildID + "\n " +
            "Server  has been alive for " + aliveTime + " Minutes \n For more status reports, check out osiansmith.com/labbot \n You are on + " + VERSION  + ".");

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
        const id = supportList[guildID].indexOf(username);
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
                if (supportList[guildID.length > 1]){
                supportList[guildID].shift();
                }
                else {
                    supportList[guildID] = [];
                }
                await interaction.reply("Next in line: " + whotohelp + '!' + recentlyRestartMessage);
            }
            else {
                await interaction.reply('Nobody in line' + recentlyRestartMessage);

            }
        }
    }

    else if (interaction.commandName === 'howmanypeopleneedhelp') {
        if (!hasAdminPrivlages) {
            await interaction.reply('You do not have permission for this function');

        }
        else {
            await interaction.reply('Current waiting list length: ' + supportList[guildID].length) + recentlyRestartMessage;

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