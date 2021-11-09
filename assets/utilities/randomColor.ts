import fs from "fs"
import path from "path"
const staticPath = path.join(__dirname, "../JSON/colors.json")
export default () => {
  const colors = JSON.parse(fs.readFileSync(staticPath, "utf8"))
  const random = Math.floor(Math.random() * colors.length)
  return colors[random] as string
}