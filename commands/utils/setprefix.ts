import { Message } from 'discord.js';
import {ClientExtensionInterface } from "../../types"
module.exports = {
  name: "setprefix",
  description: "Sets the prefix for the bot",
  usage: "setprefix {new prefix}",
  args: "multiple",
  commandGroup: "Utils",
  commandGroupName: "setprefix",
  async execute(message:Message, args:string[] | string, client:ClientExtensionInterface) {
    if(!message.member?.permissions.has("MANAGE_GUILD")) return message.reply("You do not have any permission to use this command!")
    if(args.length == 0) return message.reply("Please provide a new prefix to the bot!")
    client.PREFIX = args[0]
    if(client.PREFIX != args[0]) return message.reply("I have failed to set the prefix :(")
    return message.reply(`I have set the prefix to ` + "`" +args[0]+"`")
  }
}