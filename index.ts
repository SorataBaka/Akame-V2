import { Client, Intents, Collection } from "discord.js"
import { config } from "dotenv"
import { Command, Events, ClientExtensionInterface, ClientFunctionInterface, ClientCollectionsInterface } from "./types"
import ClientFunction from "./assets/classes/ClientFunctions"
import ClientCollection from "./assets/classes/ClientCollections"
import fs from "fs"
config()

if(!process.env.TOKEN || !process.env.PREFIX) {
    console.error("Please set your token and prefix in .env")
    process.exit(1)
}

//Set bot intents
const intents:Intents = new Intents()
intents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES)

//Create new client
export default class ClientExtension extends Client implements ClientExtensionInterface{
  public MessageCommands:Collection<string, Command>
  public MessageCommandGroups:Collection<string, Collection<string, Command>>
  public EventCollection:Collection<string, Events>
  public ClientFunction:ClientFunctionInterface
  public ClientCollection:ClientCollectionsInterface
  public PREFIX = process.env.PREFIX as string
  public constructor(intents:Intents) {
      super({ intents: intents })
      this.MessageCommands = new Collection()
      this.MessageCommandGroups = new Collection()
      this.EventCollection = new Collection()
      this.ClientFunction = new ClientFunction()
      this.ClientCollection = new ClientCollection()
  }
}
const client:ClientExtension = new ClientExtension(intents)
//Read every command in every subfolder of commands directory
const commandFolderPath:string = __dirname + "/commands"
const eventFolderPath:string = __dirname + "/events"

const subCommandFolder:string[] = fs.readdirSync(commandFolderPath)
const subEventFolder:string[] = fs.readdirSync(eventFolderPath)

for(const subFolder of subCommandFolder){
  const commands:string[] = fs.readdirSync(`${commandFolderPath}/${subFolder}`)
  for(const commandFile of commands){
    const command:Command = require(`${commandFolderPath}/${subFolder}/${commandFile}`)
    if(client.MessageCommands.has(command.name)) throw "Duplicate Command Name detected. Aborting startup."
    client.MessageCommands.set(command.name, command)
    if(client.MessageCommandGroups.has(command.commandGroup)){
      client.MessageCommandGroups.get(command.commandGroup)?.set(command.name, command)
    } else {
      const newGroup:Collection<string, Command> = new Collection()
      newGroup.set(command.name, command)
      client.MessageCommandGroups.set(command.commandGroup, newGroup)
    }
  }
}
for(const eventFile of subEventFolder){
  const event:Events = require(`${eventFolderPath}/${eventFile}`)
  client.EventCollection.set(event.name, event)
  client.on(event.eventName, (...args:any) => event.execute(...args, client))
}

//Login the bot
const TOKEN = process.env.TOKEN as string
client.login(TOKEN)
export {
  client
}
process.on("SIGINT" || "SIGTERM", () => {
  console.log("Shutting down")
  client.destroy()
})