
<div>
    <img src="storage/images/logo-large.png" width="400">
</div>

## What Do I do?

I'm a Telegram/Messenger Bot to assist PRM (Person with Reduced Mobility) in finding help in their neighborhood.

## How do I work?

Simple: You talk to [me](https://t.me/PassPassBot).

1- I'll give you a QRCode to print (or I can send it to you) and to stick on somewhere visible by your neighborhood.

2- Someone scan your QRCode.

3- When you ask for help, I'll notify everyone who has scanned your QRCode that you need asistance.

At the moment you can choose between 4 different types of help:
- Open a door
- Grab an object
- Make a course
- Be present in case of an emergency before specialists come.

It's simple, no one is forced to anything. If an Helper wants to stop helping, he just tells me "/quit", and I'll notify you that "someone" has left you.

## Bot Commands

At the moment I'm only available on [Telegram](https://telegram.org/)

Telegram commands:

tasks - Get your task list. From here you can trigger an alert to your helpers

settasks - Set your tasks

quit - Quit PassPass

qrcode - get your QRCode!

info - get an extract of your data stored in PassPass database

help- get all commands available

Messenger commands:

In progress...

## Installation

I'm already available on Telegram [here](https://t.me/PassPassBot), but you might want to run your own instance of PassPass.

- via Docker-compose
You'll need two containers. One running the node.js script, and another one running the postgreSQL database.
All this can be done at once by running the docker-compose.yml file given as an exemple. I strongly recommand you changing parameters (for instance the bot token).
Run the docker-compose file with the command:

```docker-compose up -d```

- via Ansible
First, you'll need Ansible installed on your computer. Then clone this repo on your machine, and simply cd to the ansible directory of the project:

```cd /ansible```

Then all you have to do is run the following command in your terminal:

```ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook passpass.yml -i raspberrypi.local, --user=pi --ask-pass -e "telegram_token=AAA:yourtelegramtoken"```

This command will install all the necessary tools on your raspberry pi.