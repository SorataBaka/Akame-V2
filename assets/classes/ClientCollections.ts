import Collection from "@discordjs/collection";
import { ClientCollectionsInterface, messageDeleteHeader } from "../../types";
export default class ClientCollection implements ClientCollectionsInterface {
  public deleteSnipes:Collection<string, messageDeleteHeader[]>
  constructor(){
    this.deleteSnipes = new Collection()
  }
}