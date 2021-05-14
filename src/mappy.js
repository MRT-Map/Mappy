// Import shit (smh why doesn't nodejs have import statements)
const Discord = require("discord.js");
const dotenv = require("dotenv").config();
const fs = require("fs");

// Setup Discord bot
console.log("Setting up Discord stuff");
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

// Import configuration
client.config = JSON.parse(fs.readFileSync("config/config.json"));

// Register listeners
console.log("Registering listeners");
const listenerFiles = fs.readdirSync("src/listeners");
listenerFiles.forEach(f => {
    const listener = require(`./listeners/${f}`);
    listener(client);
});

// Register commands
console.log("Registering commands");
client.commands = [];
const commandFiles = fs.readdirSync("src/commands")
commandFiles.forEach(f => {
    const command = require(`./commands/${f}`);
    client.commands.push(command);
})