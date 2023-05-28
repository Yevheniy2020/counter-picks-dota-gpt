import { Configuration, OpenAIApi } from "openai";

export class ChatGPT {

    configuration = new Configuration({
        organization: "org-I5Hxp6rpqfaIcNYTYUWOYtkn",
        apiKey: "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",
    });
    openai = new OpenAIApi(this.configuration)

    getAnswer = async (question) =>{
        const completion = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `Now you're a Dota 2 e-player, and you have to write counterpicks for ${question}`}],
        });
        return completion.data.choices[0].message.content;
    }
}
