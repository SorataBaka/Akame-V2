import { ClientExtensionInterface } from "../types"
import { Message } from "discord.js"
module.exports = {
  name: "mentioned",
  eventName: "messageCreate",
  async execute(message:Message, client:ClientExtensionInterface){
    if(message.mentions.members?.has(client.user?.id as string)){
      message.reply(`Hi! My prefix is ` + "`" + client.PREFIX + "`")
    }
  }
};