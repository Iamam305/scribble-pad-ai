import Groq from "groq-sdk";
import { download_file_from_s3 } from "./download-file-from-s3";
import fs from "fs";
import { randomUUID } from "crypto";
import { s3_client } from "@/configs/s3.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const transcribe = async (
  audio_file_key: string
): Promise<[string | null, Error | string | null]> => {
  try {
    const [audio_temp_file, audio_temp_file_error] =
      await download_file_from_s3(audio_file_key);
    if (audio_temp_file_error || !audio_temp_file) {
      return [null, audio_temp_file_error];
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });

    const transcription = await groq.audio.translations.create({
      file: fs.createReadStream(audio_temp_file),
      model: "whisper-large-v3",
      response_format: "json", // Optional
      temperature: 0.0, // Optional
    });

    const txt_file_key = `transcription/${randomUUID()}.txt`;
    await s3_client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: txt_file_key,
        Body: transcription.text,
        ACL: "public-read",
      })
    );
    return [txt_file_key, null];
  } catch (error) {
    return [null, error as Error];
  }
};
