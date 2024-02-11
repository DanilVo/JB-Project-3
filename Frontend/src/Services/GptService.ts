import axios from 'axios';
import appConfig from '../Utils/AppConfig';

class GptService {
  public async gptAnswer(prompt: string): Promise<string> {
    const response = await axios.post(appConfig.askGpt, {prompt});
    const answer = response.data;
    return answer;
  }
}

const gptService = new GptService();

export default gptService;
