import mongoose, { Model } from "mongoose"
import redis, { RedisClient } from "redis"
import { ClientDatabaseInterface } from "../../types";
import guildschema from "../schema/guildschema";
export default class DatabasesClass implements ClientDatabaseInterface {
  public guildData:Model<any> = guildschema
  public RedisClient:RedisClient
  constructor(URI:string, redisIP:string, redisPORT:string){
    mongoose.connect(URI)
    mongoose.connection.on("connecting", () => {
      console.log("Connecting to MongoDB Database")
    })
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB Database")
    })
    mongoose.connection.on("error", (err) => {
      console.error(err)
      throw err
    })
    this.RedisClient = redis.createClient({
      host: redisIP,
      port: parseInt(redisPORT)
    })
    this.RedisClient.on("ready", () => {
      console.log("Established Connection to Redis Database server")
    })
    this.RedisClient.on("connect", () => {
      console.log("Established stream to Redis Database server")
    })
    this.RedisClient.on("error", (err) => {
      console.error(err)
      throw err
    })
  }
}