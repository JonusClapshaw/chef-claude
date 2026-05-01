import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

function getRuntimeAccessToken() {
    const savedToken = window.localStorage.getItem('hf_access_token')
    if (savedToken) {
        return savedToken
    }

    const enteredToken = window.prompt('Enter your Hugging Face access token (starts with hf_):')?.trim()
    if (!enteredToken) {
        throw new Error('A Hugging Face access token is required to generate recipes.')
    }

    window.localStorage.setItem('hf_access_token', enteredToken)
    return enteredToken
}

export async function getRecipeFromAI(ingredientsArr) {
    const huggingFaceAccessToken = getRuntimeAccessToken()
    const hf = new HfInference(huggingFaceAccessToken)

    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "deepseek-ai/DeepSeek-V4-Pro",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        const recipe = response.choices?.[0]?.message?.content?.trim()

        if (!recipe) {
            throw new Error("The AI response was empty.")
        }

        return recipe
    } catch (err) {
        throw new Error(err.message || "Unable to generate a recipe right now.", { cause: err })
    }
}
