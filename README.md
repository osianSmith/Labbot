# Labbot - a discord bot to help in lab and class enviroments
**NB - Labbot is in BETA!** 
Labbot is a open source discord bot that has been developed to assist in classes and labs on discord. Designed to be easy to use for students, it can be used over mutiple discord servers. 

Labbot is primary desgined for the classroom enviroment, however you are allowed to use it outside the learning enviroment. 

##How to use
Labbot simply needs to be invived to your discord by a admin, which can be invited [using this link]("https://discord.com/oauth2/authorize?client_id=890279092711219250&permissions=0&scope=bot"). Once accepted, labbot should be in your channel. To test use command `!status` where labbot should give a readout.


Lab bot is called up with command `!` icon.  If a incorrect command is entered, nothing is returned.

It is reccomended that Labbot is in its own channel in your server, where participants can mute, otherwise your channels will get disorganised quickly.

##Available commands
The following commands are avaialbe to all users:
- `!getHelp` & `!gethelp`: This adds users to the queue. Users can only be on the list once

- `!nohelpneeded` & `!NoHelpNeeded`: This is used for students to remove themselves from the list.

- `!status`: This gets the status of the server - no respose would suggest that the discord server has gone down  😞

For users with roll `Lab Demonstrator`,  they can:
- `!whotohelp` : gets the name of the user who's next in the queue.
- `!howManyPeopleNeedHelp`: gets the amount of people who are waiting in a queue
- `!flush` : Empties your server queue - should be used at the end of the lab!

It is recommended as you **as the admin**  also change your role to be included in the `Lab Demonstrator` group. `Lab Demonstrator` role is **case senstive!**.


##FAQ
####What information is saved?
I am not saving any infomation. There are *some* print statments that ai can see in a command line, however this is more for debugging. 

####Does this offer any moderation facilities or swearing facilities?
No. If you want to use a bot for moderation, I would recommend [Dyno.gg](https://dyno.gg).  

####Is this free?
Yes

####What can I do with your code?
Look at the licence.txt 

####I have a feature idea/found a bug!
Great - open a feature request on this github!

####Who made Labbot?
Labbot is made by Osian Smith.

Labbot copyright Osian Smith 2021 All Rights Resrved.



