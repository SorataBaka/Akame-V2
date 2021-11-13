import { Message } from "discord.js"
import { generate } from "shortid"
import { ClientExtensionInterface } from "../../types"
module.exports = {
  name: "setreaction",
  description: "Sets a reaction message",
  usage: "set",
  args: "single",
  commandGroup: "Setups",
  commandGroupName: "setboost",
  async execute(message:Message, args:string, client:ClientExtensionInterface){
    const guildid = message.guild?.id
    const prefix = await client.ClientFunction.getprefix(client, message.guild?.id)
    if(!message.member?.permissions.has("MANAGE_GUILD")) return message.reply("You do not have the permission to use this command!")
    if(args.length ==0 ) return message.reply("Please provide a trigger word and a reaction message with the following format \n " + "`" + prefix + "setreaction {trigger word} | {trigger message} `")

    const reactionid:string = generate()
    const triggerMessage = args.split("|")[0] as string
    const reactionMessage = args.split("|")[1] as string
    if(!triggerMessage || !reactionMessage) return message.reply("There is not enough arguments to set a reaction message! Please follow the following format :\n " + "Please provide a trigger word and a reaction message with the following format \n " + "`" + prefix + "| {trigger word} | {trigger message} `")
    const reactionObject:Buffer = Buffer.from(JSON.stringify({
      triggerMessage, reactionMessage
    }))
    await client.ClientDatabase.messageReaction.findOneAndUpdate({
      guildid: guildid,
      reactionid: reactionid
    }, {
      guildid: guildid,
      reactionid: reactionid,
      trigger: triggerMessage,
      reaction: reactionMessage
    }, {
      upsert: true
    }).catch((err:void) => {
      console.log(err)
      return message.reply("There seems to be a problem saving this reaction message. Please try again or contact an administrator!")
    })
    await client.ClientDatabase.setAsync(`messagereaction:${guildid}:${reactionid}`, reactionObject).catch(async(err:Error | void) => {
      console.log(err)
      await client.ClientDatabase.messageReaction.findOneAndDelete({guildid: guildid, reactionid: reactionid}).catch()
      return message.reply("There seems to be a problem saving this reaction message. Please try again or contact an administrator!")
    })
    return message.reply(`I have set a new reaction message!`)
  }
}