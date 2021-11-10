import Collection from "@discordjs/collection";
import { ClientCollectionsInterface, messageDeleteHeader, messageEditHeader } from "../../types";
export default class ClientCollection implements ClientCollectionsInterface {
  public deleteSnipes:Collection<string, messageDeleteHeader[]>
  public editSnipes:Collection<string, messageEditHeader[]>
  constructor(){
    this.deleteSnipes = new Collection()
    this.editSnipes = new Collection()
  }
} 