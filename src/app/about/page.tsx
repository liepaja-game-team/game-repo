import MainButton from "../_components/MainButton"
import Ul from "../_components/mdx/Ul"

function AboutPage() {
    return (
        <div className="flex flex-col">
            <h1 className="text-h1 text-4xl mb-4">Noteikumi</h1>
            <Ul>
                <li>Jums ir jāatbild uz 4 jautājumiem</li>
                <li>Uz katru jautājumu ir 1 pareiza atbilde</li>
                <li>Jauku spēlēšanos!</li>
            </Ul>
            <MainButton href="/game" >
                Sākt spēli
            </MainButton>
        </div>
    )
}
export default AboutPage