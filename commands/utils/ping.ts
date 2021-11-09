import { Message } from 'discord.js';
import {ClientExtensionInterface } from "../../types"
module.exports = {
  name: "ping",
  description: "Ping!",
  usage: "ping",
  args: "multiple",
  commandGroup: "Utils",
  commandGroupName: "ping",
  async execute(message:Message, args:string[] | string, client:ClientExtensionInterface) {
    return message.reply("Pong!");
  },
}