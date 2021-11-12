import { Message, Collection } from "discord.js"
import { ClientExtensionInterface, messageEditHeader } from "../types"
module.exports = {
  name: "edithandler",
  eventName: "messageUpdate",
  async execute(oldMessage:Message, newMessage:Message,  client:ClientExtensionInterface){
    const channelid = oldMessage.channel.id
    const author = oldMessage.author.tag
    const member = oldMessage.member
    const oldMessageContent = oldMessage.content
    const newMessageContent = newMessage.content
    const editedMessageObject:messageEditHeader = {
      messageid: oldMessage.id,
      data: {
        messageAuthor: author,
        oldMessageContent: oldMessageContent,
        newMessageContent: newMessageContent,
        oldMessage,
        newMessage,
        member
      }
    }
    const editSnipe = client.ClientCollection.editSnipes as Collection<string, messageEditHeader[]>
    if(!editSnipe.has(channelid)) client.ClientCollection.editSnipes.set(channelid, [])
    const channelEditData = editSnipe.get(channelid) as messageEditHeader[]
    channelEditData.unshift(editedMessageObject)
    setTimeout(async () => {
      for(var i = 0; i < channelEditData.length; i++ ){
        if(channelEditData[i].messageid == oldMessage.id){
          channelEditData.splice(i, 1)
        }
      }
    }, 30000)
  }
}