# Labbot - a discord bot to help in lab and class environments

# Using labbot: 
Invite yourself here: https://discord.com/api/oauth2/authorize?client_id=890279092711219250&permissions=0&scope=bot%20applications.commands

# About
Labbot is an open-source discord bot that has been developed to assist in classes and labs on discord. Labbot is designed to be easy to use for students; labbot can use it over multiple discord servers. 

Labbot is primarily designed for the classroom environment; however, you can use it outside the learning environment. 

## How to use
Labbot needs to be invited to your discord by an admin, which can be invited [using this link]("https://discord.com/api/oauth2/authorize?client_id=890279092711219250&permissions=0&scope=bot%20applications.commands). Once accepted, labbot should be in your channel. To test, use the command `/status` where labbot should give a readout.


Lab bot is triggered with the command `/` icon.  If an incorrect command is entered, nothing is returned.

We recommended that Labbot is in its own channel in your server, where participants can mute; otherwise, your channels will get disorganised quickly.

## Available commands
The following commands are available to all users:
- `/getHelp`: This adds users to the queue. Users can only be on the list once

- `/nohelpneeded`: This is used for students to remove themselves from the list.

- `/labbotstatus`: This gets the status of the server - no response would suggest that the discord server has gone down  😞
- `/ping` : Pong

For users with an admin role,  they can: 
- `/whotohelp` : gets the name of the user who's next in the queue.
- `/howManyPeopleNeedHelp`: gets the number of people who are waiting in a queue
- `/flush` : Empties your server queue - should be used at the end of the lab!

An admin role can consist of people with the following roles: `Lab Demonstrator`,`lab demonstrator`, `staff`,`teaching-assistant`,`lecturers` and `admin`
It is strongly recommended as the course leader to set yourself **as the admin** and set only people you want to have full power to be able to asign themselves with their own role. These roles are **case sensitive!**.


## FAQ
#### Is labbot down?
To test this, type `/labbotstatus` into a channel. Labbot is hosted on digital ocean and should be up 99% of the time, however may go down for maintance. This should be outside class times (such as the weekend. Check osiansmith.com/labbot/ for scheduled downtime

####  What information is saved?
I am not saving any information. There are *some* print statements that ai can see in a command line; however, this is more for debugging. 

####  Does this offer any moderation facilities or swearing facilities?
No. If you want to use a bot for moderation, I recommend [Dyno.gg](https://dyno.gg).  

####  Is this free?
Yes and open-sourced!

#### What can I do with your code?
Look at the licence.txt 

#### What is Labbot.py?
Labbot was orignally made in python, however discord.py has depreciated the python version. 

#### I have a feature idea/found a bug!
Great - open a feature request on this GitHub!

#### Who made Labbot?
Osian Smith makes Labbot.


Labbot copyright Osian Smith 2021. All Rights Reserved.



