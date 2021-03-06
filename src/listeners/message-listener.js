const antispam = require("../modules/antispam");

module.exports = (client) => {
    client.on("message", message => {
        if (message.author == client.user) return;
        // Command handling
        if (message.content.startsWith(client.config.commandPrefix)) {
            let args = message.content.substring(client.config.commandPrefix.length).split(" ");
            client.commands.forEach(c => {
                if (c.name == args[0] || c.aliases.includes(args[0])) {
                    c.execute(client, message, args);
                }
            })
        }

        // Antispam shit
        antispam.submitMessage(message);
    });
}