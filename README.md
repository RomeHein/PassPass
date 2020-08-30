

# Bot Commands

tasks - Get your task list. From here you can trigger an alert to your helpers
settasks - Set your tasks
quit - Quit PassPass
qrcode - get your QRCode!
info - get an extract of your data stored in PassPass database
help- get all commands available

## Installation

- via Docker

- via Ansible
First, you'll need Ansible installed on your computer. Then clone this repo on your machine, and simply cd to the ansible directory of the project:
```cd /ansible```
Then all you have to do is run the following command in your terminal:
```ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook passpass.yml -i raspberrypi.local, --user=pi --ask-pass -e "telegramToken=AAA:yourtelegramtoken"```
This command will install all the necessary tools on your raspberry pi.