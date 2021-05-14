const { removeArrayElement } = require("../util");

/* TODO add two different modes of lockdown: message and join
*  Message: no messaging or reacting (possibly auto-enabled by spam, will have to also ban offenders)
*  Join: no joining, anyone who attempts to join twice is banned (possibly auto-enabled by multiple joins within a given time, maybe revoking invites that these users joined with)
*/

module.exports = {
    name: "lockdown",
    description: "Denies permission to send messages and add reactions to anyone without a role.",
    usage: "lockdown",
    aliases: ["lock", "ld", "l"],
    execute: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission to perform this command.");

        var permissions = message.guild.roles.everyone.permissions.toArray();
        permissions = removeArrayElement(permissions, "SEND_MESSAGES");
        permisisons = removeArrayElement(permissions, "ADD_REACTIONS");
        message.guild.roles.everyone.setPermissions(permissions);
    
        message.channel.send("**:lock: This server is now in lockdown :lock:**")
    }
}