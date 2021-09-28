from discord import message
from discord.client import Client
from discord.ext import commands
import discord
import os
from discord.utils import get
from dotenv import load_dotenv
import time


load_dotenv() #loads enviroment 

print("Script passed Python init... Starting up and connecting to bot")

startUpTime = time.time()

#Loads in the enviroment
load_dotenv()
TOKEN = os.getenv("TOKEN")
GUILD = os.getenv("GUILD")


supportList = [] #An array of an array that contains strings of memebers who need support. NB this would mean that it is likely to break if users were to change nick names during the session, but this is such a edge case its not worth my headache

knownServerList = [] #this is a array of server lists
#the original method was to have a array of X amount of discord servers and fill in when needed. This would have been fine in Swift but would have been too resource heavy for this bot

#command 

#Create bot
client = commands.Bot(command_prefix='!')

# Startup Information
@client.event
async def on_ready():
    print("Script able to connect to a bot!")
    print('Connected to bot: {}'.format(client.user.name))
    print('Bot ID: {}'.format(client.user.id))


#This function checks to make sure a "server" exists in the array - if it does nothing takes place, if it isnt, a object is apended to the array.
def ensureSeverExists(message):
    serverID = message.message.guild.id
    if serverID > len(knownServerList):
        supportList.append([])
        print("server did not exist - made a new one")

    else:
        print("server existed already")

#gets server id  and creates a new server if needed
def getChannelID(message):
    ensureSeverExists(message)
    serverID = str(message.message.guild.id)
    print(serverID)
    if serverID in knownServerList:
        result =  knownServerList.index(serverID)
    else:
        knownServerList.append(serverID)
        result =  knownServerList.index(serverID)
    print("Result = " + str(result))
    return result
#gets server status 


@client.command()
async def status(message):
    ensureSeverExists(message)
    aliveTime = (time.time() - startUpTime)
    await message.send('Lab Bot is currently alive and you are on server # ' + str(getChannelID(message)) + "\n " +
    "Server  has been alive for " + str(aliveTime) + " seconds\n" + 
     " for more status reports, check out osiansmith.com/labbot")

#removes space problems
@client.command()
async def gethelp(message):
    await getHelp(message=message)

# Gets help - student can call this to request help
@client.command()
async def getHelp(message):
    ensureSeverExists(message)
    print("adding new student to list")
    username =  str(message.author)#gets the author ID
    chanID = getChannelID(message)
    print("getChannelID = " + str(chanID) + " type = " + str(type(chanID)))
    if username in supportList[chanID]: 
        await message.send("You are already in the queue - please wait!")
    else: 
        supportList[chanID].append(username)
        await message.send("You have been added to the list - you are number " + str(len(supportList[chanID])) )


#No help is needed any more
client.command()
async def nohelpneeded(message):
    noHelpNeeded(message)

client.command()
async def NoHelpNeeded(message):
    noHelpNeeded(message)

@client.command()
async def noHelpNeeded(message):
    chanID = getChannelID(message)
    try:
        supportList[chanID].remove(str(message.author))
        await message.send("You are no longer on the list! To add yourself again use !getHelp")
    except ValueError:
        await message.send("You were not on the list")





#General Lab demonstrator commands
@client.command(pass_context=True)
@commands.has_role("Lab Demonstrator")
async def whoToHelp(mesage):
    chanID = getChannelID(message)
    personToHelp = supportList[chanID][0]
    await message.send("Person next on list is:" + personToHelp + ". They are now removed from list" )
    supportList[getChannelID].pop(0)

@client.command(pass_context=True)
@commands.has_role("Lab Demonstrator")
async def howManyPeopleNeedHelp(mesage):
    await message.send("Current waiting list length:" + str(len(supportList[getChannelID])))

#Adminy sort of stuff 
@client.command(pass_context=True)
@commands.has_role("Lab Demonstrator")
async def flush(message):
    chanID = getChannelID(message)
    await message.send("Flushing Queue")
    supportList[message] = []
    await message.send("Success")

client.run(TOKEN)
