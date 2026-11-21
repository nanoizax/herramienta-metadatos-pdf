import { PDFDocument } from "pdf-lib";

export interface PdfMetadata {
  title: string;
  author: string;
  subject: string;
  keywords: string; // separadas por coma en la UI
}

export async function readPdfMetadata(file: File): Promise<PdfMetadata> {
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  return {
    title: doc.getTitle() || "",
    author: doc.getAuthor() || "",
    subject: doc.getSubject() || "",
    keywords: doc.getKeywords() || "",
  };
}

export async function writePdfMetadata(file: File, metadata: PdfMetadata): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  doc.setTitle(metadata.title);
  doc.setAuthor(metadata.author);
  doc.setSubject(metadata.subject);
  doc.setKeywords(
    metadata.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
  );
  const bytes = await doc.save();
  return new Blob([bytes], { type: "application/pdf" });
}
