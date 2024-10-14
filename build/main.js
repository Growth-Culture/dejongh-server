"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const CreateFile_1 = require("./utils/CreateFile");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN_URL,
    methods: ["POST"],
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const transporter = nodemailer_1.default.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
    },
});
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;
    (0, CreateFile_1.verifyAndCreateFile)();
    const timestamp = new Date().toLocaleString();
    const submitionData = [
        {
            name,
            email,
            message,
            timestamp,
        },
    ];
    CreateFile_1.csvWriter.writeRecords(submitionData).then(() => {
        console.log("Success to write data");
    }).catch(err => {
        console.error(err);
    });
    const mailOptions = {
        from: "mailtrap@demomailtrap.com",
        to: "marcus.relation@gmail.com",
        subject: `Novo contato de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email enviado com sucesso!");
    }
    catch (error) {
        res.status(500).send("Erro ao enviar o email.");
        console.error("Erro ao enviar o email:", error);
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
