import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateLesson(
  category: string, 
  subcategory: string, 
  prompt: string
): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert educator. Create a comprehensive, educational lesson based on the user's request. 
          The lesson should be well-structured, informative, and engaging.
          Focus on the category: ${category} and subcategory: ${subcategory}.
          Provide clear explanations, examples, and practical insights.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content || "Sorry, I couldn't generate a lesson for this topic.";
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate lesson from AI');
  }
}
