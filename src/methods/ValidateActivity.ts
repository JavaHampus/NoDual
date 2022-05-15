import { SERVER } from "../config/Config.js";
import { Client, GuildMember, MessageEmbed, TextChannel } from "discord.js"

/**
 * 
 * @param user The user whose activity is being validated
 * @param client The client of the application
 * @param title Name of new activity
 * @returns void, but will send an embed in logging channel if activity is suspect.
 */
export const ValidateActivity = (user: GuildMember, client: Client, title: string): void => {
    if (user.presence.activities.length > 0) {
        if(title == SERVER.PRESENCE_TITLE) return;

        if(title.includes("RP" || "Roleplay")) {
                const embed = new MessageEmbed()
                .setTitle("Possible Dual Clanning!")
                .setDescription(`${user.user.tag} has connected to a RP server that's not ${SERVER.PRESENCE_TITLE}!`)
                .addField("User", user.user.tag)
                .addField("Server Title", title)
                .setThumbnail(user.user.displayAvatarURL())
                .setColor("#944646");
            
            const channel = client.channels.cache.get(SERVER.CHANNEL) as TextChannel;
            channel.send({ embeds: [embed] });
        } 
    }                 
}
