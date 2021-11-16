// import { Message, MessageEmbed } from 'discord.js';
// import { ClientExtensionInterface } from "../../types"
// module.exports = {
//   name: "claimrole",
//   description: "Claims a role",
//   usage: "claimrole " + "`{token}`" ,
//   args: "multiple",
//   commandGroup: "Booster",
//   commandGroupName: "claimrole",
//   async execute(message: Message, args: string[] | string, client: ClientExtensionInterface){
//     var boostroleid = await client.ClientDatabase.getAsync(`boostrole:${message.guild?.id}`)
//     if(!boostroleid){
//       const guildquery = await client.ClientDatabase.guildData.find({guildID: message.guild?.id})
//       if(guildquery.length == 0 || !guildquery[0].boosterRoleID) return message.reply("It seems like this server is not configured to handle custom boost roles yet. Please contact an admin and try again later!")
//       boostroleid = guildquery[0].boosterRoleID
//     }
//     if(!message.member?.roles.cache.has(boostroleid)) return message.reply("Hi! It seems like you are not a booster of this server. You're not allowed to use this command!")
    
//     if(args.length == 0) return message.reply("Please provide a token to use this command!")
//     const memberid:string = message.member?.id as string
//     const guildid:string = message.guild?.id as string
//     const token:string = args[0] as string
//     const query = await client.ClientDatabase.boostertoken.find({guildid: guildid, memberid: memberid})
//     if(query.length == 0 || query[0].memberid != memberid || query[0].token != token){
//       return message.reply("I'm sorry, it seems like your token is invalid or you are not a registered booster! Please contact an admin if you need help.")
//     }
//     const roleNameEmbed = new MessageEmbed()
//       .setAuthor(`-${client.user?.username}`, client.user?.avatarURL() as string)
//       .setTitle("Please provide a role name! This will be the name of the role you are creating.")
//       .setDescription("You won't be able to change this in the future so make sure you choose correctly!")
//       .setTimestamp()
//       .setFooter("Type `cancel` to abort role creation!")
//       .setColor(await client.ClientFunction.generateColor())
//     const roleColorEmbed = new MessageEmbed()
//       .setAuthor(`-${client.user?.username}`, client.user?.avatarURL() as string)
//       .setTitle("Please provide a role color! This will be the color of the role you are creating.")
//       .setDescription("You won't be able to change this in the future so make sure you choose correctly!")
//       .setTimestamp()
//       .setFooter("Type `cancel` to abort role creation!")
//       .setColor(await client.ClientFunction.generateColor())
//     const roleIconEmbed = new MessageEmbed()
//       .setAuthor(`-${client.user?.username}`, client.user?.avatarURL() as string)
//       .setTitle("Please provide a role icon! This will be the icon of the role you are creating.")
//       .setDescription("You won't be able to change this in the future so make sure you choose correctly!")
//       .addField("Disclaimer!", "Please only provide a url source or an image for the icon. If the format of the image is other than png or jpeg, it will not work!`")
//       .setTimestamp()
//       .setFooter("Type `cancel` to abort role creation!")
//       .setColor(await client.ClientFunction.generateColor())
//     const confirmationEmbed = new MessageEmbed()
//       .setAuthor(`-${client.user?.username}`, client.user?.avatarURL() as string)
//       .setTitle("Please confirm the role name, color, and icon below as you will not be able to change it later.")
//       .setDescription("Once you are sure, type `confirm` to finish role creation!")
//       .setTimestamp()
//       .setFooter("Type `cancel` to abort role creation!")
//       .setColor(await client.ClientFunction.generateColor())
//   }
// }