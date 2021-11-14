import { MessageEmbed, Message, MessageActionRow, MessageButton } from "discord.js"
import { ClientExtensionInterface } from "../../types"
module.exports = {
  name: "listmessage",
  description: "Lists the custom reaction message in this server",
  usage: "listmessage",
  args: "single",
  commandGroup: "Setups",
  commandGroupName: "listmessage",
  async execute(message:Message, args:string, client:ClientExtensionInterface){
    const list = await client.ClientDatabase.messageReaction.find({guildid: message.guild?.id})
    const listEmbed = new MessageEmbed()
    for(const reactions of list){
      listEmbed.addField(reactions.trigger, reactions.reaction)
    }
    const actionRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('back')
          .setLabel("back")
          .setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId('forward')
          .setLabel("forward")
          .setStyle("PRIMARY")
      )
    const newMessage = await message.channel.send({
      embeds: [listEmbed],
      components: [actionRow]
    }) 
    const reaction = await newMessage.awaitMessageComponent({
      filter : (n) => message.member?.user.id == n.member.user.id,
      time: 30000,
      componentType: "ACTION_ROW"
    })
    var page = 1
    if(reaction.id == "back"){page--}
    if(reaction.id == "forward"){page++}





    const editMessage = async() => {
      const newEmbed = new MessageEmbed()
      
    }

  }
}