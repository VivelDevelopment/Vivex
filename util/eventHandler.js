const reqEvent = (event) => require(`../events/${event}`)

module.exports = client => {
    client.on("ready", function () { reqEvent("ready")(client) });
}