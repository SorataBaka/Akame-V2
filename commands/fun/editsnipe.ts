import { Message, MessageEmbed } from 'discord.js';
import {ClientExtensionInterface, messageEditContent, messageEditHeader } from "../../types"
module.exports = {
  name: "esnipe",
  description: "Snipes an edited message!",
  usage: "esnipe {number}",
  args: "multiple",
  commandGroup: "Fun",
  commandGroupName: "esnipe",
  async execute(message:Message,args:string[]|string,client:ClientExtensionInterface){
    const channelid:string = message.channel.id
    if(!client.ClientCollection.editSnipes.has(channelid)) return message.reply("There is nothing to snipe!")
    var snipeIndex:number = 0
    if(args.length != 0 && !isNaN(parseInt(args[0]) - 1) && parseInt(args[0]) > 0){
      snipeIndex = parseInt(args[0]) - 1
    }
    const snipeDataArray = client.ClientCollection.editSnipes.get(channelid) as messageEditHeader[]
    if(snipeDataArray.length == 0) return message.reply("There is nothing to snipe!")
    if(snipeDataArray[snipeIndex] === undefined) return message.reply("There is nothing to snipe!")
    const snipeData:messageEditContent = snipeDataArray[snipeIndex].data
    const snipeEmbed = new MessageEmbed()
      .setTitle('Snipe!')
      .setAuthor(snipeData.messageAuthor, snipeData.member?.user.displayAvatarURL())
      .addField("Before: ", snipeData.oldMessageContent)
      .addField("After: ", snipeData.newMessageContent)
      .setFooter('Bang!')
      .setColor(client.ClientFunction.generateColor())
      .setTimestamp()
    return message.channel.send({
      embeds: [snipeEmbed]
    }).catch()
  }
}