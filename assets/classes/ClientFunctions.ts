import generateColor from "../utilities/randomColor"
import { ClientFunctionInterface } from "../../types"
export default class ClientFunction implements ClientFunctionInterface{
  public generateColor:Function
  constructor(){
    this.generateColor = generateColor
    console.log("Client Functions loaded!")
  }
}