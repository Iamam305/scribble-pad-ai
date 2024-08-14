import path from "path";
import os from "os";
import fs from "fs";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { download_file_from_s3 } from "./download-file-from-s3";
import { ChatAnthropic } from "@langchain/anthropic";
import { linkedin_post_prompt } from "../prompts/linkedin-post-prompt";
import { extract_string_between_tags } from "./extract-string-bw-tags";
import { twitter_thread_prompt } from "../prompts/twitter-thread-prompt";
import { ChatGroq } from "@langchain/groq";

export const generate_twitter_thread = async (
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

    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.1-8b-instant",
    });

    const chain = twitter_thread_prompt.pipe(llm);

    const result = await chain.invoke({
      transcription: merged_transcription,
    });

    return [result.content as string, null];
  } catch (error) {
    return [null, error as Error];
  }
};
