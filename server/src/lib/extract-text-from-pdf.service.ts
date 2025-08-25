import PDFParser from 'pdf2json';

interface PDFPage {
  type: 'page';
  page: number;
  title: string;
  content: string;
  wordCount: number;
}

interface PDFText {
  R?: Array<{ T?: string }>;
}

function extractPageTexts(texts: PDFText[]): string[] {
  const decodedTexts: string[] = [];

  for (const text of texts) {
    if (!text.R?.length) continue;

    for (const run of text.R) {
      if (run.T) {
        decodedTexts.push(decodeURIComponent(run.T));
      }
    }
  }

  return decodedTexts;
}

interface PDFExtractionResult {
  type: 'pdf';
  documentTitle: string;
  totalPages: number;
  processedPages: number;
  sections: PDFPage[];
  processedAt: string;
  sourceFile: {
    name: string;
    size: number;
    type: string;
    url?: string;
  };
}

export async function extractTextFromPdf(
  file: File,
  uploadedUrl?: string,
): Promise<PDFExtractionResult> {
  return new Promise((resolve, reject) => {
    try {
      const pdfParser = new PDFParser();

      pdfParser.on('pdfParser_dataError', (errData) => {
        reject(new Error(`Failed to parse PDF: ${errData.parserError}`));
      });

      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        const sections: PDFPage[] = [];

        pdfData.Pages.forEach((page, index) => {
          const pageTexts: string[] = [];

          pageTexts.push(...extractPageTexts(page.Texts));

          const content = pageTexts.join(' ').trim();
          const wordCount = content
            .split(/\s+/)
            .filter((word) => word.length > 0).length;

          if (content) {
            sections.push({
              type: 'page',
              page: index + 1,
              title: `Page ${index + 1}`,
              content,
              wordCount,
            });
          }
        });

        const result: PDFExtractionResult = {
          type: 'pdf',
          documentTitle: file.name,
          totalPages: pdfData.Pages.length,
          processedPages: sections.length,
          sections,
          processedAt: new Date().toISOString(),
          sourceFile: {
            name: file.name,
            size: file.size,
            type: file.type,
            url: uploadedUrl,
          },
        };

        resolve(result);
      });

      file.arrayBuffer().then((buffer) => {
        pdfParser.parseBuffer(Buffer.from(buffer));
      });
    } catch (error) {
      reject(
        new Error(
          `Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ),
      );
    }
  });
}
