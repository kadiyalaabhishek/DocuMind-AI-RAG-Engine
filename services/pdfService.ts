
/**
 * Simulated serverless processing logic. 
 * In a real AWS environment, this would be a Lambda function triggered by S3 upload.
 */
export async function processPDF(file: File): Promise<{ text: string, pageCount: number }> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Use PDF.js (loaded via CDN in index.html)
  const pdfjsLib = (window as any).pdfjsLib;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

  const loadingTask = pdfjsLib.getDocument(arrayBuffer);
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  let fullText = "";

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    fullText += strings.join(" ") + "\n\n";
  }

  return { 
    text: fullText, 
    pageCount: numPages 
  };
}
