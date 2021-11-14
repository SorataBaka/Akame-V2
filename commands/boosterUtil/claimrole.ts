import { Message } from 'discord.js';
import { ClientExtensionInterface } from "../../types"
module.exports = {
  name: "claimrole",
  description: "Claims a role",
  usage: "claimrole " + "`{token}`" ,
  args: "multiple",
  commandGroup: "Booster",
  commandGroupName: "claimrole",
  async execute(message: Message, args: string[] | string, client: ClientExtensionInterface){
    if(args.length == 0) return message.reply("Please provide a token to use this command!")
    const memberid:string = message.member?.id as string
    const guildid:string = message.guild?.id as string
    const token:string = args[0] as string
    const query = await client.ClientDatabase.boostertoken.find({guildid: guildid, memberid: memberid})
    if(query.length == 0 || query[0].memberid != memberid || query[0].token != token){
      return message.reply("I'm sorry, it seems like your token is invalid or you are not a registered booster! Please contact an admin if you need help.")
    }
    


  }
}