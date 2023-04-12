const { Interaction } = require("discord.js"),
Securd = require("../structures/Securd");

module.exports = {
    name: "interactionCreate",

    /**
     * @param {Securd} client
     * @param {Interaction} interaction
     */

    async run(client, interaction) {
        if(interaction.isCommand()){
            const command = client.commands.get(interaction.commandName);
            if(!command) return;
            command.run(client, interaction);
        }
    }
}