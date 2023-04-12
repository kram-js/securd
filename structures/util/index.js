const Discord = require("discord.js")
class Util {
    constructor(client) {
        this.client = client

        this.permissions = [
            "createRoles",
            "deleteRoles",
            "updateRoles",
            "addRoles",
            "removeRoles",
            "createChannels",
            "deleteChannels",
            "updateChannels",
            "createWebhooks",
            "deleteWebhooks",
            "updateWebhooks",
            "banMembers",
            "kickMembers",
            "addBot",
            "pings",
            "links",
        ]
        this.dangerousPerms = [
            "Administrator",
            "BanMembers",
            "KickMembers",
            "ManageRoles",
            "ManageChannels",
            "ManageWebhooks",
            "ManageMessages",
            "ManageNicknames",
        ]
    }
    getEmojiId(string) {
        let chars = string.split("");
        let emojiId = "";
        chars.forEach((c) => {
            if (!isNaN(c)) emojiId += c;
        })
        return emojiId;
    }
    memberManageable(member, target, ownerId) {
        if (member.user.id === ownerId) return true;
        if (member.roles.highest.position > target.roles.highest.position) return true;
        return false;
    }
    roleManageable(member, target, ownerId) {
        if (member.user.id === ownerId) return true;
        if (member.roles.highest.position > target.position) return true;
        return false;
    }
    embedPage(interaction, embeds, ephemeral = false) {
        return require("./embedPage")(interaction, embeds, ephemeral, this);
    }
    async loadTable(cache, data) {
        await this.client.database.models[data.model].sync({ alter: true });
        for (const element of (await this.client.database.models[data.model].findAll())) {
            if (data.model === "permission") cache[data.add](element.get("id").split("-")[0], element.get("id").split("-")[1], element.get("permissions"))
            else cache[data.add](element[data.key], element.get());
        }
    }
    /**
    * @param {Discord.GuildMember} executorMember
    */
    async punish(guild, executorMember, punish, reason, failLog, sucessLog) {
        let punished = false;
        if (punish === "ban") {
            guild.members.ban(executorMember.user.id, { reason }).then(() => {
                punished = true;
            }).catch((e) => { })
        } else if (punish === "kick") {
            guild.members.kick(executorMember.user.id, { reason }).then(() => {
                punished = true;
            }).catch((e) => { })
        } else if (punish === "derank") {
            executorMember.roles.set([], { reason }).then(() => {
                punished = true;
            }).catch((e) => { })
            if (executorMember.user.bot) {
                executorMember.roles.botRole?.setPermissions([], { reason })
            }
        }
        this.antiraidLog(guild, punished ? sucessLog : failLog);

    }

    antiraidLog(guild, content) {
        const guildManager = this.client.managers.guildManager.getOrCreate(guild.id);
        const config = guildManager.get("antiraid")?.log?.antiraid;
        if (!config) return;
        const channel = guild.channels.cache.get(config);
        let embed = {
            title: "Securd - AntiRaid Logs",
            description: content,
            color: process.env.COLOR
        }
        channel?.send({ embeds: [embed] })
    }

}

module.exports = Util;