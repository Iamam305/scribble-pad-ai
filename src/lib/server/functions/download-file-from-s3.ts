import path from "path";
import fs from "fs";
import os from "os";
import { randomUUID } from "crypto";
import { s3_client } from "@/configs/s3.config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
export const download_file_from_s3 = async (
  transcription_file_key: string
): Promise<[string | null, Error | string | null]> => {
  try {
    const temp_dir = path.join(os.tmpdir(), "downloads");
    if (!fs.existsSync(temp_dir)) {
      console.log("Creating download directory");
      fs.mkdirSync(temp_dir);
    }

    console.log(`Temp directory: ${temp_dir}`);

    const tmp_file_path = path.join(
      temp_dir,
      randomUUID() + path.basename(transcription_file_key.replaceAll("/", "_"))
    );
    console.log(`Temp file path: ${tmp_file_path}`);

    const res = await s3_client.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: transcription_file_key,
      })
    );
    const body = res.Body as NodeJS.ReadableStream;
    await new Promise<void>((resolve, reject) => {
      console.log("Starting file download");
      body.pipe(fs.createWriteStream(tmp_file_path));
      body.on("end", () => {
        console.log("File download complete");
        resolve();
      });
      body.on("error", (error) => {
        console.log("Error during file download");
        reject(error);
      });
    });

    return [tmp_file_path, null];
  } catch (error) {
    return [null, error as Error];
  }
};
