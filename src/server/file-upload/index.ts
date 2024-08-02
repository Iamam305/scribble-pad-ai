import { s3_client } from "@/configs/s3.config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { Hono } from "hono";
import { arrayBuffer } from "stream/consumers";

export const file_upload_app = new Hono();

file_upload_app.post("/", async (c) => {
  try {
    const body = await c.req.formData();
    console.log(body);

    const file = body.get("audio") as File;
    console.log(file);

    // const { file } = body;
    const arrayBuffer = await file?.arrayBuffer();
    const fileContent = new Uint8Array(arrayBuffer);

    const file_key = `audio/${file.name}`;
    await s3_client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: file_key,
        Body: fileContent,
        ACL: "public-read",
      })
    );
    return c.json({
      message: "Upload Success",
      data: { audio_file_key: file_key },
    });
  } catch (error) {
    console.log(error);
    c.json({ error: "error" }, { status: 500 });
  }
});
