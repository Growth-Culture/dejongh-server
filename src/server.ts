import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { csvWriter, verifyAndCreateFile } from "./utils/CreateFile";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: ["POST"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  verifyAndCreateFile();

  const timestamp = new Date().toLocaleString();

  const submitionData = [
    {
      name,
      email,
      message,
      timestamp,
    },
  ];

  csvWriter.writeRecords(submitionData).then(() => {
    console.log("Success to write data");
  }).catch(err => {
    console.error(err);
  })

  const mailOptions = {
    from: "mailtrap@demomailtrap.com",
    to: "marcus.relation@gmail.com",
    subject: `Novo contato de ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email enviado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao enviar o email.");
    console.error("Erro ao enviar o email:", error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
