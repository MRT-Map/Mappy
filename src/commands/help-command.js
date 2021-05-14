const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "This",
    usage: "help",
    aliases: ["h"],
    execute: async (client, message, args) => {
        const help = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL())
            .setTitle("Help is here!")
            .setColor(message.member.displayHexColor);
        var description = "";
        client.commands.forEach(command => {
            description += `**${command.name}** - ${command.description}\n`;
        })
        help.setDescription(description);
        message.channel.send(help);
    }
}