import { Message } from 'discord.js';
import { Command, ClientExtensionInterface } from '../types';
module.exports = {
  name: "commandhandler",
  eventName: "messageCreate",
  async execute(message:Message, client:ClientExtensionInterface) {
    if (message.author.bot) return;
    if (message.content.indexOf(client.PREFIX) !== 0) return;

    let args:string[] | string = message.content.slice(client.PREFIX.length).trim().split(/ +/g);
    const commandName = args[0].toLowerCase();

    if(!client.MessageCommands.has(commandName)) return message.reply("I can't seem to find this command! Are you sure you typed it correctly?")
    args.shift();
    const command:Command = client.MessageCommands.get(commandName) as Command

    if(command.args == "single"){
      args = args.join(" ")
    }
    command.execute(message, args, client) 
  }
}