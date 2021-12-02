import { Message, MessageEmbed, Role } from 'discord.js';
import { ClientExtensionInterface } from "../../types"
module.exports = {
  name: "listmember",
  description: "List every member of a role",
  usage: "listmember" ,
  args: "single",
  commandGroup: "Booster",
  commandGroupName: "listmember",
  async execute(message: Message, args: string[] | string, client: ClientExtensionInterface){
    var boostroleid = await client.ClientDatabase.getAsync(`boostrole:${message.guild?.id}`)
    if(!boostroleid){
      const guildquery = await client.ClientDatabase.guildData.find({guildID: message.guild?.id})
      if(guildquery.length == 0 || !guildquery[0].boosterRoleID) return message.reply("It seems like this server is not configured to handle custom boost roles yet. Please contact an admin and try again later!")
      boostroleid = guildquery[0].boosterRoleID
      await client.ClientDatabase.setAsync(`boostrole:${message.guild?.id}`, boostroleid)
    }
    if(!message.guild?.roles.cache.has(boostroleid)) return message.reply("It seems like the boost role in this server has been deleted. Please contact an admin.")
    // if(!message.member?.roles.cache.has(boostroleid)) return message.reply("Hi! It seems like you are not a booster of this server. You're not allowed to use this command!")
    const rolequery = await client.ClientDatabase.boosterroles.find({guildID: message.guild?.id, memberID: message.member?.id})
    if(rolequery.length == 0 ) return message.reply("It seems like you have not claimed your custom role yet. Please create one with the `claimrole` command!")
    const customroleid = rolequery[0].roleID
    const role:Role = await message.guild?.roles.cache.get(customroleid) as Role
    if(!role){
      await message.reply("It seems like your role doesn't exist in this server. Please contact an admin!")
      return client.ClientDatabase.boosterroles.findOneAndDelete({guildID: message.guild?.id, memberID: message.member?.id}).catch()
    }
    const roleMemberList = role.members
    const listEmbed:MessageEmbed = new MessageEmbed()
      .setTitle(`Member list of role ${role.name}`)
      .setDescription("The following are the list of members for your custom booster role.")
      .setTimestamp()
      .setColor(await client.ClientFunction.generateColor())
      .setFooter("love ya <3")
    const memberNameArray:string[] = []
    for(const member of roleMemberList){
      const memberName = member[1].user.username
      const memberNameString = "`" + memberName + "`"
      memberNameArray.push(memberNameString)
    }
    const memberNameString:string = memberNameArray.join(", ")
    listEmbed.addField('Members', memberNameString)
    return message.reply({
      embeds: [listEmbed]
    }).catch()
  }
}