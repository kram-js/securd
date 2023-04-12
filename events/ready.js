const Securd = require("../structures/Securd");

module.exports = {
    name: "ready",

    /**
     * @param {Securd} client
    */
    
    async run(client) {
        console.log(`Securd Bot is ready! Logged in as ${client.user.tag}!`)
        client.application.commands.set(client.commands.toJSON())
        process.env.COLOR = require("discord.js").resolveColor("Red");
        client.user.setStatus("dnd");
    }

}