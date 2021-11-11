import { Message } from "discord.js"
import { ClientExtensionInterface } from "../../types"
module.exports = {
  name: "setboost",
  description: "Sets the boost role for the server.",
  usage: "setboost {role id}",
  args: "multiple",
  commandGroup: "Setups",
  commandGroupName: "setboost",
  async execute(message:Message, args:string[]|string, client:ClientExtensionInterface){
    if(!message.member?.permissions.has("MANAGE_GUILD")) return message.reply("You do not have the permission to use this command!")
    if(args.length == 0) return message.reply("Please provide the role id of your booster role!")
    const roleid:string = args[0]
    //Verify if the role exists in the guild
    if(!message.guild?.roles.cache.has(roleid)) return message.reply("The role you provided doesn't exist in the guild!")
    const roledata = message.guild.roles.cache.get(roleid)?.name

    const guilddata = client.ClientDatabase.guildData
    var mongooseWrite = await guilddata.findOneAndUpdate({
      guildID:message.guild.id,
    }, {
      roleid:roleid
    }, {
      upsert:true
    }).then((data:any, error:void) => {
      if(data) return true
    }).catch((err:void) => {
      console.error(err)
      return false
    })
    
    const redisclient = client.ClientDatabase.RedisClient
    const rediswrite = redisclient.set(`boostrole:${message.guild.id}`, roleid)

    if(mongooseWrite && rediswrite) {
      return message.reply(`I have set the booster role of this server to ` + "`" + roledata + "`!!!")
    }
  }
}