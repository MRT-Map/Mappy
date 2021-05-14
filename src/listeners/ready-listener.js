module.exports = (client) => {
    client.on("ready", () => {
        console.log(`Logged into Discord as ${client.user.tag}`);
    });
}