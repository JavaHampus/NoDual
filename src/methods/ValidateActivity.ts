import { SERVER } from "../config/Config.js";
import { Client, GuildMember, MessageEmbed, TextChannel } from "discord.js"

/**
 * 
 * @param user The user whose activity is being validated
 * @param client The client of the application
 * @param n Name of new activity
 * @param o Name of old activity
 * @param safe Is old presence found?
 * @returns void, but will send an embed in logging channel if activity is suspect.
 */
export const ValidateActivity = (user: GuildMember, client: Client, o: string, n: string, safe: boolean): void => {
    if (user.presence.activities.length > 0) {
        const isServer = n === SERVER.PRESENCE_TITLE;
            
        if(isServer) {
            return;
        }

        if(o === n) {
            return; // No change
        }

        if(safe) {
            if(n.includes("RP" || "Roleplay")) {
                    const embed = new MessageEmbed()
                        .setTitle("Possible Dual Clanning!")
                        .setDescription(`${user.user.tag} has connected to a RP server that's not JRP.`)
                        .addField("User", user.user.tag)
                        .addField("Server Title", n)
                        .setThumbnail(user.user.displayAvatarURL())
                        .setColor("#944646");
            
                    const channel = client.channels.cache.get(SERVER.CHANNEL) as TextChannel;
                    channel.send({ embeds: [embed] });
                } 
            }                 
        } else {
            if(n.includes("RP")) {
                const embed = new MessageEmbed()
                .setTitle("Unchecked Dual Clanning!")
                .setDescription(`${user.user.tag} is playing something that includes "RP" but isn't JRP.`)
                .addField("User", user.user.tag)
                .addField("Activity Name", n)
                .setThumbnail(user.user.displayAvatarURL())
                .setColor("#ebc37a");

            const channel = client.channels.cache.get(SERVER.CHANNEL) as TextChannel;
            channel.send({ embeds: [embed] });
        }
    }
}