import { FormSubmission } from "@/db/schemas/form-submission";
import { Hono } from "hono";
import { Resend } from "resend";

export const form_submission_app = new Hono();

form_submission_app.post("/", async (c) => {
  try {
    const { name, email, message, form_type } = await c.req.json();
    if (!name || !email) {
      return c.json(
        { msg: "Please provide all the required fields" },
        { status: 400 }
      );
    }

    const new_submission = await new FormSubmission({
      name: name,
      email: email,
      message: message,
      form_type,
    }).save();
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: `Ajitesh <ajitesh@scribblepad-ai.com>`,
      to: "ajitesh314mishra@gmail.com",
      subject: `Form Submission - ${form_type}`,
      text: `Name: ${name} \nEmail: ${email} \nMessage: ${message} \nForm Type: ${form_type}`,
    });

    return c.json({ msg: "Form submitted successfully" }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});
