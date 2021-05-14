module.exports = {
    name: "ping",
    description: "Pretty obvious really",
    usage: "ping",
    aliases: ["p", "pong"],
    execute: async (client, message, args) => {
        const sentMessage = await message.channel.send("Pong!");
        const interval = sentMessage.createdTimestamp - message.createdTimestamp;
        sentMessage.edit(`Pong! \`${interval}ms\``);
    }
}