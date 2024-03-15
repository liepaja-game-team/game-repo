import MainButton from "../_components/MainButton"
import Ul from "../_components/mdx/Ul"

function AboutPage() {
    return (
        <div className="flex flex-col">
            <h1 className="text-h1 text-4xl mb-4">Noteikumi</h1>
            <Ul>
                <li>Jums ir jāizvēlas 1 no 4 torta gabaliņiem</li>
                <li>Katram gabaliņam ir viens jautājums</li>
                <li>Uz katru jautājumu ir tikai 1 pareiza atbilde</li>
                <li>Punktu skaits ir atkarīgs no atbildes ātruma.</li>
                <li>Jauku spēlēšanos!</li>
            </Ul>
            <MainButton href="/game" >
                Sākt spēli
            </MainButton>
        </div>
    )
}
export default AboutPage