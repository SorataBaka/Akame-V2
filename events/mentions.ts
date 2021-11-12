import { ClientExtensionInterface } from "../types"
import { Message } from "discord.js"
module.exports = {
  name: "mentioned",
  eventName: "messageCreate",
  async execute(message:Message, client:ClientExtensionInterface){
    if(message.mentions.members?.has(client.user?.id as string)){
      client.ClientDatabase.RedisClient.get(`prefix:${message.guild?.id}`, (err: Error | null, reply: string | null) => {
        var prefix = client.PREFIX
        if(reply != null){
          prefix = reply
        }
        message.reply(`Hi! My prefix is ` + "`" + prefix + "`") 
      })
    }
  }
};