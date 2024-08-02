import { ChatAnthropic } from "@langchain/anthropic";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { blog_post_prompt } from "../prompts/blog-post-prompt";
import { download_file_from_s3 } from "./download-file-from-s3";

export const generate_blog_post = async (
  transcription_file_key: string
): Promise<[string | null, Error | string | null]> => {
  try {
    const [transcription_temp_file, transcription_temp_file_error] =
      await download_file_from_s3(transcription_file_key);

    if (transcription_temp_file_error || !transcription_temp_file) {
      return [null, transcription_temp_file_error];
    }
    const loader = new TextLoader(transcription_temp_file);

    const docs = await loader.load();

    const merged_transcription = docs
      .map((doc) => {
        return doc.pageContent;
      })
      .join("\n");

    const llm = new ChatAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
      modelName: "claude-3-haiku-20240307",
      temperature: 0.4,
      maxTokensToSample: 4000,
    });

    const chain = blog_post_prompt.pipe(llm);

    const result = await chain.invoke({
      transcription: merged_transcription,
    });

    return [result.content as string, null];
  } catch (error) {
    return [null, error as Error];
  }
};
