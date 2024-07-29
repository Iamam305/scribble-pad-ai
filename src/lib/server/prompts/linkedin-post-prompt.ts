import { PromptTemplate } from "@langchain/core/prompts";

export const linkedin_post_prompt = PromptTemplate.fromTemplate(`
You will be converting a transcription of someone's thoughts into a polished LinkedIn post. The transcription contains unstructured content that needs to be organized and refined for a professional audience on LinkedIn. Here is the transcription:

<transcription>
{transcription}
</transcription>

Your task is to transform this transcription into a well-structured, engaging LinkedIn post. Follow these steps:

1. Analyze the content:
   - Identify the main topic or message
   - Note key points, insights, or experiences mentioned
   - Recognize any professional achievements or learnings

2. Structure the post:
   - Begin with a compelling opening sentence or hook
   - Organize the main points in a logical flow
   - Conclude with a strong closing statement or call to action

3. Refine the language:
   - Convert casual speech to more formal, professional language
   - Remove filler words, repetitions, and irrelevant information
   - Ensure clarity and conciseness in expressing ideas

4. Add LinkedIn-specific elements:
   - Include relevant hashtags (2-3) related to the topic
   - Consider adding a brief, attention-grabbing headline
   - If applicable, mention connections or companies using the @ symbol

5. Format for readability:
   - Use short paragraphs (2-3 sentences each)
   - Incorporate bullet points or numbered lists if appropriate
   - Add line breaks between paragraphs for easy scanning

6. Maintain the original voice:
   - While polishing the content, preserve the speaker's unique perspective and tone
   - Keep any personal anecdotes or experiences that add authenticity

7. Optimize for engagement:
   - Frame the content to encourage comments and discussions
   - Consider ending with a question to prompt interaction

Write your LinkedIn post inside <linkedin_post> tags. Aim for a length of 150-250 words, which is optimal for LinkedIn engagement. Remember to maintain professionalism while capturing the essence of the original transcription.

`);
