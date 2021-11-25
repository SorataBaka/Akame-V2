import { GuildMember, MessageEmbed } from 'discord.js';
import { ClientExtensionInterface } from '../types';
import { generate } from "shortid"
module.exports = {
  name: "boostdetector",
  eventName: "guildMemberUpdate",
  async execute(oldMember:GuildMember, newMember:GuildMember, client:ClientExtensionInterface) {
    const prefix = await client.ClientFunction.getprefix(client, oldMember.guild.id) || client.PREFIX
    var boostroleid:string = await client.ClientDatabase.getAsync(`boostrole:${oldMember.guild.id}`)
    if(!boostroleid){
      const query = await client.ClientDatabase.guildData.find({guildID: oldMember.guild.id})
      if(query.length == 0 || !query[0].boosterRoleID) return
      boostroleid = query[0].boosterRoleID
      await client.ClientDatabase.setAsync(`boostrole:${oldMember.guild.id}`, query[0].boosterRoleID).catch()
    }
    if(!oldMember.roles.cache.has(boostroleid) && newMember.roles.cache.has(boostroleid)){
      const token:string = generate()
      const memberid:string = oldMember.id
      const guildid:string = oldMember.guild.id
      const write = await client.ClientDatabase.boostertoken.findOneAndUpdate({
        guildid: guildid,
        memberid: memberid
      }, {
        guildid: guildid,
        memberid: memberid,
        token: token
      }, {
        upsert: true
      }).catch((err:void) => {
        return oldMember.send("Hi! this is the automated custom role system. Unfortunately, we are experiencing issues with the system. To claim your free role, please dm one of the staffs to claim it!")
      })
      if(write){
        const tokenEmbed = new MessageEmbed()
          .setThumbnail(client.user?.avatarURL() as string)
          .setAuthor(`Thank you so much for boosting the server ${oldMember.user.username}!!!`)
          .setTitle('You will be eligible to claim a free custom role from your boost!')
          .setDescription(`To claim your free role, please enter the claim role command i have provided in the server you boosted. `)
          .addField("Your token is : ", "`" + `*${token}*`+ "`")
          .addField("Claim Role Command : ", "`" + `${prefix} claimrole ${token}` + "`")
          .setTimestamp()
          .setColor(await client.ClientFunction.generateColor())
          .setFooter("Please contact an admin for futher details!")
        return oldMember.send({
          embeds: [tokenEmbed]
        }).catch()
      }
    }
  }
}