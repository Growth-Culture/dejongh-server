"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvWriter = void 0;
exports.verifyAndCreateFile = verifyAndCreateFile;
const csv_writer_1 = require("csv-writer");
const fs_1 = __importDefault(require("fs"));
const filePath = "./submitions.csv";
exports.csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
    path: filePath,
    header: [
        { id: "name", title: "Nome" },
        { id: "email", title: "Email" },
        { id: "message", title: "Mensagem" },
        { id: "timestamp", title: "date" },
    ],
    append: true,
});
function verifyAndCreateFile() {
    if (!fs_1.default.existsSync(filePath)) {
        const csvHeader = 'Nome,Email,Mensagem,Data\n';
        fs_1.default.writeFileSync(filePath, csvHeader, 'utf8');
    }
}
