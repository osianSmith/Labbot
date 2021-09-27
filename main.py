from discord import message
from discord.client import Client
from discord.ext import commands
import discord
import os
from dotenv import load_dotenv

load_dotenv()

print("alive")

#Loads in the enviroment
load_dotenv()
TOKEN = os.getenv("TOKEN")
GUILD = os.getenv("GUILD")


supportList = [] #list of usernames that have requested support


#command 

#Create bot
client = commands.Bot(command_prefix='!')

# Startup Information
@client.event
async def on_ready():
    print('Connected to bot: {}'.format(client.user.name))
    print('Bot ID: {}'.format(client.user.id))

# Command
@client.command()
async def status(message):
    await message.send('Lab Bot is currently alive - for more status reports, check out osiansmith.com/labbot')

#removes space problems
@client.command()
async def gethelp(message):
    await getHelp(message=message)

# Gets help - student can call this to request help
@client.command()
async def getHelp(message):
    print("adding new student to list")
    username =  str(message.author)#gets the author ID
    if username in supportList:
        await message.send("You are already in the queue - please wait!")
    else: 
        supportList.append(username)
        await message.send("You have been added to the list - you are number " + str(len(supportList)) )

@client.command()
async def noHelpNeeded(message):
    try:
        supportList.remove(str(message.author))
        await message.send("You are no longer on the list! To add yourself again use !getHelp")
    except ValueError:
        await message.send("You were not on the list")





#General Lab demonstrator commands
@client.command(pass_context=True)
@commands.has_role("Lab Demonstrator")
async def whoToHelp(mesage):
    personToHelp = supportList[0]
    await message.send("Person next on list is:" + personToHelp + ". They are now removed from list" )
    supportList.pop(0)

@client.command(pass_context=True)
@commands.has_role("Lab Demonstrator")
async def howManyPeopleNeedHelp(mesage):
    await message.send("Current waiting list length:" + str(len(supportList)))

#Adminy sort of stuff 
@client.command(pass_context=True)
@commands.has_role("Lab Demonstrator")
async def flush(message):
    await message.send("Flushing Queue")
    supportList = []
    await message.send("Success")

client.run(TOKEN)

