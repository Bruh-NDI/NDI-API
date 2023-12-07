import OpenAI from 'openai';
import {ChatCompletionMessageParam} from "openai/src/resources/chat/completions";

interface Message {
    role: string;
    content: string;
}

export async function SendRequest(fullHistory: Array<ChatCompletionMessageParam>, text: string) {
    const openai = new OpenAI({
        apiKey: process.env.CHATGPT
    });

    const prompt =
        "Tu es un chatbot sur un site qui parle d'écologie et de changement climatique. Tu dois répondre uniquement à des questions concernant le thème du site. Réponds 'Désolé, je ne peux pas répondre à cette question' si la question est hors sujet. Tu dois répondre de manière concise. Ne fais pas plus de 2 phrases.";

    if (fullHistory.length === 0)
        fullHistory.push({content: prompt, role: "system"})
    fullHistory.push({content: text, role: "user"})

    const response = await openai.chat.completions.create({
        messages: fullHistory,
        model: 'gpt-3.5-turbo',
    });


    // Ajouter la réponse générée à l'historique
    fullHistory.push({role: 'assistant', content: response.choices[0].message.content});

    return fullHistory;
}
