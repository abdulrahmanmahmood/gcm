declare module "html2pdf.js" {
  type Html2PdfOptions = {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number };
    jsPDF?: { unit?: string; format?: string; orientation?: string };
  };

  interface Html2Pdf {
    from(element: HTMLElement): this;
    set(options: Html2PdfOptions): this;
    save(): Promise<void>;
    toPdf(): Promise<this>;
    toBlob(): Promise<Blob>;
  }

  const html2pdf: () => Html2Pdf;
  export default html2pdf;
}
