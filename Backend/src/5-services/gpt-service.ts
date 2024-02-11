import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';

class GptService {
  private openai = new OpenAI({
    apiKey: process.env.CHAT_GPT_API_KEY,
  });

  public async askGpt(prompt: string) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    return response;
  }
}

const gptService = new GptService();
export default gptService;
