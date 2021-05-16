const miscUtil = require("../util/misc-util");

module.exports = {
    recentUserMessages: {},
    submitMessage: async (message) => {
        // Fast user message spam thing

        if (!module.exports.recentUserMessages[message.author.id]) module.exports.recentUserMessages[message.author.id] = [];
        module.exports.recentUserMessages[message.author.id].push(message);

        if (module.exports.recentUserMessages[message.author.id].length == Math.ceil(message.client.config.userMessageSpamThreshold / 2)) {
            message.reply("slow down your messages! You're pretty close to being banned for spam.");
        } else if (module.exports.recentUserMessages[message.author.id].length >= message.client.config.userMessageSpamThreshold) {
            message.guild.members.ban(message.author, { reason: `Sent ${module.exports.recentUserMessages[message.author.id].length} messages in ${message.client.config.userMessageSpamThresholdMilliseconds / 1000} seconds.`, days: 1 }).then(banned => {
                message.channel.send(`**${banned.tag}** (${banned}) has been banned for spam (sent ${module.exports.recentUserMessages[message.author.id].length} messages in ${message.client.config.userMessageSpamThresholdMilliseconds / 1000} seconds).`);
            });
        }

        // Anti mass-mention thing
        var totalMentions = 0;
        for (const m of module.exports.recentUserMessages[message.author.id]) {
            totalMentions += m.mentions.members.size;
        }

        if (totalMentions >= message.client.config.userMessageMentionSpamThreshold) {
            message.guild.members.ban(message.author, { reason: `Mentioned ${totalMentions} users in ${message.client.config.userMessageSpamThresholdMilliseconds / 1000} seconds.`, days: 1 }).then(banned => {
                message.channel.send(`**${banned.tag}** (${banned}) has been banned for spam (mentioned ${totalMentions} users in ${message.client.config.userMessageSpamThresholdMilliseconds / 1000} seconds).`);
            });
        }

        // Remove message from list after interval
        setTimeout(() => {
            miscUtil.removeArrayElement(module.exports.recentUserMessages[message.author.id], message);
        }, message.client.config.userMessageSpamThresholdMilliseconds);
    }
}