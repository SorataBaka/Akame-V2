import { Message } from 'discord.js';
import { ClientExtensionInterface, messageDeleteHeader } from '../types';
module.exports = {
  name: "snipehandler",
  eventName: "messageDelete",
  async execute(message:Message, client:ClientExtensionInterface) {
    const snipeCollection = client.ClientCollection.deleteSnipes
    const channelid = message.channel.id
    if(!snipeCollection.has(channelid)) snipeCollection.set(channelid, [])
    const channelData = snipeCollection.get(channelid) as messageDeleteHeader[]
    const deletedMessageData:messageDeleteHeader = {
      messageid: message.id,
      data: {
        content: message.content,
        author: message.author.tag,
        member: message.member,
        image: message.attachments.first()?.proxyURL
      }
    }
    channelData?.unshift(deletedMessageData)
    setTimeout(async () => {
      for(var i = 0; i < channelData.length; i++){
        if(channelData[i].messageid == message.id){
          channelData.splice(i, 1)
        }
      }
    }, 10000)
  }
}