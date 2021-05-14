// Import shit (smh why doesn't nodejs have import statements)
const Discord = require("discord.js");
const dotenv = require("dotenv").config();

// Setup Discord bot
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);