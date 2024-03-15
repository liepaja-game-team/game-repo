
export default function calcSessionTimeString(latest: Date, created: Date) {
    const timePlayed = latest.getTime() - created.getTime()
    const minutes = Math.floor(timePlayed / 1000 / 60)
    const seconds = Math.floor(timePlayed / 1000) - minutes * 60

    return `${minutes} minūtes un ${seconds} sekndes`
}