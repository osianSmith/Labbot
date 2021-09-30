# Labbot - a discord bot to help in lab and class environments
**NB - Labbot is in BETA!** 
Labbot is an open-source discord bot that has been developed to assist in classes and labs on discord. Labbot is designed to be easy to use for students; labbot can use it over multiple discord servers. 

Labbot is primarily designed for the classroom environment; however, you can use it outside the learning environment. 

## How to use
Labbot needs to be invited to your discord by an admin, which can be invited [using this link]("https://discord.com/oauth2/authorize?client_id=890279092711219250&permissions=0&scope=bot"). Once accepted, labbot should be in your channel. To test, use the command `!status` where labbot should give a readout.


Lab bot is triggered with the command `!` icon.  If an incorrect command is entered, nothing is returned.

We recommended that Labbot is in its own channel in your server, where participants can mute; otherwise, your channels will get disorganised quickly.

##Available commands
The following commands are available to all users:
- `!getHelp` & `!gethelp`: This adds users to the queue. Users can only be on the list once

- `!nohelpneeded` & `!NoHelpNeeded`: This is used for students to remove themselves from the list.

- `!status`: This gets the status of the server - no response would suggest that the discord server has gone down  😞

For users with roll `Lab Demonstrator`,  they can:
- `!whotohelp` : gets the name of the user who's next in the queue.
- `!howManyPeopleNeedHelp`: gets the number of people who are waiting in a queue
- `!flush` : Empties your server queue - should be used at the end of the lab!

It is recommended as you **as the admin**  also change your role to be included in the `Lab Demonstrator` group. `Lab Demonstrator` role is **case sensitive!**.


## FAQ
####  What information is saved?
I am not saving any information. There are *some* print statements that ai can see in a command line; however, this is more for debugging. 

####  Does this offer any moderation facilities or swearing facilities?
No. If you want to use a bot for moderation, I recommend [Dyno.gg](https://dyno.gg).  

####  Is this free?
Yes

#### What can I do with your code?
Look at the licence.txt 

#### I have a feature idea/found a bug!
Great - open a feature request on this GitHub!

#### Who made Labbot?
Osian Smith makes Labbot.

Labbot copyright Osian Smith 2021. All Rights Reserved.



