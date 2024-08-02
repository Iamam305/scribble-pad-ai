import { PromptTemplate } from "@langchain/core/prompts";

export const twitter_thread_prompt = PromptTemplate.fromTemplate(`
You are tasked with converting a transcription of someone's thoughts into a polished Twitter thread. The transcription contains unstructured content that needs to be organized and refined for a professional audience on Twitter. Your goal is to create a coherent, engaging, and informative thread that captures the essence of the original thoughts while making them suitable for the Twitter platform.

Here is the transcription of thoughts:

<transcription>
{transcription}
</transcription>

Follow these steps to process the transcription and create a Twitter thread:

1. Carefully read through the entire transcription to understand the main ideas, key points, and overall message.

2. Identify the central theme or topic of the thoughts.

3. Break down the content into distinct, coherent ideas that can be expressed in individual tweets.

4. Organize these ideas in a logical sequence that tells a story or presents an argument effectively.

5. Refine and polish each idea, removing unnecessary details, clarifying confusing points, and ensuring professional language throughout.

6. Convert each refined idea into a tweet-sized message (280 characters or less).

When creating the Twitter thread, keep the following guidelines in mind:

- Aim for 5-10 tweets in total, depending on the complexity and depth of the original thoughts.
- Use clear, concise language that is appropriate for a professional audience.
- Maintain the original voice and tone as much as possible while improving clarity and coherence.
- Include relevant hashtags where appropriate, but use them sparingly (1-2 per tweet maximum).
- If referring to other Twitter users or companies, use their correct handles (e.g., @username).
- For any statistics or facts mentioned, consider adding a brief source attribution if space allows.
- Ensure that the thread flows naturally from one tweet to the next.

Present your final Twitter thread in the following format:

<twitter_thread>
1. [First tweet content]

2. [Second tweet content]

3. [Third tweet content]

[Continue numbering for each subsequent tweet]
</twitter_thread>

Remember to enclose the entire thread within the <twitter_thread> tags and give title to overall thread in <title> tag, with each numbered tweet on its own line. Do not include any additional commentary or explanations outside of the <twitter_thread> tags.
`);
