import { Client } from "discord.js";
import { CLIENT } from "./config/Config.js";
import { ValidateActivity } from "./methods/ValidateActivity.js";

const client: Client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_PRESENCES"
    ]
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    if(!oldPresence.activities.length && newPresence.activities.length || oldPresence.activities == null) {
        return ValidateActivity(newPresence.member, client, newPresence.activities[0].name);
    }

    if(oldPresence.activities.length && newPresence.activities.length) {
        if(oldPresence.activities[0].name != newPresence.activities[0].name) {
            return ValidateActivity(oldPresence.member, client, oldPresence.activities[0].name);
        }
    }
})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.login(CLIENT.TOKEN)
