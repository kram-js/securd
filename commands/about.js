const { CommandInteraction } = require('discord.js'),
    Securd = require('../structures/Securd');

module.exports = {
    name: "about",
    description: "About the bot",

    /**
     * @param {Securd} client
     * @param {CommandInteraction} interaction
     */

    async run(client, interaction) {
        const djs = require("discord.js").version;
        const node = process.version;
        let embed = {
            title: "About Securd",
            fields: [
                { name: `${client.botemojis.owner} Owners`, value: `<@1036089162945789963> & <@1039960600643645490>`, inline: true },
                { name: `${client.botemojis.djs} Discord.js`, value: `\`${djs}\``, inline: true },
                { name: `${client.botemojis.node} Node.js`, value: `\`${node}\``, inline: true },
                { name: `${client.botemojis.stats} Servers`, value: `\`${client.guilds.cache.size}\``, inline: true },
                { name: `${client.botemojis.user} Users`, value: `\`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\``, inline: true },
                { name: `${client.botemojis.ping} Ping`, value: `\`${client.ws.ping}ms\``, inline: true },
                { name: `${client.botemojis.support} Support`, value: `[Click here](https://discord.gg/securd)`, inline: true },
            ],
            color: process.env.COLOR,
            url: "https://discord.gg/securd",
            image: {
                url: "https://media.discordapp.net/attachments/1070003848103612556/1080191951124570212/image_2023-01-26_205852116.jpg"
            },
            footer: { iconURL: client.user.avatarURL(), text: "Securd - Your Security, Our Priority" }
        }
        interaction.reply({ embeds: [embed], content: "https://discord.gg/securd", ephemeral: true })

    }
}