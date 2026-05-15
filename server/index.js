import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();
const port = Number(process.env.PORT) || 3000;
const requiredEnvKeys = [
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASS",
  "RECEIVER_EMAIL",
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getMissingEnvKeys = () =>
  requiredEnvKeys.filter((key) => !process.env[key] || !String(process.env[key]).trim());

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/send-email", async (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Name, email, and message are required.",
    });
  }

  const missingEnvKeys = getMissingEnvKeys();

  if (missingEnvKeys.length > 0) {
    return res.status(500).json({
      message: "SMTP configuration is incomplete.",
      missing: missingEnvKeys,
    });
  }

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Nomad AI Group Website" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New contact request from ${name}`,
      text: [
        "New contact request from Nomad AI Group website",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New contact request from Nomad AI Group website</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      `,
    });

    return res.status(200).json({
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Failed to send email:", error);

    return res.status(500).json({
      message: "Failed to send email.",
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: "Not found." });
});

const startServer = () =>
  app.listen(port, () => {
    console.log(`SMTP API listening on http://localhost:${port}`);
  });

if (process.argv[1] && resolve(process.argv[1]) === __filename) {
  startServer();
}

export { app, startServer };
