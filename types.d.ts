import { Message, Client, Collection, GuildMember } from 'discord.js';
export interface Command {
  name: string
  description: string
  usage: string
  args: "single" | "multiple"
  commandGroup: string
  commandGroupName: string
  execute(message: Message, args: string[]|string, client: Client): void
}
export interface Events {
  name: string
  eventName: string
  description: string
  execute:Function
}
export interface messageDeleteContent {
  content:string
  author:string
  member:GuildMember | null
  image?:string
}
export interface messageDeleteHeader {
  messageid:string
  data:messageDeleteContent
}
export interface ClientFunctionInterface {
  generateColor:Function
}
export interface ClientCollectionsInterface {
  deleteSnipes:Collection<string, messageDeleteHeader[]>
}
export interface ClientExtensionInterface extends Client{
  MessageCommands:Collection<string, Command>
  MessageCommandGroups:Collection<string, Collection<string, Command>>
  EventCollection:Collection<string, Events>
  PREFIX:string
  ClientFunction:ClientFunctionInterface
  ClientCollection:ClientCollectionsInterface
}