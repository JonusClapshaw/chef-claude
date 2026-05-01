import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    return (
        <section className="recipe-markdown">
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}