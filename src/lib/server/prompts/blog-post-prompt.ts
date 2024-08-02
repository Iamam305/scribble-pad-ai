import { PromptTemplate } from "@langchain/core/prompts";

export const blog_post_prompt = PromptTemplate.fromTemplate(`
You are tasked with converting a transcription of someone's thoughts into a polished blog post. The transcription contains unstructured content that needs to be organized and refined. Your goal is to create a well-structured, engaging blog post along with appropriate meta tags.

Here is the transcription:
<transcription>
{transcription}
</transcription>

Follow these steps to complete the task:

1. Analyze the transcription:
   - Identify the main topic or theme
   - Note key points, ideas, and arguments
   - Look for any anecdotes, examples, or data that support the main ideas

2. Organize the content:
   - Create an outline with a logical flow of ideas
   - Determine an appropriate introduction and conclusion
   - Group related thoughts and concepts together

3. Write the blog post:
   - Craft an attention-grabbing headline
   - Write a compelling introduction that sets the tone and introduces the main topic
   - Develop the body of the post, expanding on the key points identified earlier
   - Use clear, concise language and break up text with subheadings where appropriate
   - Conclude the post with a summary of the main ideas and a call-to-action or thought-provoking statement

4. Refine and polish:
   - Edit for clarity, coherence, and flow
   - Ensure proper grammar, spelling, and punctuation
   - Add transitions between paragraphs and sections for smooth reading

5. Create meta tags:
   - Generate a title tag (50-60 characters)
   - Write a meta description (150-160 characters) summarizing the post's content
   - Develop 3-5 relevant tags or keywords

Present your output in the following format:

<blog_post>
[Insert the full text of the blog post here]
</blog_post>


<title>[Insert title tag here]</title>
<description>[Insert meta description here]</description>
<tags>[Insert tags or keywords, separated by commas]</tags>


Remember to maintain the original voice and style of the speaker while improving clarity and structure. Do not add any information that is not present in the original transcription.
`);
