import { randomUUID } from "crypto";
import fs from "fs";
import os from "os";
import { Hono } from "hono";
import path from "path";
import { s3_client } from "@/configs/s3.config";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import Groq from "groq-sdk";

export const transcription_app = new Hono();

transcription_app.post("/", async (c) => {
  try {
    const { file_key } = await c.req.json();
    const temp_dir = path.join(os.tmpdir(), "downloads");
    console.log(`Temp directory: ${temp_dir}`);

    if (!fs.existsSync(temp_dir)) {
      console.log("Creating temp directory");
      fs.mkdirSync(temp_dir);
    }

    const tmp_file_path = path.join(
      temp_dir,
      randomUUID() + path.basename(file_key)
    );
    console.log(`Temp file path: ${tmp_file_path}`);

    const res = await s3_client.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: file_key,
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
    const groq = new Groq();

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tmp_file_path),
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

    return c.json({
      message: "Success",
      data: {
        txt_file_key,
      },
    });
  } catch (error) {
    console.log(error);
    c.json({ error: "error" }, { status: 500 });
  }
});
