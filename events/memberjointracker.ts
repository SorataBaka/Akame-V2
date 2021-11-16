import { ClientExtensionInterface } from "../types"
import { GuildMember, TextChannel } from "discord.js"
module.exports = {
  name: "memberJoin",
  eventName: "guildMemberAdd",
  async execute(member:GuildMember, client:ClientExtensionInterface){
    var logchannel = await client.ClientDatabase.getAsync(`logchannel:${member.guild.id}`)
    if(!logchannel){
      const query = await client.ClientDatabase.guildData.find({guildID: member.guild.id})
      if(query.length == 0 || !query[0].logChannelID) return
      logchannel = query[0].logChannelID
    }
    if(!logchannel) return console.log("Channel not found")
    const membertag:string = member.user.tag
    const memberusername:string = member.user.username
    const memberregister:string = member.user.createdAt?.toLocaleString("id-ID", {timeZone: "Asia/Jakarta"}) as string
    const memberjoin:string = member.joinedAt?.toLocaleString("id-ID", {timeZone: "Asia/Jakarta"}) as string
    // const embed = new MessageEmbed()
    //   .addField("User Tag:", membertag)
    //   .addField("Username: ", memberusername)
    //   .addField("Registered At: ", memberregister)
    //   .addField("Member Joined: ", memberjoin)
    //   .setTimestamp()
    //   .setColor(await client.ClientFunction.generateColor())
    // return (member.guild.channels.cache.get(logchannel) as TextChannel).send({
    //   embeds: [embed]
    // }).catch((err) => console.log(err))
    return (member.guild.channels.cache.get(logchannel) as TextChannel)?.send(`| ${membertag} | ${memberusername} | Registered : ` + "`" + `${memberregister} ` + "`" + ` | Joined: ` + "`" + `${memberjoin}` + "`" + ` | ID: ` + "`" + `${member.id}` + "`" + ` `).catch()
  }
};