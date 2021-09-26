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

@client.command()
async def gethelp(message):
    await getHelp(message=message)

# Command
@client.command()
async def getHelp(message):
    print("adding new student to list")
    username =  str(message.author)#gets the author ID
    if username in supportList:
        await message.send("You are already in the queue - please wait!")
    else: 
        supportList.append(username)
        await message.send("You have been added to the list - you are number " + str(len(supportList)) )


client.run(TOKEN)




