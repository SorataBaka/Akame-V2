import { ClientExtensionInterface } from "../types"
module.exports = {
  name: "ready",
  eventName: "ready",
  async execute(client:ClientExtensionInterface){
    const { user, guilds, users } = client;
    const guildCount = guilds.cache.size;
    const userCount  = users.cache.size;
    const commandTotal = client.MessageCommands.size;
    const commandGroupTotal = client.MessageCommandGroups.size;
    console.log(`${commandTotal} commands loaded!`);  
    console.log(`${commandGroupTotal} command groups loaded!`);
    console.log(`${user?.tag} is ready! Serving ${guildCount} servers for ${userCount} members!`);
    //Set bot presence and status
    user?.setActivity(`${guildCount} servers | ${userCount} members`, { type: "WATCHING" });
    user?.setStatus("dnd");
    user?.setPresence({
      activities: [
        {
          name: `${guildCount} servers | ${userCount} members`,
          type: "WATCHING"
        }
      ]
    })
  }
};