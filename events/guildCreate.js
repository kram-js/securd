module.exports = {
    name: "guildCreate",

    async run(client, guild) {
        let embed = {
            title: `${guild.name}`,
            color: process.env.COLOR,
            description: ` \`${guild.name}\` just added me, I am now on ${client.guilds.cache.size} servers`,
            fields: [
                { name: 'ID', value: `${guild.id}` },
                { name: 'Members', value: `${guild.memberCount} | ${guild.members.cache.filter((m) => m.user.bot).size} bots`, inline: true },
                { name: 'Owner', value: `<@${guild.ownerId}> ( ${guild.ownerId})`, inline: true },],
            footer: { iconURL: client.user.avatarURL(), text: "Securd - Your Security, Our Priority" }
        }
        client.guilds.cache.get("1052973851757248574").channels.cache.get("1078648554173767741").send({ embeds: [embed] })
    }
}