import { User } from "@/db/schemas/user.model";
import { Hono } from "hono";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import jwt from "jsonwebtoken";
import { setCookie } from "hono/cookie";
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth_app = new Hono();

auth_app.post("/register", async (c) => {
  try {
    const { name, email, password } = await c.req.json();
    if (!name || !email || !password) {
      return c.json(
        { msg: "Please provide all the required fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return c.json({ msg: "User already exists" }, { status: 400 });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const code = Math.floor(100000 + Math.random() * 900000);
      const new_user = await new User({
        name: name,
        email,
        password: hashedPassword,
        verification_code: code,
      }).save();

      if (new_user) {
        const data = await resend.emails.send({
          from: `Ajitesh <ajiteshm141@gmail.com>`,
          to: email,
          subject: " Email Verification Code",
          text: "Verification code - " + code,
          html: "5",
        });
        console.log(data);
        return c.json({ msg: "Email Sent Sucessfully" });
      }
    }
  } catch (error) {
    return c.json({ msg: "Internal server error" }, { status: 500 });
  }
});

auth_app.post("/verify", async (c) => {
  try {
    const { email, verification_code } = await c.req.json();
    if (!verification_code) {
      return c.json({ error: "Please fill the fields" }, { status: 400 });
    }
    const user = await User.findOne({ verification_code });
    if (!user) {
      return c.json({ error: "Invalid verification code" }, { status: 404 });
    }
    // if (verification_code !== user.verification_code) {
    //   return c.json({ error: "Invalid verification code" }, { status: 400 });
    // }
    user.verified = true;
    user.verification_code = null;
    await user.save();
    return c.json({
      msg: "Email verified successfully",
    });
  } catch (error) {
    return c.json({ msg: "Internal server error" }, { status: 500 });
  }
});

auth_app.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return c.json({ error: "User does not exist" }, { status: 400 });
    }
    if (user?.verified === false) {
      return c.json({ error: "Email not verified" }, { status: 400 });
    } else {
      const validPassword = await bcrypt.compare(password, user.password!);
      if (!validPassword) {
        return c.json({ error: "Invalid password" }, { status: 400 });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email, user_name: user.name },
        process.env.TOKEN_SECRET!,
        {
          expiresIn: "30d",
        }
      );
      await setCookie(c, "token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      });
      return c.json({ msg: "Logged in successfully", token }, { status: 200 });
    }
  } catch (error) {
    c.json({ msg: "Internal server error" }, { status: 500 });
  }
});

auth_app.post("/logout", async (c) => {
  try {
    // Expire the cookie
    await setCookie(c, "token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // Return the response
    return c.json(
      {
        msg: "Logged Out Successfully",
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        msg: "Something Went Wrong",
      },
      400
    );
  }
});
