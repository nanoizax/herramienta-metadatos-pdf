import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import FileDropZone from "@/components/tools/FileDropZone";
import { Button } from "@/components/ui/button";
import { readPdfMetadata, writePdfMetadata, type PdfMetadata } from "@/lib/tools/pdfMetadata";

const MetadatosPdfPage = () => {
  const { t } = useTranslation("tools");

  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<PdfMetadata | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (selected: File) => {
    setFile(selected);
    setResultUrl(null);
    setError(null);
    setLoading(true);
    try {
      setMetadata(await readPdfMetadata(selected));
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setMetadata(null);
    setResultUrl(null);
    setError(null);
  };

  const handleSave = async () => {
    if (!file || !metadata) return;
    setProcessing(true);
    setError(null);
    try {
      const blob = await writePdfMetadata(file, metadata);
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  const field = (key: keyof PdfMetadata, label: string) => (
    <div>
      <p className="text-neutral-400 text-sm mb-2">{label}</p>
      <input
        type="text"
        value={metadata?.[key] || ""}
        onChange={(e) => setMetadata((prev) => (prev ? { ...prev, [key]: e.target.value } : prev))}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-600"
      />
    </div>
  );

  return (
    <ToolPageLayout toolId="metadatos-pdf">
      <div className="border border-neutral-800 rounded-xl p-6 md:p-8">
        {!file ? (
          <FileDropZone
            accept="application/pdf,.pdf"
            label={t("ui.upload_label_pdf")}
            hint={t("ui.upload_hint_pdf")}
            onFile={handleFile}
            toolId="metadatos-pdf"
          />
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400 truncate max-w-[60%]">{file.name}</span>
              <Button
                variant="outline"
                onClick={reset}
                className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                {t("ui.reset_button_file")}
              </Button>
            </div>

            {loading && <p className="text-neutral-400 text-sm">{t("ui.processing")}</p>}

            {metadata && (
              <div className="space-y-4">
                {field("title", t("ui.meta_title_label"))}
                {field("author", t("ui.meta_author_label"))}
                {field("subject", t("ui.meta_subject_label"))}
                {field("keywords", t("ui.meta_keywords_label"))}
              </div>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex flex-wrap gap-3">
              {!resultUrl ? (
                <Button
                  onClick={handleSave}
                  disabled={!metadata}
                  isLoading={processing}
                  loadingText={t("ui.processing")}
                  className="bg-white text-black hover:bg-white/80 rounded-full px-8"
                >
                  {t("ui.meta_save_button")}
                </Button>
              ) : (
                <a href={resultUrl} download={`${file.name.replace(/\.pdf$/i, "")}-editado.pdf`}>
                  <Button className="bg-white text-black hover:bg-white/80 rounded-full px-8">
                    <Download className="w-4 h-4" />
                    {t("ui.download_button")}
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default MetadatosPdfPage;
