import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";

const filePath = "./submitions.csv";

export const csvWriter = createObjectCsvWriter({
  path: filePath,
  header: [
    { id: "name", title: "Nome" },
    { id: "email", title: "Email" },
    { id: "message", title: "Mensagem" },
    { id: "timestamp", title: "date" },
  ],
  append: true,
});

export function verifyAndCreateFile() {
  if (!fs.existsSync(filePath)) {
    const csvHeader = 'Nome,Email,Mensagem,Data\n';
    fs.writeFileSync(filePath, csvHeader, 'utf8');
  }  
}