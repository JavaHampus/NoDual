import { Client } from "discord.js";
import { CLIENT } from "./config/Config.js";
import { ValidateActivity } from "./methods/ValidateActivity.js";
const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_PRESENCES"
    ]
});
client.on('presenceUpdate', (oldPresence, newPresence) => {
    const user = newPresence.member;
    if (user.presence.activities.length > 0) {
        const newActivity = newPresence.activities[0].name;
        if (oldPresence.activities.length > 0) {
            const oldActivity = oldPresence.activities[0].name;
            ValidateActivity(user, client, oldActivity, newActivity, true);
        }
        else {
            ValidateActivity(user, client, "", newActivity, false);
        }
    }
});
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(CLIENT.TOKEN);
