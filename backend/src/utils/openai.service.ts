import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface LessonRequest {
  category: string;
  subcategory: string;
  prompt: string;
}

export interface LessonResponse {
  content: string;
  tokensUsed: number;
}

export class OpenAIService {
  static async generateLesson(request: LessonRequest): Promise<LessonResponse> {
    try {
      const systemPrompt = `You are an expert educator. Your role is to create comprehensive, engaging, and well-structured lessons based on the user's request. 

Guidelines:
- Provide clear, easy-to-understand explanations
- Use examples and analogies when helpful
- Structure your response with headings and bullet points for readability
- Make the content educational and informative
- Adapt the complexity to the topic and context

The user is learning about: ${request.category} → ${request.subcategory}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: request.prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      const content = completion.choices[0]?.message?.content || 'Sorry, I could not generate a lesson at this time.';
      const tokensUsed = completion.usage?.total_tokens || 0;

      return {
        content,
        tokensUsed
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate lesson. Please try again later.');
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 5,
      });
      
      return !!completion.choices[0]?.message?.content;
    } catch (error) {
      console.error('OpenAI connection test failed:', error);
      return false;
    }
  }
}
