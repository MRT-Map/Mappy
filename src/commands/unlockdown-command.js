module.exports = {
    name: "unlockdown",
    description: "Restores permission to send messages and add reactions to anyone without a role.",
    usage: "unlockdown",
    aliases: ["unlock", "uld", "ul"],
    execute: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have permission to perform this command.");

        var permissions = message.guild.roles.everyone.permissions.toArray();
        if (!permissions.includes("SEND_MESSAGES")) permissions.push("SEND_MESSAGES");
        if (!permissions.includes("ADD_REACTIONS")) permissions.push("ADD_REACTIONS");
        message.guild.roles.everyone.setPermissions(permissions);
    
        message.channel.send("**:unlock: This server is now not in lockdown :unlock:**")
    }
}