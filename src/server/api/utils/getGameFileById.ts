import getConfig from "next/config"
import path from "path"
import fs from "fs/promises"

async function getGameFileById(gameId: number) {
    const { publicRuntimeConfig } = getConfig()
    const TASK_DIR = publicRuntimeConfig.taskDir
    const task = await fs.readFile(path.join(process.cwd(), TASK_DIR, `${gameId}.mdx`), {
        encoding: "utf-8"
    })
    return task
}
export default getGameFileById