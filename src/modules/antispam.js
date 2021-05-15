const miscUtil = require("../util/misc-util");

module.exports = {
    recentUserMessages: {},
    submitMessage: async (message) => {
        // Fast user message spam thing

        if (!module.exports.recentUserMessages[message.author.id]) module.exports.recentUserMessages[message.author.id] = [];
        module.exports.recentUserMessages[message.author.id].push(message.id);

        if (module.exports.recentUserMessages[message.author.id].length == Math.ceil(message.client.config.userMessageSpamThreshold / 2)) {
            message.reply("slow down your messages! You're pretty close to being banned for spam.");
        } else if (module.exports.recentUserMessages[message.author.id].length >= message.client.config.userMessageSpamThreshold) {
            message.guild.members.ban(message.author, {reason: `Sent ${module.exports.recentUserMessages[message.author.id].length} messages in ${message.client.config.userMessageSpamThresholdMilliseconds / 1000} seconds.`, days: 1}).then(banned => {
                message.channel.send(`**${banned.tag}** (${banned}) has been banned for spam.`);
            });
        }

        // Remove message after interval
        setTimeout(() => {
            miscUtil.removeArrayElement(module.exports.recentUserMessages[message.author.id], message.id);
        }, message.client.config.userMessageSpamThresholdMilliseconds);
    }
}